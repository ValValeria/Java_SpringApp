import React from 'react';
import PropTypes from 'prop-types';
import './BasicLayout.scss';


export default function BasicLayout({showLetters=true,title='', txt="", children=[],description="",css_class=""}){
    let reactTitle;
    let showTitle;

    if(React.isValidElement(title||{}) || title.length){
        let elem;

        if(React.isValidElement(title||{})){
            elem = title;
            showTitle = txt;
        } else{
            elem = <span className={"h1"}>{title.toUpperCase()}</span>
            showTitle = title;
        }

        reactTitle =  (
            <div className={"section__title"}>
                {elem}
                <div className={"section__line"}>
                    <svg width="322" height="11" viewBox="0 0 322 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4L321 5" stroke="#E5E5E5" strokeWidth="4"/>
                        <path d="M109 5.00482H160.502H212.005" stroke="#414042" strokeWidth="10"/>
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <section className={"section  position-relative "+css_class}>
            <div className={"section__wrap"}>
                <div className={"section__content"}>
                    {reactTitle}
                    <div className={"section__items wrap-md"}>
                        {children}
                    </div>
                </div>
                {
                    showLetters &&
                    (
                        <div className={"section__letters"}>
                            {showTitle}
                        </div>
                    )
                }
            </div>
        </section>
    )
}

BasicLayout.propTypes = {
    children: PropTypes.element
}

