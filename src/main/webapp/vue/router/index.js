import HomePage from '../pages/HomePage';
import VueRouter from 'vue-router';
import Vue from 'vue';
import AddPostPage from "../pages/AddPostPage.vue";
import PostsPage from "../pages/PostsPage.vue";
import PostPage from "../pages/PostPage.vue";
import NotFoundPage from "../pages/NotFoundPage";
import LetterPage from "../pages/LetterPage";
import LettersPage from "../pages/LettersPage";
import {isObjectHasProperties} from "../functions";
import {store} from "../store/index";
import UpdatePostPage from "../pages/UpdatePostPage";
import {ReplaySubject} from "rxjs";

Vue.use(VueRouter);

export const updatePost$ = new ReplaySubject(1);

const routes = [
    {path:"/admin/",name:'home',component: HomePage},
    {path:"/admin/add-post",name:'add-post',component: AddPostPage},
    {path:"/admin/posts",name:'posts',component: PostsPage},
    {path:"/admin/post/:id",name:'post',component: PostPage},
    {path:"/admin/update-post/:id",name:'update-post',component: UpdatePostPage},
    {path:"/admin/letter/:id",name:'letter',component: LetterPage},
    {path:"/admin/letters",name:'letters',component: LettersPage},
    {path:"*",component: NotFoundPage}
];

const router = new VueRouter({
    routes,
    mode:"history"
});

router.beforeEach(async (to,from, next)=>{
    if(store.state.user.isAuthenticated) return next();

    let hasErrors = false;

    try{
        const user = JSON.parse(localStorage.getItem("user")) ||  {};

        if(typeof user === "object" && isObjectHasProperties(user,"username","password")){
            const formData = new FormData();

            Object.entries(user).forEach(([k,v])=>{
                  formData.append(k,v);
            });

            const response = await fetch("/api/login",{
                method:"POST",
                body: formData
            });

            if(response.ok){
                const json = await response.json() || {};
                const status = json.status;
                const id = json.data.id;

                if(status === "admin" && Number.isInteger(id)){
                    user.id = id;
                    store.commit("setUser", user);
                } else{
                    hasErrors = true;
                }
            } else {
                hasErrors = true;
            }
        } else {
            hasErrors = true;
        }
    } catch (e){
        hasErrors = true;
    }

    if(hasErrors){
        next("/auth/login");
    } else {
        next(true);
    }
});

export default  router;
