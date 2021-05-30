import React from 'react';

export default function NeoButtonComponent({title="", onClick=()=>{}}){
    return (
        <button className={"btn-orange btn-neo center"} onClick={onClick}>
            <h4>{title}</h4>
        </button>
    )
}
