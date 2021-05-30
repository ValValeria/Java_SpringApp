import React from 'react';
import {connect, useDispatch} from "react-redux";
import CardComponent from "../CardComponent/CardComponent";
import {Button} from "@material-ui/core";
import {updateLang, updateProjectsPage} from "../../store";
import './ProjectsSearchComponent.scss';


const mapStateToProps = (state)=>{
    const data = state.data.pages.homePage.projects;

    return {
        langList:data.languages,
        activeLang: data.activeLanguage
    }
}

function ProjectSearchComponent({langList, activeLang}){
    const dispatch = useDispatch();

    const handleClick = (activeLang)=>{
        dispatch(updateProjectsPage(1))
        dispatch(updateLang(activeLang))
    }

    return (
        <div className={"projects__search"}>
            <div className={"projects__search-wrap"}>
                 <div className={"projects__search-content center"}>
                     <CardComponent padding={true}>
                         {
                             langList.map(v=>{
                                 return (
                                     <Button className={"w-100"} key={v} onClick={()=>handleClick(v)}>
                                       <div className={"projects__search-lang" }>
                                             <h5>{v}</h5>
                                             <div className={"projects__search-line "+(activeLang==v ? 'projects__search-line-active':'')}></div>
                                       </div>
                                     </Button>
                                 )
                             })
                         }
                     </CardComponent>
                 </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, null)(ProjectSearchComponent)