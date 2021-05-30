import React from 'react';
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import './ContactsPage.scss';
import ContactFormComponent from "../../components/ContactComponent/ContactFormComponent";

export default class extends React.PureComponent{
    render(){
        return (
            <div className={"contacts w-100"}>
                 <BasicLayout title={"Contacts"}>
                      <div className={"contacts__content w-100 center"}>
                          <div className={"contacts__form"}>
                                 <ContactFormComponent/>
                          </div>
                      </div>
                 </BasicLayout>
            </div>
        )
    }
}