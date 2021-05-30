import React from 'react';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import CardComponent from "../CardComponent/CardComponent";
import {Avatar, Chip} from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import {Rating} from "@material-ui/lab";
import './PostCardComponent.scss';
import ImageLoadingComponent from "../ImageLoadingComponent/ImageLoadingComponent";

export default function({title, cssClass="h3",description,image,id,category = "{}",showCategory = true,showDescription=true,showRating=true}) {
    const categories = JSON.parse(category);

    return (
        <div className={"posts__item-area w-100"} role={"component"}>
            <CardComponent class={"posts__item-card"} padding={"0"}>
                <>
                    <div className={"posts__item-image"}>
                        <ImageLoadingComponent src={image}/>
                    </div>
                    <div className={"posts__item-content center position-relative"}>
                        <div className={"posts__item-title"}>
                            <div className={cssClass}>{title}</div>
                        </div>
                        {showCategory && (
                            <div className={"posts__item-category"}>
                                {
                                    categories.map(v=>(
                                        <Chip
                                            avatar={<Avatar>{v.charAt(0).toUpperCase()}</Avatar>}
                                            label={v}
                                            clickable
                                            color="primary"
                                            deleteIcon={<DoneIcon />}
                                            key={Math.random()}
                                        />
                                    ))
                                }
                            </div>
                        )}
                        {
                            showDescription ?
                                (
                                    <div className={"posts__item-txt"}>
                                        <h5>{description}</h5>
                                    </div>
                                )
                                : null
                        }
                        <div className={"posts__item-btn"}>
                            <ButtonComponent title={"Read more"} href={"/post/"+id}/>
                        </div>
                        {
                            showRating ? (
                                <div className={"posts__stars"}>
                                    <Rating name="read-only" value={5} readOnly />
                                </div>
                            ) : null
                        }
                    </div>
                </>
            </CardComponent>
        </div>
    );
}