import React from 'react';
import {$media} from "../../App";
import {auditTime} from "rxjs/operators";
import CardComponent from "../CardComponent/CardComponent";
import ExpensionComponent from "../ExpensionComponent/ExpensionComponent";
import CommentsContentComponent from './CommentsContentComponent';

export default class extends React.PureComponent{
    constructor(props) {
        super(props);

        this.state={
            media: false
        }
    }

    componentDidMount() {
        $media.pipe(auditTime(300)).subscribe(v=>{
            this.setState({media:v});
        })
    }

    render(){
        const NotMediaComments = ()=>(
            <CardComponent padding={true} class={"w-100"}>
                <div className={"text-center h3"}>Comments</div>
                <CommentsContentComponent/>
            </CardComponent>
        );

        const MediaComments = ()=>(
            <div className={"w-100"}>
                <ExpensionComponent title={"New comments"}>
                    <CommentsContentComponent/>
                </ExpensionComponent>
            </div>
        )

        return (
            <div className={"posts__comments w-100"}>
                {!this.state.media ?
                    <NotMediaComments/>:
                    <MediaComments/>}
            </div>
        )
    }
}
