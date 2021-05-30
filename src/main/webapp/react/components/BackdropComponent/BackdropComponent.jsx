import React from 'react';
import {Dialog} from "@material-ui/core";

export default function({open, handleClose, children}){
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            {children}
        </Dialog>
        );
}