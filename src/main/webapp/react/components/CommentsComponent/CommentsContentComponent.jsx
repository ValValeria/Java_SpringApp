import React from 'react';
import CommentsItemComponent from "./CommentsItemComponent/CommentsItemComponent";
import {connect} from 'react-redux';

const mapStateToProps = ({data})=>({
    comments:data.pages.postsPage.comments
})

class CommentsContentComponent extends React.PureComponent{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className={"posts__comments"}>
                 <div className={"posts__comment"}>
                     {
                         this.props.comments.map(v=>(
                             <CommentsItemComponent {...v} key={Math.random()}/>
                         ))
                     }
                 </div>
            </div>);
    }
}

export default connect(mapStateToProps)(CommentsContentComponent)