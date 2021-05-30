import React from 'react';
import {range} from 'lodash';
import {connect} from 'react-redux'


function PaginationComponent({num_pages = 3, page = 2, updateAction=()=>{}}){

    return (
        <div className={"pagination"}>
            <div className={"pagination__wrap"}>
                <div className={"pagination__content center"}>
                    <div className={"pagination__prev"}>
                        <div className={"pagination__item center"} onClick={()=>updateAction(page-1)}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 0.5H3V15.5H0.5V0.5ZM4.875 8L15.5 15.5V0.5L4.875 8Z" fill="black"/>
                            </svg>
                        </div>
                    </div>

                    <div className={"pagination__lines center"}>
                        {
                            range(1,num_pages+1,1).map(v=>{
                                const cssClass = v === page ? 'pagination__line-active' : '';
                                return (
                                    <div className={"pagination__line " + cssClass} key={v}  onClick={()=>updateAction(v)}></div>
                                )
                            })
                        }
                    </div>

                    <div className={"pagination__next"}>
                        <div className={"pagination__item center"}  onClick={()=>updateAction(page+1)}>
                            <svg width="29" height="27" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.25 20.25L17.5208 13.5L7.25 6.75V20.25ZM19.3333 6.75V20.25H21.75V6.75H19.3333Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(null)(PaginationComponent)