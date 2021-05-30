import React from 'react';
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import './GetEmailsComponent.scss';
import { Snackbar } from '@material-ui/core';
import {Alert} from "@material-ui/lab";


export default function(){
    const [open, updateOpen] = React.useState(false);

    const click = ()=>{
        updateOpen(true);
    };

    const handleClose = ()=>{
        updateOpen(false);
    };

    return (
        <BasicLayout title={<h1>Subscribe</h1>}>
            <>
             <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        We are sorry, but we haven't had any channel yet.
                    </Alert>
             </Snackbar>
             <div className={"get-emails w-100 center"}>
                 <div className={"get-emails__wrap w-100 center"}>
                     <div className={"get-emails__content"}>
                         <div className={"card w-100 center"}>
                             <div className={"get-emails__input mr"}>
                                 <input type={"email"} placeholder={"Subscribe to our channel"}/>
                             </div>
                             <div className={"get-emails__btn"}>
                                 <ButtonComponent title={"Submit"} onClick={click}/>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
             </>
        </BasicLayout>
    );
}