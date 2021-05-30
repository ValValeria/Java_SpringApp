import React, {useEffect, useState} from 'react';
import CardComponent from "../CardComponent/CardComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import NeoButtonComponent from "../NeoButtonComponent/NeoButtonComponent";
import FormErrorsComponent from "../FormErrorsComponent/FormErrorsComponent";
import {formUrlParamsString, makeHttpRequest} from "../../api/index";
import './ContactFormComponent.scss';
import SnackComponent from "../SnackComponent/SnackComponent";


function ContactFormComponent(){
    const[obj, updateObj] = useState({message:"", open:false});
    const [errors, updateErrors] = useState([]);
    const form = React.useRef();

    const submit = async ($event)=>{
        $event.preventDefault();

        if(!form.current.checkValidity()){
            updateErrors(["Please, check the validity of the form"]);
            return;
        } else{
            const formData = new FormData(form.current);

            const config = {
                method: "POST",
                body: formData
            };

            const url = formUrlParamsString("/api/addLetter");
            const data = makeHttpRequest(url, config);

            let message;

            if(data?.status === "ok"){
                message = "Your message has been sent successfully";
            } else{
                message = "Some errors has occurred. Please, retry again or reload the page";
            }

            updateObj((obj)=>Object.assign(obj,{message, open: true}))
        }
    };

    const reset = ()=>{
        const form = form.current;
        form.reset();
    };

    const checkValidity = ($event, inputName)=>{
        const input = $event.target;
        const validity = input.validity;
        const errors = [...errors];
        let message = ``;

        updateErrors([]);

        if(validity.valueMissing){
            message = `${inputName} is required`;
        } else if(validity.typeMismatch){
            let type = input.getAttribute("type");
            message = `${inputName} must match with type, named "${type}"`;
        } else if(validity.tooLong){
            let maxLength = input.getAttribute('maxLength');
            message = `${inputName} must be less than ${maxLength} characters`;
        } else if(validity.tooShort){
            let minLength = input.getAttribute('minLength');
            message = `${inputName} must be less than ${minLength} characters`;
        } else if(!validity.valid){
            message = `Please check the validity of ${inputName}`;
        }

        updateErrors([...errors,message])
    };

    useEffect(()=>{
        const formElement = form.current;

        Array.from(formElement.elements).forEach(v=>{
            v.addEventListener("input",($event)=>checkValidity($event,v.name))
        });
    }, [form]);

    return (
        <CardComponent padding={true} class={"form w-100 center"}>
            <div className={"center w-100"}>
                <SnackComponent {...obj}/>
                <div className={"form__area w-100"}>
                    <div className={"form__wrap"}>
                        <form className={"form__elem center"}
                              ref={form}
                              onSubmit={($event)=>submit($event)}
                              onClick={($event)=>submit($event)}
                        >
                            <div className={"form__control"}>
                                <input type={"email"} name={"email"} placeholder={"Email"} required minLength={10} maxLength={30}/>
                            </div>
                            <div className={"form__control"}>
                                <input type={"text"} name={"username"} placeholder={"Username"} required minLength={10} maxLength={30}/>
                            </div>
                            <div className={"form__control"}>
                                <textarea name={"message"} placeholder={"Your message"}  required minLength={10} maxLength={300}></textarea>
                            </div>
                            {
                                errors.length>0
                                && (
                                    <div className={"form__errors w-100"}>
                                        <FormErrorsComponent errors={errors}/>
                                    </div>
                                )
                            }
                            <div className={"form__btn center"}>
                                <ButtonComponent title={"Submit"} type={"submit"}/>
                            </div>
                            <div className={"form__btn center"}>
                                <NeoButtonComponent title={"Reset"} onClick={reset}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </CardComponent>
    );
}

export default ContactFormComponent