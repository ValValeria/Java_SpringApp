import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {showSnackbar$} from "../../App";
import {auditTime, skipWhile} from "rxjs/operators";

export default function SnackComponent({state= false, message = ""}) {
    const [data, setOpen] = React.useState({state, message});

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen((data)=>({...data, state: false}));
    };

    useEffect(()=>{
        setOpen({state, message});
    },[state, message]);

    showSnackbar$.pipe(auditTime(100), skipWhile(()=>data.state)).subscribe(v=>{
        setOpen({state: v.state, message: v.message});
    });

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={data.state}
                autoHideDuration={6000}
                onClose={handleClose}
                message={data.message}
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleClose}>
                            Close
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}