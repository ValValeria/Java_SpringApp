import React from 'react';
import PostLayout from "../../layouts/PostLayout/PostLayout";
import ImageButtonComponent from "../../components/ImageButtonComponent/ImageButtonComponent";
import {getNewPost, getNewPosts} from "../../store";
import {formBlog} from '../../functions';
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import OrangeProgressComponent from "../../components/OrangeProgressComponent/OrangeProgressComponent";
import {connect} from 'react-redux';
import './PostPage.scss';
import PostNotFound from "../../components/PostNotFound";
import {Alert} from "@material-ui/lab";
import {Snackbar} from "@material-ui/core";


const mapStateToProps = ({data})=>({
    post:(id)=> data.pages.postsPage.filteredPosts.find((v)=>{
        return parseInt(v.id, 10) === parseInt(id,10);
    }),
    otherPosts:(id)=> data.pages.postsPage.filteredPosts.filter((v)=>{
        return parseInt(v.id) !== parseInt(id);
    }).slice(0,3),
    isError: [data.pages.postPage.isError, data.pages.postPage.noPost]
});


const mapDispatchToProps = (dispatch)=>({
      getPost: (num) => dispatch(getNewPost(num)),
      getOtherPosts: (num) => dispatch(getNewPosts(num))
});


class PostPage extends React.Component{
     constructor(props) {
         super(props);

         this.state = {
             data: [
                 {title:"Home",href:"/"},
                 {title:"Posts",href:"/posts"},
                 {title:"Post",active:true},
             ],
             elements:[],
             id: props.match.params.id,
             isLoading: true,
             open: false
         }
     }

     componentDidMount() {
         this.props.getOtherPosts(1, this.state.id);

         this.props.getPost(this.state.id)
             .then(()=>{
                 this.setState({isLoading: false});

                 if(this.props.post(this.state.id)){
                     const arr = formBlog(this.props.post(this.state.id),[...this.state.elements]);
                     this.updateElements(arr);
                 } else{
                     throw new Error();
                 }
             })
             .catch(v=>{
                 console.log(v)
             })
     }

     updateElements(arr){
         console.log(arr)
         this.setState({
             elements: arr
         });
     }

     render(){
         const otherPosts = this.props.otherPosts(this.state.id);

         const PostPageContent = ()=>(
             <PostLayout {...this.props.post(this.state.id)} data={this.state.data} otherPosts={otherPosts}>
                 <div className={"post__items w-100"}>
                     <div className={"post__item card center"}>
                         {
                             this.state.elements.length > 0
                                 ? [this.state.elements] : (
                                     <div className={"post__spinner"}>
                                         <OrangeProgressComponent/>
                                     </div>
                                 )
                         }
                     </div>
                     <div className={"post__item w-100 "} onClick={()=>this.setState({open: true})}>
                         <ImageButtonComponent title={"Subscribe to our channel"} image={"/public/images/code.png"}/>
                     </div>
                 </div>
             </PostLayout>
         );

         const LoadingPageContent = ()=>(
             <BasicLayout css_class={"w-100"}>
                 <div className={"center w-100"}>
                     <OrangeProgressComponent/>
                 </div>
             </BasicLayout>
         )

         let Content = null;

         if(Object.values(this.props.post(this.state.id)||{}).length>0){
            Content = <PostPageContent/>;
         } else if(this.state.isLoading){
            Content = <LoadingPageContent/>;
         } else if(!this.state.isLoading){
            Content = <PostNotFound/>;
         }

         return (
             <React.Fragment>
                 <div className={"post w-100"} aria-label={"post"}>
                     {Content}
                 </div>
                 <Snackbar open={this.state.open} autoHideDuration={6000} onClose={()=>this.setState({open: false})}>
                     <Alert onClose={()=>this.setState({open: false})} severity="error">
                         We are sorry, but we haven't had any channel yet.
                     </Alert>
                 </Snackbar>
             </React.Fragment>
         );
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)