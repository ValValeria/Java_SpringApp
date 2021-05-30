import React from 'react';

export default function({styles={}}){
    return (
        <div className={"decoration"} style={styles}>
            <div className={"decoration__img"}>
                <img src={"/public/images/neo.svg"} alt={"..."}/>
            </div>
        </div>
    )
}
