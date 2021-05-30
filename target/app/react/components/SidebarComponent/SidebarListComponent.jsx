import React from 'react';
import {connect} from 'react-redux'
import CardComponent from "../CardComponent/CardComponent";
import {Avatar, Button} from "@material-ui/core";
import ImageIcon from '@material-ui/icons/Image';
import {$media, showSnackbar$} from "../../App";
import ExpensionComponent from "../ExpensionComponent/ExpensionComponent";
import {auditTime} from "rxjs/operators";


const mapStateToProps = ({data})=>({
    data: data.pages.postsPage.mostPopular
});

const SideBarContentComponent = ({data, onClick})=> (
        <div className={"sidebar__items"}>
            <div className={"sidebar__item w-100"}>
                {
                    data.map(v=>{
                        return (
                            <Button key={v.title+Math.random()} className={"w-100"}>
                                <div className={"sidebar__item-content center w-100"}  onClick={($event)=>{
                                    $event.preventDefault();
                                    $event.stopPropagation( );
                                    onClick($event)
                                }}>
                                    <div className={"sidebar__item-avatar"}>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                    </div>
                                    <div className={"sidebar__item-txt text-left"}>
                                        <p className={"h4"}>{v.title}</p>
                                        <p className={"h5"}>{v.category}</p>
                                    </div>
                                </div>
                            </Button>
                        )
                    })
                }
            </div>
        </div>
);


function SidebarListComponent({data}){
    const [isMedia, updateMedia] = React.useState(false);

    $media.pipe(auditTime(300)).subscribe(v=>{
        updateMedia(v);
    });

    const MainElement = ()=>(
        <SideBarContentComponent data={data} onClick={()=>showSnackbar$.next({state: true, message: "These posts is unavailable"})}/>
    )

    const MediaSidebar = ()=>(
        <ExpensionComponent title={"Popular posts"}>
            <MainElement/>
        </ExpensionComponent>
    );

    const NotMediaSidebar = ()=>(
            <CardComponent padding={true} class={"sidebar__content w-100"}>
                <div className={"text-center h3"}>Popular posts</div>
                <MainElement/>
            </CardComponent>
    );

    return (
        <div className={"w-100 sidebar"}>
            {isMedia ? <MediaSidebar/> : <NotMediaSidebar/>}
        </div>);
}

export default connect(mapStateToProps)(SidebarListComponent)