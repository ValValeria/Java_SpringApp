import React from 'react';
import Decoration from "../../components/DecorationComponent/DecorationComponent";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";

export default function(){
    return (
        <div className={"notfound w-100 position-relative"}>
            <Decoration styles={{bottom:0, left: "5%"}}/>
            <BasicLayout title={"404"} description={"The page you are looking for is not found"}>
                <div className={"notfound__img center w-100"}>
                    <img src={"/public/images/404-error.svg"} alt={"..."}/>
                </div>
            </BasicLayout>
            <Decoration styles={{top:0, right: "5%"}}/>
        </div>
    );
}