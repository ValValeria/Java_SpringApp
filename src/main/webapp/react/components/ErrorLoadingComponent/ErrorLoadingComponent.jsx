import React from 'react';
import './ErrorLoadingComponent.scss';

export default function(){
    return (
        <div className={"error card"}>
            <div className={"error__container"}>
                 <div className={"error__content w-100 center"}>
                     <div className={"error__img mb"}>
                         <img src={"/public/images/error.svg"} alt={"..."}/>
                     </div>
                     <h4 className={"text-center mb"}> Some errors has occurred. Please, reload the page/</h4>
                 </div>
            </div>
        </div>
    );
}