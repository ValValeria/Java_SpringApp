import React from 'react';
import './index.scss';
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";

export default function PostNotFound(){
    return (
        <div className={"post-404"}>
            <div className={"post-404__area notfound w-100 position-relative"}>
                <BasicLayout title={"404"} css_class={"post-404__content"}>
                    <div className={"post-404__description w-100 text-center h4 mb"}>The post you are looking for is not found</div>
                    <div className={"notfound__img center w-100 mt"}>
                        <img src={"/public/images/404-error.svg"} alt={"..."}/>
                    </div>
                </BasicLayout>
            </div>
        </div>
    );
}