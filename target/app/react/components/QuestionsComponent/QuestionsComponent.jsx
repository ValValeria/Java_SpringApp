import {useSelector} from "react-redux";
import React from "react";
import QuestionsItemComponent from "./QuestionsItemComponent";
import './QuestionsComponent.scss';

export default function(){
    const questions = useSelector(state=>state.data.pages.homePage.questions.questionsList);

    return (
        <div className={"questions "}>
            <div className={"questions__wrap center"}>
                <div className={"questions__elem"}>
                    <div className={"questions__content card "}>
                        {
                            questions.map(v=>(
                                <QuestionsItemComponent {...v} key={v.question+Math.random()}/>
                            ))
                        }
                    </div>
                </div>
                <div className={"questions__elem position-relative"} hidden={true}>
                    <div className={"questions__img-container"}>
                        <img src={"/public/images/js.png"} alt={"..."}/>
                        <div className={"questions__img"}></div>
                    </div>
                    <div className={"questions__logo"}>
                        <img src={"/public/images/react_logo.png"} alt={"..."}/>
                        <img src={"/public/images/next_logo.png"} alt={"..."}/>
                        <img src={"/public/images/webpack_logo.png"} alt={"..."}/>
                        <img src={"/public/images/glide_logo.png"} alt={"..."}/>
                    </div>
                </div>

                <div className={"questions__letters"} hidden>
                    QUESTIONS
                </div>
            </div>
        </div>
    )
}