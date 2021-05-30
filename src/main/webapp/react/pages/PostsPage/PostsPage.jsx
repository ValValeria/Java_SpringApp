import React from 'react';
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import CardComponent from "../../components/CardComponent/CardComponent";
import {connect} from 'react-redux';
import PostsCardComponent from '../../components/PostCardComponent/PostCardComponent'
import SearchBarComponent from "../../components/SidebarComponent/SidebarSearchComponent";
import SidebarComponent from "../../components/SidebarComponent/SidebarListComponent";
import {Pagination} from "@material-ui/lab";
import {addPosts, changePostPage, getNewPosts, updatePostsUrl} from "../../store";
import './PostsPage.scss'
import ImageButtonComponent from "../../components/ImageButtonComponent/ImageButtonComponent";
import NotFoundComponent from "../../components/NotFoundComponent/NotFoundComponent";
import ErrorLoadingComponent from "../../components/ErrorLoadingComponent/ErrorLoadingComponent";
import LoadingProgressComponent from "../../components/LoadingProgressComponent/LoadingProgressComponent";
import {formUrlParamsString, makeHttpRequest} from "../../api";
import {Snackbar} from "@material-ui/core";
import {loadPosts$} from "../../components/SidebarComponent/SidebarSearchContComponent";
import {showSnackbar$} from "../../App";


const mapStateToProps = ({data})=>{
    let result = {};

    if(data.pages){
        result = {
            page: data.pages?.postsPage?.page || 1,
            per_page: data.pages.postsPage.per_page,
            isLoading:data.pages.postsPage.isLoading,
            noPosts: data.pages.postsPage.noPosts,
            isError: data.pages.postsPage.isError,
            num_pages: data.pages.postsPage.numPages,
            active_posts: data.pages.postsPage.filteredPosts,
            url: data.pages.postsPage.url
        };
    }

    return result;
};

const mapDispatchToProps = (dispatch)=>({
    changePage: num => dispatch(changePostPage(num)),
    getNewPosts: num => dispatch(getNewPosts(num)),
    addPosts: (data) => dispatch(addPosts(data)),
    changeUrl: (url) => dispatch(updatePostsUrl(url))
})

class PostsPage extends React.PureComponent{
    constructor(props) {
        super(props);

        this.state = {
            categories: {
                "js": "JS",
                "php": "Php",
                "java": "Java",
                "html": "Html5"
            },
            message: '',
            showSnackbar: false,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.getNewPosts(1);

        loadPosts$.subscribe(async (v) => {
            this.props.changeUrl("/api/blog/posts");
            await this.handleClick(v);
        });
    }

    async handleClick(num){
        const url = formUrlParamsString(this.props.url, {page: this.props.page, per_page: this.props.per_page});
        const response = await makeHttpRequest(url);
        const result = response.response.responseData?.data;
        const data = result?.results;

        if(data && Array.isArray(data)){
            const obj = {data, page: num, perPage: this.props.per_page, numPages: result.totalPages};

            this.props.addPosts(obj);
        } else {
            this.setState({
                message: "Sorry, but we don't have more posts, related to this topic",
                showSnackbar: true
            });
        }
    }

    async sortByCategories(category){
        const url = formUrlParamsString("http://localhost:8080/api/blog/sort/category/"+category, {page:1 ,per_page:3});
        const response = await makeHttpRequest(url);
        const data = response.response.responseData?.data;

        this.props.changeUrl("/api/blog/sort/category/"+category);

        if(data && typeof data === "object" && Array.isArray(data.results)){
            const obj = {
                data: data.results,
                page: 1,
                numPages: data.totalPages,
                perPage: 3
            }

            this.props.addPosts(obj);
        } else{
            this.setState({
                message: "Sorry, but we don't have any posts, related to this topic",
                showSnackbar: true
            });
        }
    }

    render(){
        let Element = ()=>null;

        if(this.props.active_posts.length > 0){
            Element = ()=>(
                <div className={"posts__list"}>
                    {this.props.active_posts.map(v => {
                        return (
                            <div className={"posts__item"} key={Math.random()}>
                                <PostsCardComponent {...v} href={"/post/" + v.id} showRating={false}/>
                            </div>
                        )
                    })
                    }
                </div>
            );
        } else if(this.props.noPosts) {
            Element = () => (
                <div className={"posts__404"}>
                    <NotFoundComponent/>
                </div>
            )
        } else if(this.props.isError){
            Element = ()=>(
                <div className={"posts__error"}>
                    <ErrorLoadingComponent/>
                </div>
            )
        } else if(this.props.isLoading){
            Element = ()=>(
                <div className={"posts__loading"}>
                    <LoadingProgressComponent/>
                </div>
            );
        }

        return (
           <div className={"w-100 posts"} page={"posts"}>
               <Snackbar
                   anchorOrigin={{
                       vertical: 'bottom',
                       horizontal: 'center',
                   }}
                   open={this.state.showSnackbar}
                   autoHideDuration={6000}
                   onClose={()=>this.setState({showSnackbar: false})}
                   message={this.state.message}
               />
               <BasicLayout title={"Posts"} css_class={"posts"}>
                   <React.Fragment>
                       <div className={"posts__content"}>
                           <div className={"posts__ads"}>
                               <ImageButtonComponent
                                   title={"Subscribe to our channel"}
                                   image={"/public/images/code.png"}
                                   onClick={()=>{
                                       showSnackbar$.next({state: true, message: "Sorry, but we haven't got any channel yet"})
                                   }}
                               />
                           </div>
                           <div className={"posts__categories center"}>
                               {
                                   Object.entries(this.state.categories).map(([k,v])=>{
                                       return (
                                           <div className={"posts__category"} key={Math.random()} onClick={()=>this.sortByCategories(k)}>
                                               <CardComponent padding={`0`}>
                                                   <div className={"posts__category-wrap"}>
                                                       <h4>{v}</h4>
                                                   </div>
                                               </CardComponent>
                                           </div>
                                       )
                                   })
                               }
                           </div>
                           <Element/>
                           <div className={"posts__search"}>
                               <SearchBarComponent/>
                               <SidebarComponent/>
                           </div>
                           {
                               this.props.num_pages >  1 &&
                               (<div className={"posts__pagination center"}>
                                   <Pagination count={this.props.num_pages} size="large"
                                               onChange={(_event, page) => this.handleClick(page)}/>
                               </div>)
                           }
                       </div>
                   </React.Fragment>
               </BasicLayout>
           </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostsPage)