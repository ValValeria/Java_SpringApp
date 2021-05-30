import React, {useEffect} from 'react';
import './SearchPage.scss';
import {useHistory, useParams} from "react-router";
import {useDispatch, connect} from "react-redux";
import {formUrlParamsString, makeHttpRequest} from "../../api";
import {addSearchPosts} from "../../store";
import PostsCardComponent from "../../components/PostCardComponent/PostCardComponent";
import NotFoundComponent from "../../components/NotFoundComponent/NotFoundComponent.scss";
import ErrorLoadingComponent from "../../components/ErrorLoadingComponent/ErrorLoadingComponent";
import LoadingProgressComponent from "../../components/LoadingProgressComponent/LoadingProgressComponent";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import {Pagination} from "@material-ui/lab";
import GridAutoLayout from "../../layouts/GridAutoLayout/GridAutoLayout";


const mapStateToProps = ({data})=>{
    let result = {data: {}};
    const page =  data.pages?.searchPage;

    if(typeof page === "object"){
        result.data = {
            page: page.page || 1,
            per_page: page.per_page,
            isLoading: page.isLoading,
            noPosts: page.noPosts,
            isError: page.isError,
            num_pages: page.numPages,
            active_posts: page.filteredPosts,
        };
    }

    return result;
};


function SearchPage(props){
    const data = props.data;
    const {word} = useParams();
    const history = useHistory();
    const [isLoading, updateLoadingState] = React.useState(true);
    const dispatch = useDispatch();

    const click = async (num) => {
        if(!data) return false;

        const url = formUrlParamsString("/api/search", {page: data.page, search: word, per_page: data.per_page});
        const response = await makeHttpRequest(url);
        const result = response.response.responseData?.data;
        const results = result?.results;

        if(results && Array.isArray(results)){
            const obj = {data: results, page: num, perPage: data.per_page, numPages: result.totalPages};
            dispatch(addSearchPosts(obj))
            props.add(obj);
        }

        return true;
    };

    useEffect(()=>{
        (async()=>{
            if(word.length<20 && word.length>2){
                await click(1).catch(e=>console.error(e)).finally(()=>updateLoadingState(false));
            } else{
                history.push("/posts");
            }
        })();
    },[word]);

    let Element = () => null;

    if(data?.active_posts?.length && !data.noPosts){
        Element = ()=>(
            <div className={"search__list w-100"}>
                <GridAutoLayout min={"200px"} max={"350px"}>
                    {
                        data.active_posts.map(v => {
                            return (
                                <div className={"posts__item"} key={Math.random()}>
                                    <PostsCardComponent {...v} href={"/post/" + v.id} showRating={false}/>
                                </div>
                            )})
                    }
                </GridAutoLayout>
            </div>
        );
    } else if(data?.noPosts) {
        Element = () => (
            <div className={"posts__404 w-100"}>
                <NotFoundComponent/>
            </div>
        )
    } else if(data?.isError){
        Element = ()=>(
            <div className={"posts__error"}>
                <ErrorLoadingComponent/>
            </div>
        )
    }

    if(isLoading){
        Element = ()=>(
            <div className={"posts__loading w-100"}>
                <LoadingProgressComponent/>
            </div>
        );
    }

    return (
        <div className={"w-100 search"} page={"search"}>
            <BasicLayout title={"Search results"} css_class={"posts"}>
                <React.Fragment>
                    <div className={"search__content w-100"}>
                        <div className={"search__container w-100 center"}>
                            <Element/>
                        </div>
                        {
                            data.num_pages >  1 &&
                            (<div className={"search__pagination  w-100 mt"}>
                                <Pagination count={data.num_pages} size="large"
                                            onChange={(_event, page) => click(page)}/>
                            </div>)
                        }
                    </div>
                </React.Fragment>
            </BasicLayout>
        </div>
    );
}

export default connect(mapStateToProps)(SearchPage)