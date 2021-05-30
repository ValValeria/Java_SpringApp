import React from 'react';

export default class extends React.PureComponent{
    render(){
        let styles = {};

        if(this.props.padding){
            styles = {padding: this.props.padding}
        }

        return (
            <div className={"card " + (this.props.class||'')} style={styles}>
                <div className={"card__wrap w-100"}>
                    <div className={"card__content"}>
                          <div className={"card__items"}>
                              {this.props.children}
                          </div>
                    </div>
                </div>
            </div>
        )
    }
}