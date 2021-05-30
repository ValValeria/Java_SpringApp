import React from 'react';
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import {CircularProgress, makeStyles} from "@material-ui/core";

const useStylesFacebook = makeStyles((theme) => ({
    root: {
        position: 'relative',
        width:"100%"
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
        color: '#1a90ff',
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
    },
    circle: {
        strokeLinecap: 'round',
    },
}));

export default function(){
    const classes = useStylesFacebook();

    return (
        <div className={"loading-wh"}>
            <div className={"loading__container-wh"}>
                <div className={"w-100"}>
                    <div className={"loading__content-wh w-100 center"}>
                          <div className={classes.root}>
                                  <CircularProgress
                                      variant="determinate"
                                      className={classes.bottom}
                                      size={40}
                                      thickness={4}
                                      value={100}
                                  />
                          </div>
                    </div>
                </div>
            </div>
        </div>
    );
}