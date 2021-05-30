import React from 'react';
import CardComponent from "../CardComponent/CardComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import './ImageCardComponent.scss';
import ImageLoadingComponent from "../ImageLoadingComponent/ImageLoadingComponent";

export default function({image="",title="",id=1, link="", css_class=""}){
    return (
        <CardComponent class={"img-card "+css_class} padding={"0"}>
             <>
                 <div className={"img-card__img"}>
                     <ImageLoadingComponent src={image}/>
                 </div>
                <div className={"img-card__content center"}>
                    <div className={"img-card__title"}>
                        <h4 className={"h4"}>{title}</h4>
                    </div>
                    <div className={"img-card__list-btn"}>
                        <ButtonComponent title={"Read more"} href={link.length ? link :"/project/"+id}/>
                    </div>
                </div>
             </>
        </CardComponent>
    )
}