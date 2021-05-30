import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        color:"#414042"
    },
    accordion:{
        boxShadow:"-4px -4px 16px #FFFFFF, 4px 4px 20px #CAD6E2",
        borderRadius: 25,
        backgroundColor:"#f5f6f7",
        padding:`1.25rem ${1.25*2}rem`
    }
}));

export default function ExpensionComponent({title, children}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div className={classes.heading}>
                        <h4 className={"w-100 text-center"}>{title}</h4>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    {children}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}