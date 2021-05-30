<template>
  <div class="w-100">
     <AddPostPage :is-update-page="true"/>
  </div>
</template>

<script>
import {isObjectEmpty} from "../functions";
import AddPostPage from './AddPostPage';
import {updatePost$} from "../router";

export default {
  data: function(){
    return {
    }
  },
  components:{
    AddPostPage
  },
  beforeRouteLeave(to, from, next){
    this.$store.commit("updatePost",{});
    next();
  },
  beforeRouteUpdate(to, from, next){
    this.beforeRouteLeave(...arguments);
  },
  beforeRouteEnter(to, from, next){
    next(async (vm)=>{
      try{
        const response = await fetch(`/api/blog/post/${vm.id}`);

        if(response.ok){
          const json = await response.json();
          const data = json.data;

          if(!Object.keys(data).length){
            throw new Error();
          } else {
            vm.$store.commit("updatePost",data);
            updatePost$.next();
          }

          return true;
        } else {
          throw new Error();
        }
      } catch (e) {
        console.error(e)
        return {name: "home"};
      }
    });
  },
  computed:{
    id:{
      get(){
        return this.$route.params.id;
      }
    }
  }
}
</script>

<style scoped>

</style>