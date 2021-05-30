import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStylesFacebook = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    top: {
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
    },
    circle: {
        strokeLinecap: 'round',
    },
    bottom:{
        color:"#FFD850"
    }
}));

export default function OrangeProgressComponent(props) {
    const classes = useStylesFacebook();

    return (
        <div className={classes.root}>
            <CircularProgress
                className={classes.bottom}
                size={40}
            />
        </div>
    );
}
