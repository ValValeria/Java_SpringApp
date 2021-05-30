import {configureStore, createAsyncThunk, createSlice, getDefaultMiddleware} from "@reduxjs/toolkit";
import _ from 'lodash';
import {formUrlParamsString, makeHttpRequest} from "../api";
import {addUniqueElements} from "../functions/functions";
import React from "react";
import projectsList from './projects-list';


const middleware = [
    ...getDefaultMiddleware(),
];

export const getNewPosts = createAsyncThunk("posts",async (num,exclude=0)=>{
    const url = formUrlParamsString("http://localhost:8080/api/blog/posts",{page:num,per_page:3,exclude});
    return makeHttpRequest(url);
});

export const getNewPost = createAsyncThunk("getPost/post",async(num)=>{
    const url = formUrlParamsString("http://localhost:8080/api/blog/post/"+num);
    return makeHttpRequest(url);
});

const state = {
    posts: [],
    comments: [],
    projects: [],
    pages:{
        homePage:{
            skills:{
                skillsDescription: `The Node.js distributed development project was previously governed by the Node.js Foundation,[8] and has now merged with the JS Foundation to form the OpenJS`,
                skillsList: [
                    {title:"NodeJs", description:"As a multi-paradigm language, JavaScript supports event-driven, fun.", image: "/public/images/nodejs_logo.svg"},
                    {title:"Java", description:"As a multi-paradigm language, JavaScript supports event-driven, fun.", image: "/public/images/nodejs_logo.svg"},
                    {title:"Angular", description:"As a multi-paradigm language, JavaScript supports event-driven, fun.", image: "/public/images/nodejs_logo.svg"},
                    {title:"React", description:"As a multi-paradigm language, JavaScript supports event-driven, fun.", image: "/public/images/nodejs_logo.svg"},
                    {title:"VueJs", description:"As a multi-paradigm language, JavaScript supports event-driven, fun.", image: "/public/images/nodejs_logo.svg"},
                    {title:"Python", description:"As a multi-paradigm language, JavaScript supports event-driven, fun.", image: "/public/images/nodejs_logo.svg"},
                    {title:"Php", description:"As a multi-paradigm language, JavaScript supports event-driven, fun.", image: "/public/images/nodejs_logo.svg"},
                    {title:"Webpack", description:"As a multi-paradigm language, JavaScript supports event-driven, fun.", image: "/public/images/nodejs_logo.svg"},
                    {title:"Laravel", description:"As a multi-paradigm language, JavaScript supports event-driven, fun.", image: "/public/images/nodejs_logo.svg"},
                ],
                per_page:3,
                page:1,
                get num_pages(){
                    return Math.ceil(this.skillsList.length/this.per_page)
                }
            },
            projects:{
                languages:["JavaScript","PHP","Java","Python","Web design"],
                activeLanguage:"JavaScript",
                page:1,
                projectsList:projectsList.data,
                per_page:3,
                get num_pages(){
                    const list = _.chunk(this.projectsList.filter(v=>this.languages[Number(v.lang)]===this.activeLanguage),this.per_page)
                    return Math.ceil(list.length/this.per_page)
                }
            },
            questions:{
                questionsList:[
                    {question:"What technologies do you use for frontend development",answer:"Angular"},
                    {question:"What technologies do you use for frontend development",answer:"Angular"},
                    {question:"What technologies do you use for frontend development",answer:"Angular"},
                ]
            },
            reasons:[
                {title:"Customization",description:" Client Satisfaction is our first priority and We are best at it. Keep In Touch for the best output.",img:"/public/images/1.svg"},
                {title:"Cloud Storage",description:" Client Satisfaction is our first priority and We are best at it. Keep In Touch for the best output.",img:"/public/images/2.svg"},
                {title:"Cloud Storage",description:" Client Satisfaction is our first priority and We are best at it. Keep In Touch for the best output.",img:"/public/images/3.svg"},
            ],
            developSkills:[
                {
                    title: "Mobile apps",
                    txt: "React Native, Java Android",
                },
                {
                    title: "Frontend (Web)",
                    txt: "Javascript, JS Frameworks",
                },
                {
                    title: "Backend (Web)",
                    txt: "Php, Java, Python, Node JS",
                },
                {
                    title: "Mobile apps",
                    txt: "React Native, Java Android",
                },
            ]
        },
        projectsPage:{
            projectsList: projectsList.data ,
        },
        postsPage:{
            noPosts:false,
            isLoading:false,
            isError:false,
            filteredPosts:[],
            mostPopular:[
                {title:"xmlhttprequest",category:"JS",id:1,description:"Async is used in javascript",image:"/public/images/js.jpg"},
                {title:"java spring",category:"php",id:1,description:"Async is used in javascript",image:"/public/images/js.jpg"},
                {title:"wordpress",category:"JS",id:1,description:"Async is used in javascript",image:"/public/images/js.jpg"}
            ],
            activeCategory:"",
            sortByAsc: false,
            page:1,
            per_page:3,
            comments:[
                {id:1,username:"Lanadel",date:"2020-09-04",comment:"Best article ever", postId:1},
                {id:1,username:"Lanadel1",date:"2020-09-04",comment:"Best article ever", postId:1},
                {id:1,username:"Lanadel2",date:"2020-09-04",comment:"Best article ever", postId:1},
            ],
            isSortedPosts: false,
            numPages: 1,
            url: "http://localhost:8080/api/blog/posts",
        },
        searchPage:{
            noPosts:false,
            isLoading:false,
            isError:false,
            filteredPosts:[],
            page:1,
            per_page:3,
            numPages: 1,
        },
        postPage:{
            noPost:false,
            isLoading:false,
            isError:false,
        }
    }
}

const slice = createSlice({
    name: "data",
    initialState: state,
    reducers: {
        updatePostsUrl(state,action){
            state.pages.postsPage.url = action.payload || "http://localhost:8080/api/blog/posts";
        },
        updatePage(state,action){
            const page = action.payload;
            const skills = state.pages.homePage.skills;

            if(skills.num_pages<page){
                skills.page = 1;
            } else if(page<=0){
                skills.page = skills.num_pages;
            } else{
                skills.page = action.payload;
            }
        },
        updateLang(state,action){
            const lang = action.payload;
            const projects = state.pages.homePage.projects;
            const languages = projects.languages;

            if(languages.includes(lang)){
                projects.activeLanguage = lang;
            }
        },
        updateProjectsPage(state,action){
            const page = action.payload;
            const projects = state.pages.homePage.projects;

            if(projects.num_pages<page){
                projects.page = 1;
            } else if(page<=0){
                projects.page = projects.num_pages;
            } else{
                projects.page = action.payload;
            }
        },
        sortPostsByAsc(state){
            const postsPage = state.pages.postsPage;
            postsPage.sortByAsc = true;

            postsPage.filteredPosts.sort((a,b)=>{
                const date = new Date(a.date)
                const date2 = new Date(b.date);

                if(date>date2){
                   return 1;
                }
                if(date<date2){
                   return -1;
                }
                return 0;
            });
        },
        sortPostsByDesc(state){
            const postsPage = state.pages.postsPage;
            postsPage.sortByAsc = false;
            postsPage.page = 1;

            postsPage.filteredPosts.sort((a,b)=>{
                const date = new Date(a.date)
                const date2 = new Date(b.date);

                if(date<date2){
                    return 1;
                }
                if(date>date2){
                    return -1;
                }
                return 0;
            });
        },
        sortPostsByCategory(state,action){
            const category = action.payload;
            const postsPage = state.pages.postsPage;
            postsPage.activeCategory = category;
            postsPage.page = 1;

            _.remove(postsPage.filteredPosts,(v)=>{
                 return category !== v.category;
            })
        },
        undoPostFilters(state){
            const postsPage = state.pages.postsPage;
            postsPage.page = 1;
        },
        async changePostPage(state,action){
            const postsPage = state.pages.postsPage;
            postsPage.page = action.payload;
        },
        addPosts(state, action){
            const postsPage = state.pages.postsPage;
            postsPage.filteredPosts = action.payload.data;
            postsPage.page = action.payload.page;
            postsPage.numPages = action.payload.numPages;
            postsPage.per_page = action.perPage;
        },
        addSearchPosts(state, action){
            const postsPage = state.pages.searchPage;

            postsPage.filteredPosts = action.payload.data;
            postsPage.page = action.payload.page;
            postsPage.numPages = action.payload.numPages;
            postsPage.per_page = action.perPage;

            if(postsPage.numPages == 0){
                postsPage.noPosts = true;
            }
        },
    },
    extraReducers:{
        [getNewPosts.pending](state){
            const postsPage = state.pages.postsPage;
            postsPage.isLoading = true;
            postsPage.isError = false;
            postsPage.noPosts = false;
        },
        [getNewPosts.fulfilled](state,action){
            const postsPage = state.pages.postsPage;
            const payload = action.payload;
            const responseData = payload.response.responseData || {};

            if(!Object.keys(responseData).length || !responseData.data) return;

            const posts = responseData.data.results || [];

            if(!posts.length){
                postsPage.isError = false;
                postsPage.noPosts = true;
            } else{
                addUniqueElements(postsPage.filteredPosts,posts)
                postsPage.isError = false;
                postsPage.noPosts = false;
            }

            postsPage.isLoading = false;
        },
        [getNewPosts.rejected](state){
            const postsPage = state.pages.postsPage;
            postsPage.isLoading = false;
            postsPage.noPosts = false;
            postsPage.isError = true;
        },
        [getNewPost.pending](state){
            const postsPage = state.pages.postPage;
            postsPage.isLoading = true;
            postsPage.isError = false;
            postsPage.noPosts = false;
        },
        [getNewPost.fulfilled](state,action){
            const postPage = state.pages.postPage;
            const postsPage = state.pages.postsPage;
            const responseData = action.payload.response.responseData || {};

            if(Object.keys(responseData).length){
                addUniqueElements(postsPage.filteredPosts,[responseData.data]);
            } else{
                postPage.noPosts = false;
            }

            postPage.isLoading = false;
        },
        [getNewPost.rejected](state, error){
            const postsPage = state.pages.postPage;
            postsPage.isLoading = false;
            postsPage.noPosts = true;
            postsPage.isError = true;
        },
    }
});

const authReducer = slice.reducer;

export const {updatePage, changePostPage, updatePostsUrl,addSearchPosts, updateLang, updateProjectsPage, sortPostsByAsc, sortPostsByDesc, sortPostsByCategory, undoPostFilters, addPosts} = slice.actions;

export const store = configureStore({
    reducer: {
        data: authReducer,
    },
    middleware,
});