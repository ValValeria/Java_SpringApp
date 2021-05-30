import React from 'react';
import {useSelector} from "react-redux";
import ImageCardComponent from "../ImageCardComponent/ImageCardComponent";
import _ from "lodash";

export default function(){
    const data = useSelector(v=>{
        const projects = v.data.pages.homePage.projects;
        const languages = projects.languages;
        const activeLanguage = projects.activeLanguage;
        const page = projects.page;

        const data = _.chunk(projects.projectsList.filter(v=>languages[Number(v.lang)]===activeLanguage),3);

        if(data.length>=page){
            return data[page-1];
        }else{
            return [];
        }
    });

    const EmptyComponent = ()=>{
        if(data.length) return null;

        return (
            <div className={"projects__empty mt w-100 center"}>
                 <div className={"projects__empty-title d-flex flex-column align-items-center mt"}>
                     <h4 className={"text-center w-100 txt-bold mb mt"}>
                         {"There are no projects, related to this language."}
                     </h4>
                     <div className={"projects__empty-img center w-100"}>
                         <img src={"/public/images/404-error.svg"} alt={"..."}/>
                     </div>
                 </div>
            </div>
        );
    };

    return (
        <div className={"projects__list center w-100"} id={"projects"}>
                {
                    data.map(v=>{
                        return (
                            <div className={"projects__list-item"} key={v+Math.random()}>
                               <ImageCardComponent  {...v} css_class={"card-transition"}/>
                            </div>
                        )
                    })
                }
                <EmptyComponent/>
        </div>
    );
}