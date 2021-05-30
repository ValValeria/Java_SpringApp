import React from 'react';
import {Avatar, Button} from '@material-ui/core'
import './CommentsItemComponent.scss';

export default function({username,date, comment, postId}){

    return (
        <div className={"comment w-100"} onClick={()=>history.push("/post/"+postId)}>
            <Button className={"comment__wrap w-100"}>
                <div className={"comment__content center w-100"}>
                    <div className={"comment__user-avatar"}>
                        <Avatar>
                            {username.charAt(0).toUpperCase()}
                        </Avatar>
                    </div>
                    <div className={"comment-txt text-left"}>
                        <p className={"h4"}>{username}</p>
                        <p className={"h5"}>{comment.slice(0,20)}</p>
                    </div>
                </div>
            </Button>
        </div>
    );
}