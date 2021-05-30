import React from 'react';
import CardComponent from "../CardComponent/CardComponent";
import {$media} from "../../App";
import {auditTime} from "rxjs/operators";
import ExpensionComponent from "../ExpensionComponent/ExpensionComponent";
import './SidebarSearchComponent.scss';
import SearchBarContentComponent from "./SidebarSearchContComponent";


export default function(){
    const [isMedia, updateMedia] = React.useState(false);

    $media.pipe(auditTime(500)).subscribe(v=>{
          updateMedia(v);
    })

    const NotMediaSearch = ()=>(
        <CardComponent padding={true} class={"posts__search-content w-100"}>
            <div className={"text-center h3"}>Search</div>
            <SearchBarContentComponent/>
        </CardComponent>
    );

    const MediaSearch = ()=>(
        <div className={"w-100  posts__search-content"}>
            <ExpensionComponent title={"Search"}>
                <SearchBarContentComponent/>
            </ExpensionComponent>
        </div>
    )

    return (
      <div className={"posts__sidebar w-100"}>
          {isMedia ?
               <MediaSearch/>:
               <NotMediaSearch/>}
      </div>
    )
}