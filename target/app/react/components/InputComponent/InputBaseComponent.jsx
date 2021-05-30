import React from 'react';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import {fade, makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: "pointer"
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function({label,onChange=()=>{}, onSubmit=()=>{},onBlur=()=>{},onFocus=()=>{},...otherProps}){
    const classes = useStyles();

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon onClick={onSubmit}/>
            </div>
            <InputBase
            {...otherProps}
            placeholder={label}
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={(event)=>{
                onChange(event);
            }}
            onBlur={onBlur}
            onFocus={onFocus}
            />
        </div>
    )
}