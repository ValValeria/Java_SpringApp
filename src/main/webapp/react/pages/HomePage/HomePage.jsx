import React, {useEffect} from 'react';
import BannerComponent from "../../components/BannerComponent/BannerComponent";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import AboutMeComponent from "../../components/AboutMeComponent/AboutMeComponent";
import SkillsComponent from "../../components/SkillsComponent/SkillsComponent";
import {useSelector} from "react-redux";
import ProjectsSearchComponent from "../../components/ProjectsComponent/ProjectsSearchComponent";
import ProjectsListComponent from "../../components/ProjectsComponent/ProjectsListComponent";
import ProjectsPaginationComponent from "../../components/ProjectsComponent/ProjectsPaginationComponent";
import QuestionsComponent from '../../components/QuestionsComponent/QuestionsComponent'
import Decoration from "../../components/DecorationComponent/DecorationComponent";
import * as Three from 'three';
import PostsComponent from "../../components/PostsComponent/PostsComponent";
import './HomePage.scss';
import WhyMeComponent from "../../components/WhyMeComponent/WhyMeComponent";
import GetEmailsComponent from "../../components/GetEmailsComponent/GetEmailsComponent";
import DevelopSkills from "../../components/DevelopSkills/DevelopSkills";


export default function HomePage(){
    const skillsData = useSelector(state=>state.data.pages.homePage.skills);
    let canvas = React.useRef();

    useEffect(()=>{
        const scene = new Three.Scene();
        const camera = new Three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new Three.WebGLRenderer();
        renderer.setSize( window.innerWidth, 300);
        renderer.setClearColor( 0xffffff, 0 );
        renderer.render(scene,camera);

    },[canvas])

    return (
        <div className={"home w-100"}>
            <BannerComponent/>
            <div className={'w-100 position-relative'}>
                <BasicLayout title={"About me"}>
                    <AboutMeComponent/>
                </BasicLayout>
            </div>

            <div className={"w-100"}>
                <BasicLayout title={"Skills"}>
                    <DevelopSkills/>
                </BasicLayout>
            </div>

            <div className={'w-100 position-relative'}>
                <BasicLayout title={"Technologies"} description={skillsData.skillsDescription}>
                    <SkillsComponent/>
                </BasicLayout>
            </div>

            <div className={'w-100 position-relative'}>
                <Decoration styles={{top:0, left: "5%"}}/>
                <BasicLayout title={"Projects"} css_class={"projects"}>
                   <React.Fragment>
                    <ProjectsSearchComponent/>
                    <ProjectsListComponent/>
                    <ProjectsPaginationComponent/>
                   </React.Fragment>
               </BasicLayout>
            </div>

            <div className={"w-100"}>
                <WhyMeComponent/>
            </div>

            <div className={"w-100 position-relative"}>
                <BasicLayout title={"Questions"}>
                    <QuestionsComponent/>
                </BasicLayout>
            </div>

            <div className={"w-100 position-relative"}>
                <PostsComponent/>
            </div>
            <div className={"w-100"} hidden>
                <GetEmailsComponent/>
            </div>
        </div>
    );
}