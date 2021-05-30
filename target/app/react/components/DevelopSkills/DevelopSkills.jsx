import React from 'react';
import './DevelopSkills.scss';
import ImageLoadingComponent from "../ImageLoadingComponent/ImageLoadingComponent";
import GridAutoLayout from "../../layouts/GridAutoLayout/GridAutoLayout";
import {connect} from 'react-redux';
import {PhoneIphone} from "@material-ui/icons";


const mapStateToProps = ({data}) => ({
    data: data.pages.homePage.developSkills
});

class DevelopSkills extends React.PureComponent{
    constructor(props) {
        super(props);

        this.state = {
            data: props.data
        };
    }

    render(){
        const styles = {gridTemplateColumns: '25% 46% 25%'};

        return (
            <div className={"develop-skills w-100 card"}>
               <GridAutoLayout style={styles}>
                   <React.Fragment>
                       <div className={"develop-skills__list develop-skills__list-left"}>
                           <GridAutoLayout style={{gridTemplateColumns: '1fr'}}>
                               <React.Fragment>
                                   {
                                       this.state.data.slice(0,2).map(v => {
                                           return (
                                               <div className={"develop-skills__item"} key={Math.random()}>
                                                   <div className={"develop-skills__title h4 txt-bold mb-half"}>
                                                       {v.title}
                                                   </div>
                                                   <div className={"develop-skills__description h5"}>
                                                       {v.txt}
                                                   </div>
                                                   <div className={"develop-skills__icon"}>
                                                       <PhoneIphone/>
                                                   </div>
                                               </div>
                                           )
                                       })
                                   }
                               </React.Fragment>
                           </GridAutoLayout>
                       </div>
                       <div className={"develop-skills__img"}>
                           <ImageLoadingComponent src={"/public/images/phone.gif"}/>
                       </div>
                       <div className={"develop-skills__list develop-skills__list-right"}>
                           <GridAutoLayout style={{gridTemplateColumns: '1fr'}}>
                               <React.Fragment>
                               {
                                   this.state.data.slice(2, 5).map(v => {
                                       return (
                                           <div className={"develop-skills__item"} key={Math.random()}>
                                               <div className={"develop-skills__title h4 txt-bold mb-half"}>
                                                   {v.title}
                                               </div>
                                               <div className={"develop-skills__description h5"}>
                                                   {v.txt}
                                               </div>
                                               <div className={"develop-skills__icon"}>
                                                   <PhoneIphone/>
                                               </div>
                                           </div>
                                       )
                                   })
                               }
                               </React.Fragment>
                           </GridAutoLayout>
                       </div>
                   </React.Fragment>
               </GridAutoLayout>
            </div>
        );
    }
}

export default connect(mapStateToProps)(DevelopSkills);