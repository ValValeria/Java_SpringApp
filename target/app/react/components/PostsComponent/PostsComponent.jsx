import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import GridAutoLayout from "../../layouts/GridAutoLayout/GridAutoLayout";
import './PostsComponent.scss'
import ImageCardComponent from "../ImageCardComponent/ImageCardComponent";
import {formUrlParamsString, makeHttpRequest} from "../../api";


export default function(){
    const [data, updateData] = React.useState([]);

    useEffect(()=>{
        (async ()=>{
            const url = formUrlParamsString("/api/blog/posts",{page:1,per_page:3});
            const response = await makeHttpRequest(url);
            const data = response?.response?.responseData?.data?.results || [];
            updateData(()=>data);
            console.log(data)
        })()
    }, []);

    return (
        <div className={"posts w-100"} page={"home"}>
            <BasicLayout title={"Blog"} description={"Find some interesting posts about programming"}>
               <div className={"posts__list"}>
                   <GridAutoLayout max={"300px"}>
                       <>
                           {
                               (Array.isArray(data) ? data : []).map(v=>{
                                   return (
                                       <div className={"posts__item w-100"} key={Math.random()}>
                                           <ImageCardComponent {...v} link={"/post/"+v.id} css_class={"card-transition"}/>
                                       </div>
                                   )
                               })
                           }
                       </>
                   </GridAutoLayout>
               </div>
            </BasicLayout>
        </div>
    );
}