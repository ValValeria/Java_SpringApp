<template>
   <div class="post-page">
     <v-snackbar
         v-model="showSnackbar"
     >
       <span class="txt-light">{{ message }}</span>

       <template v-slot:action="{ attrs }">
         <v-btn
             text
             v-bind="attrs"
             @click="showSnackbar = false"
         >
           Close
         </v-btn>
       </template>
     </v-snackbar>
     <BasicLayout :title="post.title" v-if="Object.values(post).length">
        <template #items>
          <div class="post__actions w-100 d-flex justify-content-end mb">
            <ButtonComponent txt="Delete" v-on:click="deleteAction()" class="mr"/>
            <ButtonComponent txt="Update" v-on:click="updateAction()"/>
          </div>
          <div class="post__image mb">
            <v-img
                max-width="500"
                max-height="300"
                width="100%"
                :src="post.image"
            >
              <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                >
                  <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </div>
          <div class="post__description mb">
            <v-card outlined class="shadow">
              <v-card-text>
                <div class="w-100 text-center h4 font-weight-500">
                  The description of the post
                </div>
              </v-card-text>
              <v-card-text>
                <div class="h5 text-left">
                  {{post.description}}
                </div>
              </v-card-text>
            </v-card>
          </div>
          <div class="post__main-content">
            <div class="post-content w-100" ref="content"></div>
          </div>
        </template>
     </BasicLayout>
     <BasicLayout :title="'Loading'" v-else>
       <template #items>
           <LoadingComponent/>
       </template>
     </BasicLayout>
   </div>
</template>

<script>
import BasicLayout from "../layouts/BasicLayout";
import {formBlog, formSearchParams, isObjectEmpty} from "../functions";
import LoadingComponent from "../components/LoadingComponent";
import ButtonComponent from "../components/ButtonComponent";

export default{
  data(){
    const id = this.$route.params.id;

    return {
      id,
      content: null,
      message: null,
      showSnackbar: false,
      post: {}
    }
  },
  components:{
    ButtonComponent,
    BasicLayout,
    LoadingComponent
  },
  async mounted(){
    const response = await fetch(`/api/blog/post/${this.id}`);

    if (response.ok) {
      const json = await response.json();
      const result = json.data || {} ;

      if(Object.entries(result).length){
        this.post = result;
        let postContent = formBlog(this.post.content, []);

        setTimeout(()=>{
          const content = document.createElement("div");

          content.className = "w-100";
          content.append(...postContent);

          this.$refs.content.append(content);
        }, 0);
      }
    } else {
      this.message = "Some errors have happened. Please, try later again";
      this.showSnackbar = true;
    }

    return this.post;
  },
  methods:{
    isObjectEmpty,
    async deleteAction(){
       const response = await fetch("/api/blog/delete/"+this.post.id,{
          headers:{
            Auth: localStorage.getItem("user")
          }
       });

       if(response.ok){
         this.showSnackbar = true;
         this.message = "The post has been deleted";

         setTimeout(()=>{
           this.$router.push({name: "home"});
         },2000);
       } else{
         this.showSnackbar = true;
         this.message = "Invalid request";
       }
    },
    async updateAction(){
      await this.$router.push({name: "update-post", id: this.post.id});
    }
  },
  async beforeRouteUpdate(to, from , next){
    await this.mounted();
    next();
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.post__main-content{
  margin-top: $margin-sm*3 !important;
}
</style>