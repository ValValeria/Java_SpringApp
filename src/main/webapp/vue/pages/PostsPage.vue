<template>
  <div class="posts w-100">
    <v-snackbar
        v-model="showSnackbar"
    >
      <span class="txt-light">
         {{ message }}
      </span>

      <template v-slot:action="{ attrs }">
        <v-btn
            color="#fcfcfc"
            text
            v-bind="attrs"
            @click="showSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

     <BasicLayout
         title="Latest Posts"
     >
       <template #items>
         <div class="posts__items w-100">
           <div class="posts__search mb">
              <div class="posts__search-form">
                <v-card class="w-100 card shadow" outlined>
                  <v-card-text class="w-100">
                       <GridLayout grid="80% auto">
                         <v-text-field
                             label="Search"
                             class="mt-0 pt-0"
                             hide-details="auto"
                             color="#212121"
                             v-model="searchWord"
                         ></v-text-field>
                         <ButtonComponent
                             @click="search($event.target.value)"
                             txt="Submit"
                         />
                       </GridLayout>
                  </v-card-text>
                </v-card>
              </div>
           </div>
           <template v-if="!isLoading && posts.length">
             <GridLayout grid="repeat(auto-fill, minmax(350px,1fr))" class="mb">
               <PostComponent
                   v-for="post in posts"
                   :key="Math.random()"
                   :title="post.title"
                   :image="post.image"
                   :id="post.id"
                   :description="post.description"
               />
             </GridLayout>
             <div class="posts__pagination mt" v-if="numPostsPages>1">
               <v-pagination
                   v-model="page"
                   :length="numPostsPages"
                   color="#212121"
               ></v-pagination>
             </div>
           </template>
           <template v-else>
              <NoResultsComponent/>
           </template>
         </div>
       </template>
     </BasicLayout>
  </div>
</template>

<script>
import BasicLayout from "../layouts/BasicLayout";
import GridLayout from "../layouts/GridLayout";
import PostComponent from "../components/PostComponent";
import { mapState } from 'vuex';
import ButtonComponent from "../components/ButtonComponent";
import {formSearchParams} from "../functions";
import {changePage$} from "../store";
import NoResultsComponent from "../components/NoResultsComponent";

export default{
  data: function(){
    return {
      message: "",
      showSnackbar: false,
      isSearch: false,
      isPosts: true,
      searchWord: null,
      isLoading: false
    }
  },
  components:{
    NoResultsComponent,
    ButtonComponent,
    PostComponent,
    BasicLayout,
    GridLayout
  },
  mounted(){
    changePage$.subscribe(async(v) => {
      this.$store.commit("changePostsPage", v);
      this.isLoading = true;

      if(this.isSearch){
        await this.search(this.searchWord);
      } else{
        await this.getNewPosts();
      }

      this.isLoading = false;
    })
  },
  computed:{
    page:{
      get(){
        return this.numPage;
      },
      set(value){
        changePage$.next(value);
      },
    },
    ...mapState({
      posts: state=>state.posts,
      numPostsPages: state=>state.numPostsPages,
      numPage: state=>state.postsPage,
      perPage: state => state.perPage
  })},
  methods: {
    async search() {
      if (this.searchWord.length < 20 && this.searchWord.length > 2) {
        const obj = {
          "search": this.searchWord,
          "per_page": this.perPage,
          "page": this.page
        };
        const url = formSearchParams("/api/search/", obj)
        const response = await fetch(url);

        this.isSearch = true;
        this.isPosts = false;

        if (response.ok) {
          const json = await response.json();
          const numPostsPages = json.data.totalPages || 0;
          const results = json.data.results || {};

          this.$store.commit("addPostsWithConfig", {posts: results, numPostsPages: numPostsPages});
        } else {
          this.message = "Some errors have happened. Please, try later again";
          this.showSnackbar = true;
        }
      } else {
        this.message = "The length of word must be between 2 and 20 characters";
        this.showSnackbar = true;
      }

      return;
    },
    async getNewPosts() {
      const obj = {
        "per_page": this.perPage,
        "page": this.page
      };
      const url = formSearchParams("/api/blog/posts", obj)
      const response = await fetch(url);

      this.isSearch = false;
      this.isPosts = true;

      if (response.ok) {
        const json = await response.json();
        const numPostsPages = json.data.totalPages || 0;
        const results = json.data.results || {};

        this.$store.commit("addPostsWithConfig", {posts: results, numPostsPages: numPostsPages});
      } else {
        this.message = "Some errors have happened. Please, try later again";
        this.showSnackbar = true;
      }

      return;
  }
  },
  beforeRouteLeave(to, from, next){
     this.$store.commit("addPostsWithConfig", {posts: [], numPostsPages: 1});
     this.isLoading = false;
     next();
  },
  beforeRouteEnter(to, from, next){
     next((vm)=>{
        vm.isLoading = true;

        vm.getNewPosts()
            .finally(()=>vm.isLoading=false)
            .catch((v)=>console.error(v));

        return true;
     });
  }
}
</script>

<style lang="scss">
@media(max-width:900px){
  .posts__search-form .v-card__text .grid__items{
    grid-template-columns: 2fr 1fr !important;
  }
}
</style>