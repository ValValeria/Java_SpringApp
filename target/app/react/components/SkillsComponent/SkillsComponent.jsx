import React, {useState} from 'react';
import CardComponent from "../CardComponent/CardComponent";
import {chunk} from 'lodash';
import {connect} from 'react-redux';
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import {updatePage} from "../../store";

const mapDispatchToProps = (dispatch)=>({
    updateAction:(num)=> dispatch(updatePage(num))
});

const mapStateToProps = (state)=>{
    const skills = state.data.pages.homePage.skills;

    return {
        items: chunk(skills.skillsList,skills.per_page),
        page:skills.page,
        num_pages: skills.num_pages
    };
};


function SkillsComponent({items, page, num_pages, updateAction}){

    return (
        <div className={"skills"} id={"skills"}>
            <div className={"skills__wrap center"}>
               <div className={"skills__list center"}>
                   {
                       (items[page-1]||[]).length &&
                       items[page-1].map((v, index)=>{
                           return (
                               <CardComponent padding={true} class={"skills__item card-transition"} key={v.title + index}>
                                   <div className={"skills__item-title"}>
                                       <h3>{v.title}</h3>
                                       <span>
                                           <svg width="34" height="5" viewBox="0 0 34 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path d="M0.47226 2.13525H25.7756H33.8601" stroke="#414042" strokeWidth="4"/>
                                           </svg>
                                       </span>
                                   </div>
                                   <div className={"skills__item-description"}>
                                       <h5>{v.description}</h5>
                                   </div>
                                   <div className={"skills__item-img-container center"}>
                                       <img src={v.image} alt={v.title+" logo"} className={"skills__img"}/>
                                   </div>
                               </CardComponent>
                           )
                       })
                   }
               </div>
                <div className={"skills__pagination"}>
                    <PaginationComponent num_pages={num_pages} page={page} updateAction={updateAction}/>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillsComponent)