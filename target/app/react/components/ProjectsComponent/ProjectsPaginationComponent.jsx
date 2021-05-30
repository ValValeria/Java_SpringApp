import React from 'react';
import {connect} from "react-redux";
import {chunk} from "lodash";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import {updateProjectsPage} from "../../store";

const mapStateToProps = ({data})=>{
    const projects = data.pages.homePage.projects;

    return {
        items: chunk(projects.projectsList,projects.per_page),
        page:projects.page,
        num_pages: projects.num_pages,
        per_page: projects.per_page
    };
}

const mapDispatchToProps = (dispatch)=>({
    updatePage: (num)=>dispatch(updateProjectsPage(num))
});

class ProjectsPaginationComponent extends React.PureComponent{
    render(){
        if(this.props.num_pages>this.props.per_page) {
            return (
                <PaginationComponent page={this.props.page} items={this.props.items} num_pages={this.props.num_pages}
                                     updateAction={this.props.updatePage}/>
            );
        }
        return null;
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProjectsPaginationComponent);