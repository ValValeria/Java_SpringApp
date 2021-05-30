import React from 'react';
import ContactFormComponent from "./ContactFormComponent";

export default class extends React.PureComponent{
    render() {
        return (
            <div className={"contacts w-100 position-relative"}>
                <div className={"contacts__wrap"}>
                    <div className={"contacts__content w-100 center"}>
                        <ContactFormComponent/>
                    </div>
                </div>
            </div>
        )
    }
}