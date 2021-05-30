import React, {useLayoutEffect} from 'react';
import {Route} from "react-router";
import HomePage from "../pages/HomePage/HomePage";
import PostsPage from "../pages/PostsPage/PostsPage";
import ProjectPage from "../pages/ProjectPage/ProjectPage";
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage";
import PostPage from "../pages/PostPage/PostPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import ContactsPage from "../pages/ContactsPage/ContactsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import {Switch} from "react-router-dom";
import {useDispatch} from "react-redux";
import {checkNavigationEvent} from "../components/HeaderComponent";
import {updatePostsUrl} from "../store";

export default function Routes(){
    const dispatch = useDispatch();

    useLayoutEffect(()=>{
        checkNavigationEvent(()=>{
            dispatch(updatePostsUrl())
        });
    },[]);

    return (
        <Switch>
            <Route exact={true} path={"/"} component={HomePage}/>
            <Route exact={true} path={"/posts"} component={PostsPage}/>
            <Route path={"/project/:id"} component={ProjectPage}/>
            <Route path={"/projects"} component={ProjectsPage}/>
            <Route path={"/post/:id"} component={PostPage}/>
            <Route path={"/search/:word"} component={SearchPage}/>
            <Route path={"/contact"} component={ContactsPage}/>
            <Route path={"/"} component={NotFoundPage}/>
        </Switch>
    );
}