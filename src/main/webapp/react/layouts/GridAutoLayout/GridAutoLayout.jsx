import React from 'react';
import './GridAutoLayout.scss'

/**
 * @param min
 * @param max
 * @param children
 * @param grid
 * @param {object} style
 * @returns {JSX.Element}
 */
export default function({min= "250px", max="1fr",children=null, grid='', style={}}){
    let styles = {gridTemplateColumns: `repeat(auto-fit,minmax(${min},${max}))`};

    if(!min && !max){
        if(grid != null && grid.length>0 && Object.values(style).length>0){
            styles.gridTemplateColumns = grid;
        } else if(typeof style === "object"){
            styles = style;
        }
    }

    return (
        <div className={"grid"} role={"component"}>
            <div className={"grid__items"} style={styles}>
                {children}
            </div>
        </div>
    )
}