import React from 'react';
import {Avatar, Chip, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import {useHistory} from "react-router";
import OrangeProgressComponent from "../OrangeProgressComponent/OrangeProgressComponent";

export default function({items=[],  word = "", isLoaded}){
    const history = useHistory();

    const click = ()=>{
        const url = `/search/` + encodeURIComponent(word);
        history.push(url);
    }

    let Avatars = ()=>{
        if(window.matchMedia("(max-width:900px)").matches){
            return (
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon/>
                    </Avatar>
                </ListItemAvatar>
            );
        }

        return null;
    };

    if(items.length){
        return (
            <React.Fragment>
                {
                    items.map(v=>(
                        <ListItem button key={Math.random()} onClick={()=>{
                            history.push(`/post/${v.id}`)
                        }}>
                            <Avatars/>
                            <ListItemText
                                primary={<h5 className={"txt-bold"}>{v.title}</h5>}
                            />
                        </ListItem>
                    ))
                }
                <div className={"w-100 center"}>
                    <div className={"w-100 center"}>
                        <button className={"btn-orange-outlined mt"} onClick={()=>click()} style={{width:"80%"}}>
                                <span className={"h5 txt-light"}>
                                    View more
                                </span>
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    } else if (!isLoaded){
        return (
            <ListItem className={"search__loading w-100 center"}>
                <ListItemText className={"w-100 center"}>
                   <OrangeProgressComponent/>
                </ListItemText>
            </ListItem>
        );
    }

    return (
        <ListItem className={"search__no-results"}>
            <ListItemText primary={<h5>Sorry. But we don't have posts, matched to your query </h5>}/>
        </ListItem>
    );
}