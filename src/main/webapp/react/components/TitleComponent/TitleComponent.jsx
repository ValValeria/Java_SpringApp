import React from 'react';

export default function({headline=null}){
    return (
        <div className={"section__title"}>
            {headline}
            <div className={"section__line"}>
                <svg width="322" height="11" viewBox="0 0 322 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4L321 5" stroke="#E5E5E5" strokeWidth="4"/>
                    <path d="M109 5.00482H160.502H212.005" stroke="#414042" strokeWidth="10"/>
                </svg>
            </div>
        </div>
    )
}