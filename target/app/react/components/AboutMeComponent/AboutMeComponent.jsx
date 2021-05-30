import React from 'react';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import './AboutMeComponent.scss';
import {smoothScroll} from "../../functions/functions";


export default function(){
    const goToProjects = ($event) => {
          smoothScroll("#projects");
    };

    return (
        <div className={"about"}>
             <div className={"about__wrap w-100"}>
                 <div className={"about__content w-100"}>

                     <div className={"about__items center w-100"}>
                         <div className={"about__item"}>
                             <div className={"about__headline"}>
                                 <span className={"h2"}>Valeria Dorosh</span>
                                 <div className={"h4"}>Programmer / Designer</div>
                             </div>
                             <div className={"about__description h5"}>
                                 As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative programming styles. It has application programming interfaces (APIs) for working with text, dates, regular expressions, standard data structures, and the Document Object Model (DOM).
                             </div>
                             <div className={"about__btn"} onClick={goToProjects}>
                                 <ButtonComponent>
                                     <span className={"h4"}>
                                         View projects
                                     </span>
                                 </ButtonComponent>
                             </div>
                         </div>
                         <div className={"about__item center"}>
                             <div className={"about__img-wrap center w-100"}>
                                 <div className={"about__img-container center"}>
                                     <img src={"/public/images/img1.png"} alt={"..."} className={"about__img-content"}/>
                                     <img src={"/public/images/img2.svg"} alt={"..."} className={"about__img-background"}/>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    );
}