import React from 'react';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import {smoothScroll} from "../../functions/functions";

export default class extends React.PureComponent{
    click(){
        console.log("click");
        smoothScroll("#skills");
    }
    render(){
        return (
            <section className={"banner center"}>
                <div className={"banner__wrap wrap-md center"}>
                    <div className={"wrap-md"}>
                        <div className={"banner__content center "}>
                            <div className={"banner__items"}>
                                <h1 style={{fontWeight:700}}>
                                    {"Creating stunning websites".toUpperCase()}
                                </h1>
                                <p className={"h4 txt-grey"}>
                                    Creating websites with JavaScript, Php, Python and Java
                                </p>
                                <ButtonComponent title={"Learn more"} onClick={()=>this.click()}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"banner__image center"}>
                    <div className={"banner__eclipse"}>
                        <img src={"/public/images/eclipse.svg"} alt={"..."}/>
                    </div>
                    <div className={"banner__eclipse"}>
                        <img src={"/public/images/eclipse.svg"} alt={"..."}/>
                    </div>
                    <div className={"banner__eclipse"}>
                        <img src={"/public/images/eclipse.svg"} alt={"..."}/>
                    </div>
                    <div className={"banner__eclipse"}>
                        <img src={"/public/images/eclipse.svg"} alt={"..."}/>
                    </div>
                    <div className={"banner__eclipse"}>
                        <img src={"/public/images/eclipse.svg"} alt={"..."}/>
                    </div>
                    <div className={"banner__eclipse"}>
                        <img src={"/public/images/eclipse.svg"} alt={"..."}/>
                    </div>
                </div>
            </section>
        );
    }
}