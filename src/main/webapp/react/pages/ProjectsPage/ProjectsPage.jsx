import React from 'react';
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import ImageButtonComponent from "../../components/ImageButtonComponent/ImageButtonComponent";
import ProjectsSearchComponent from "../../components/ProjectsComponent/ProjectsSearchComponent";
import './ProjectsPage.scss';
import ProjectsListComponent from "../../components/ProjectsComponent/ProjectsListComponent";
import ProjectsPaginationComponent from "../../components/ProjectsComponent/ProjectsPaginationComponent";
import {useHistory} from "react-router";


export default function(){
    const history = useHistory();

    const handleClick = () => {
       window.open("https://github.com/ValValeria","_self");
    };

    return (
        <div className={"projects w-100"} id={"projects-page"}>
            <BasicLayout title={"Projects"}>
                <div className={"projects__area"}>
                    <div className={"projects__ad"} onClick={handleClick}>
                        <ImageButtonComponent title={"View my github profile"} image={"/public/images/code.png"}/>
                    </div>
                    <div className={"projects__search"}>
                        <React.Fragment>
                            <ProjectsSearchComponent/>
                        </React.Fragment>
                    </div>
                    <div className={"projects__list"}>
                        <ProjectsListComponent/>
                        <ProjectsPaginationComponent/>
                    </div>
                </div>
            </BasicLayout>
        </div>
    )
}