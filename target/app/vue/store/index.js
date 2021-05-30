import Vue from 'vue';
import Vuex from 'vuex';
import {makeHttpRequest} from "../../react/api";
import {Subject} from "rxjs";

Vue.use(Vuex);

export const changePage$ = new Subject();

export const store = new Vuex.Store({
  state:{
      posts:[ ],
      letters:[],
      lettersPage: 1,
      postsPage: 1,
      numPostsPages: 1,
      perPage: 6,
      user:{
          username: null,
          email: null,
          id: null,
          password: null,
          isAuthenticated: false
      },
      updatedPost:{
          post: {}
      }
  },
  mutations:{
      updatePost(state, post){
          state.updatedPost.post = post;
      },
      setUser(state,{username, email, id , password}){
          state.user.username = username;
          state.user.email = email;
          state.user.id = id;
          state.user.password = password;
          state.user.isAuthenticated = true;
      },
      addLetters(state, items = []){
          state.letters = state.letters.concat(items);
      },
      changePostsPage(state, pageIndex){
          state.postsPage = pageIndex;
      },
      addPostsWithConfig(state, {numPostsPages, posts}){
          state.posts = posts;
          state.numPostsPages = numPostsPages;
      }
  },
  getters:{
      getLetter:state=>id=>{
          return state.letters.find(v=>v.id===id);
      }
  },
  actions:{
      async viewLetters({commit,state}){
          const response = await makeHttpRequest("/api/letters/?page="+state.lettersPage,{
              headers:{
                  Auth: localStorage.getItem("user")
              }
          });
          const data = response.response.responseData || {};

          if(data.data){
              commit("addLetters", data.data);
          }
      },
      async viewLetter({commit, state, getters},id){
          const letter = getters.getLetter(id);

          if(!letter){
              const response = await makeHttpRequest("/api/letter/"+id,{
                  headers:{
                      Auth: localStorage.getItem("user")
                  }
              });
              const data = response.response.responseData || {};

              if(data.data){
                  commit("addLetters", [data.data]);
              }
          }
      }
  }
});

