import React, {useEffect} from 'react';
import "./ProjectPage.scss";
import {useSelector} from "react-redux";
import PostLayout from "../../layouts/PostLayout/PostLayout";
import {Avatar, Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ImageButtonComponent from "../../components/ImageButtonComponent/ImageButtonComponent";
import {useHistory} from "react-router";

const useStyles = makeStyles((theme) => ({
    avatar: {
        color: '#fff',
        backgroundColor:"#FFD850",
        flex: "1 1 40px",
        width:"40px",
        minWidth:"40px"
    },
}));

export default function ProjectPage({match}){
    const data = [
        {title:"Home",href:"/"},
        {title:"Projects",href:"/projects"},
        {title:"Project",active:true},
    ];
    const classes = useStyles();
    const history = useHistory();
    const project = useSelector(({data})=>{
        console.log(data.pages.projectsPage)
        const result = data.pages.projectsPage.projectsList.find((v)=>{
            return parseInt(v.id, 10) === parseInt(match.params.id, 10);
        });

        if(!result){
            history.push("/projects");
        }

        return result || {};
    });

    return (
        <div className={"w-100 project"}>
            <PostLayout {...project} data={data}>
                <div className={"project__description card"}>
                    <div className={"text-center h3"}>Description</div>
                    <div className={"project__description-txt"}>
                        <h5>{project.long_description}</h5>
                    </div>
                </div>
                <div className={"project__languages w-100 card"}>
                    <div className={"text-center h3"}>Languages</div>
                    <div className={"project__languages-items w-100"}>
                        {   Array.isArray(project.languages)
                            &&
                            project.languages.map(v=>{
                            return (
                            <Button className={"w-100"} key={Math.random()}>
                                <div className={"project__languages-item center w-100"} key={Math.random()+v}>
                                    <Avatar variant="square" className={classes.avatar}>
                                        {v.charAt(0)}
                                    </Avatar>
                                    <div className={"project__languages-txt h5"}>
                                        {v}
                                    </div>
                                </div>
                            </Button>);
                            })
                        }
                    </div>
                </div>
                <div className={"project__github w-100 card"}>
                     <ImageButtonComponent title={"View on github"} onClick={()=>window.open(project.github)} image={"/public/images/enterprise-city-w-logos.webp"}/>
                </div>
            </PostLayout>
        </div>
    );
}