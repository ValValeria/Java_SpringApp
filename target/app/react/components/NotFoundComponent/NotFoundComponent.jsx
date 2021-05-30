import React from 'react';
import './NotFoundComponent.scss';

export default function(){
    return (
        <div className={"not-found not-found-sm card"} >
            <div className={"not-found__container center"}>
                <div className={"not-found__content w-100 center flex-column"}>
                    <div className={"not-found__img center mb"}>
                        <img src={"/public/images/404.svg"} alt={"..."}/>
                    </div>
                    <h4 className={"mb text-center"}>Sorry. But there are no posts</h4>
                </div>
            </div>
        </div>
    );
}