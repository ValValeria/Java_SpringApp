import {Alert} from "@material-ui/lab";
import React from "react";


/**
 * Renders form errors
 * @param {string[]} errors
 * @returns {JSX.Element|null}
 */
const FormErrorsComponent = ({errors=[]})=>{
    const data = errors.filter(v=>v).map(v=>({severity:"error",message:v}));

    if(data.length){
        return (
              <>
                {
                    data.map(({severity="info",message=""})=>{
                        return (
                            <div className={"w-100"} key={Math.random()}>
                                <Alert severity={severity}>
                                    {message}
                                </Alert>
                            </div>);
                    })
                }
            </>
        )
    }
    return null;
}

export default FormErrorsComponent;