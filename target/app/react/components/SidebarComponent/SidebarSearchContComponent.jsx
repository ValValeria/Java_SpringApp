import React, {useLayoutEffect} from "react";
import {useDispatch} from "react-redux";
import {addPosts, updatePostsUrl} from "../../store";
import {Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select} from "@material-ui/core";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import {formUrlParamsString, makeHttpRequest} from "../../api";
import {Subject} from "rxjs";
import SnackComponent from "../SnackComponent/SnackComponent";


export const loadPosts$ = new Subject();

const SearchBarContentComponent = ()=> {
    const [sortByAsc, updateSortByAsc] = React.useState(true);
    const [snackbar,showSnackbar] = React.useState(false);
    const [category,updateCategory] = React.useState("js");
    const [categoryList, addCategories] = React.useState([]);
    const dispatch = useDispatch();

    const submit = async ()=>{
        if(category === "all"){
           loadPosts$.next(1);
        } else{
            const url = formUrlParamsString("/api/blog/sort/category/"+category, {page:1 ,per_page:3});
            const response = await makeHttpRequest(url);
            const data = response.response.responseData?.data;

            dispatch(updatePostsUrl("/api/blog/sort/category/"+category))

            if(data && typeof data === "object" && Array.isArray(data.results)){
                const obj = {
                    data: data.results,
                    page: 1,
                    numPages: data.totalPages,
                    perPage: 3
                }

                dispatch(addPosts(obj));
            }
        }
    }

    useLayoutEffect(()=>{
        (async()=>{
            const url = "http://localhost:8080/api/blog/categories";
            const response = await makeHttpRequest(url);
            const data = response.response.responseData?.data || [];

            if(Array.isArray(data) && data.length){
                addCategories(data);
            }
        })();
    }, []);

    return (
        <div className={"posts__search-filters"}>
            <SnackComponent state={snackbar} message={"Sorry, but this functionality is unavailable now"}/>
            <div className={"posts__search-filter"}>
                <FormControl className={"w-100"}>
                    <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                    <Select
                        className={"text-left"}
                        value={category}
                        onChange={(e) => updateCategory(e.target.value)}
                    >
                        {
                            categoryList.map(v => (
                                <MenuItem value={v} key={Math.random()}>{v}</MenuItem>
                            ))
                        }
                        <MenuItem value={'all'} key={Math.random()}>All categories</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={"posts__search-filter text-left"}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={sortByAsc}
                            name="checkedB"
                            color="primary"
                            onChange={() => {
                                updateSortByAsc(true);
                                showSnackbar(true)
                            }}
                        />
                    }
                    label="Sort posts by date (ascending)"
                />
            </div>
            <div className={"posts__search-filter text-left"}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={!sortByAsc}
                            name="checkedB"
                            color="primary"
                            onChange={() => {
                                updateSortByAsc(false)
                                showSnackbar(true)
                            }}
                        />
                    }
                    label="Sort posts by date (descending)"
                />
            </div>

            <div className={"posts__search-btn center"} onClick={submit}>
                <ButtonComponent title={"Apply filters"}/>
            </div>
        </div>
    )
}

export default  SearchBarContentComponent;