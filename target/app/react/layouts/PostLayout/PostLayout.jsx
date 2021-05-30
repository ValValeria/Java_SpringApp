import React, {useState} from 'react';
import './PostLayout.scss';
import BasicLayout from "../BasicLayout/BasicLayout";
import {Breadcrumbs, Icon, Link, Typography} from "@material-ui/core";
import {useHistory} from 'react-router';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import IconButton from "@material-ui/core/IconButton";
import BackdropComponent from "../../components/BackdropComponent/BackdropComponent";
import Tooltip from '@material-ui/core/Tooltip';
import ImageLoadingComponent from "../../components/ImageLoadingComponent/ImageLoadingComponent";
import TitleComponent from "../../components/TitleComponent/TitleComponent";
import GridAutoLayout from "../GridAutoLayout/GridAutoLayout";
import PostCardComponent from "../../components/PostCardComponent/PostCardComponent.jsx";



export default function({title, data=[], image,children=null, otherPosts=[]}){
    const history = useHistory();
    const [open, updateState] = useState(false);

    const onClose = ()=>{
        updateState(false);
    }

    const click = (event)=>{
        const link = event.target.getAttribute("href");
        history.push(link);
        event.preventDefault();
    };

    return (
        <div className={"post"}>
            <BasicLayout title={<h2>{title}</h2>} breadcrumbs = {data} showLetters={false}>
                <div className={"w-100"}>
                    <div className={"post__elem post__breadcrumbs"}>
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            {
                                data.map(v=>{
                                    if(v.active){
                                        return (
                                            <Typography color="textPrimary" key={Math.random()}>
                                                {v.title.charAt(0).toUpperCase()+v.title.slice(1).toLowerCase()}
                                            </Typography>
                                        );
                                    } else{
                                        return (
                                            <Link color="inherit" href={v.href} onClick={click} key={Math.random()}>
                                                {v.title.charAt(0).toUpperCase()+v.title.slice(1).toLowerCase()}
                                            </Link>
                                        )
                                    }
                                })
                            }
                        </Breadcrumbs>
                    </div>
                    <div className={"post__elem post__image card"}>
                        <div className={"post__image-wrap position-relative"}>
                            <ImageLoadingComponent src={image}>
                                <div className={"post__large-btn"}>
                                    <Tooltip title={"Large an image"}>
                                        <IconButton color="primary" onClick={()=>updateState(true)}>
                                            <Icon  fontSize="large">add_circle</Icon>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </ImageLoadingComponent>
                        </div>
                    </div>
                    <div className={"post__elem post__content mb"}>
                        {children}
                    </div>
                    {
                        otherPosts.length > 0 &&
                        (
                            <div className={"post__elem post__other-posts center flex-column"}>
                                <TitleComponent headline={<h3 className={"mt"}>Related</h3>}/>
                                <div className={"w-100 post__other-posts-items"}>
                                    <GridAutoLayout max={"250px"}>
                                        {
                                            otherPosts.map(v=>(
                                                <div className={"post__item-card w-100"} key={Math.random()} >
                                                    <PostCardComponent {...v}  cssClass={"text-center h4"} showCategory={false} showRating={false} showDescription={false}/>
                                                </div>
                                            ))
                                        }
                                    </GridAutoLayout>
                                </div>
                            </div>
                        )
                    }
                </div>
            </BasicLayout>
            <div className={"backdrop"}>
                <BackdropComponent handleClose={onClose} open={open}>
                    <div className={"backdrop__content center"}>
                        <div className={"backdrop__image-container center w-100"}>
                            <img src={image} alt={"..."}/>
                        </div>
                    </div>
                </BackdropComponent>
            </div>
        </div>
    );
}