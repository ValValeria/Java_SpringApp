import React from 'react';
import {Link} from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import './ButtonComponent.scss';

const useClasses = makeStyles({
   root: {
       borderRadius: "40px"
   }
});

export default function({title="",children,href="",type="button", onClick=()=>{}}){
    const classes = useClasses();
    let comp;

    if(title.length && !href.length){
        comp = <span className={"h4"}>{title}</span>;
    } else if(React.isValidElement(children)){
        comp = children;
    } else if(href.length){
        comp = <Link to={href}><span className={"h4"}>{title}</span></Link>;
    }

    return (
        <div className={"btn"}>
            <ButtonBase className={classes.root}>
                <div className={"btn-orange center"} type={type} onClick={onClick}>
                    {comp}
                </div>
            </ButtonBase>
        </div>
    )
}

