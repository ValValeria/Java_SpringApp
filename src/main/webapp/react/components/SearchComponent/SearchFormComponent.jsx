import React from 'react';
import InputBaseComponent from "../InputComponent/InputBaseComponent";
import {
    List,
    ListSubheader,
    makeStyles,
} from "@material-ui/core";
import './SearchFormComponent.scss';
import SearchResultsComponent from "./SearchResultsComponent";
import {formUrlParamsString, makeHttpRequest} from "../../api";
import SnackComponent from "../SnackComponent/SnackComponent";


const useStyles = makeStyles((theme) => ({
      root:{
          width: '100%',
          maxWidth: 900,
          margin: "0 auto"
      }
}));

export default function SearchFormComponent(){
    const messages = {
        inputError: "The quantity of letters must be between 2 and 20 characters",
        httpError: "Some http errors has occurred. We are sorry"
    };
    const classes = useStyles();
    const [items, updateItems] = React.useState([]);
    const [allItemsNum, updateAllItemsNum] = React.useState(0);
    const [searchData, updateSearchData] = React.useState({isSubmitted: false, isLoaded: false});
    const [word, updateWord] = React.useState("");
    const [snackbarData, updateSnackbarData] = React.useState({state:false,message: messages.inputError});

    const onChange = React.useCallback(async (event)=>{
          const text = event.target.value.trim().toLowerCase();
          updateWord(text);
          updateSearchData((_state)=>({isSubmitted: false, isLoaded: false}));

          return true;
    },[]);

    const onSubmit = React.useCallback(async()=>{
        try{
            if(word.length>20 || word.length<2){
                updateSnackbarData((_state)=>({message: messages.inputError,state: true}));
            } else{
                updateSearchData((_state)=>({isSubmitted: true, isLoaded: false}));

                const url = formUrlParamsString("/api/search",{search:word, page:1, per_page:3});
                const response = await makeHttpRequest(url);
                const responseData = response.response.responseData?.data;

                updateSearchData((state)=>({isSubmitted: true, isLoaded: true}));

                if(responseData && Array.isArray(responseData?.results)) {
                    const results = responseData.results;
                    const allResultsNum = responseData.allResults;

                    updateItems(results.filter(v=>v));
                    updateAllItemsNum(allResultsNum);
                }
            }
        }catch (e) {
            console.error(e);
            updateSnackbarData((state)=>({message: messages.httpError,state: true}));
        }

        return true;
    },[word]);

    return (
        <div className={"search w-100 position-relative"}>
             <div className={"search__input w-100"} id={"search__input"}>
                 <SnackComponent {...snackbarData}/>
                 <InputBaseComponent
                         label={"Search..."}
                         onChange={async ($event)=>{
                             await onChange($event);

                             if(!window.matchMedia("(max-width:900px)").matches){
                                 await onSubmit();
                             }
                         }}
                         onFocus={()=>{
                             updateItems([]);
                         }}
                         onBlur={()=>{
                             updateItems([]);
                             updateSearchData((state)=>({isSubmitted: false, isLoaded: false}));
                         }}
                         onSubmit={onSubmit}
                 />
                 {
                     searchData.isSubmitted ? (
                         <div className={"search__results w-100"}>
                             <div className={"search__list w-100 card"}>
                                 <List
                                     className={classes.root}
                                 >
                                     <SearchResultsComponent items={items} allResults={allItemsNum} {...searchData} word={word}/>
                                 </List>
                             </div>
                         </div>
                     ):null
                 }
             </div>
        </div>
    );
}