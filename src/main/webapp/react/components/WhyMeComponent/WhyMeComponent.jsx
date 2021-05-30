import React from 'react';
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import GridAutoLayout from "../../layouts/GridAutoLayout/GridAutoLayout";
import './WhyMeComponent.scss';
import {useSelector} from "react-redux";

export default function(){
    const reasonsList = useSelector(({data})=>data.pages.homePage.reasons);

    return (
        <div className={"reasons"}>
            <BasicLayout title={"Three reasons"}>
                <GridAutoLayout>
                    {
                        reasonsList.map(v=>(
                            <div  key={Math.random()} className={"reason text-center"}>
                                <div className={"reason__img"}>
                                    <img alt={"..."} src={v.img}/>
                                </div>
                                <div className={"reason__title"}>
                                    <h4>
                                        {v.title}
                                    </h4>
                                </div>
                                <div className={"reason__description"}>
                                    <h5>
                                        {v.description}
                                    </h5>
                                </div>
                            </div>
                        ))
                    }
                </GridAutoLayout>
            </BasicLayout>
        </div>
    )
}