<template>
  <div class="load-image">
     <div class="load-image__container" >
        <div class="load-image__img" v-if="src.length">
          <v-img
              max-height="150"
              max-width="250"
              :src="srcImage || src"
          ></v-img>
        </div>
       <div class="load-image__input">
         <v-file-input
             label="Choose only images"
             outlined
             show-size
             accept="image/png, image/jpeg, image/bmp"
             color="#424242"
             dense
             @change="changeImage($event)"
             v-model="file"
         ></v-file-input>
       </div>
     </div>
  </div>
</template>

<script>
export default{
  data:function(){
    return {
      src:"",
      file:null
    }
  },
  props:{
    srcImage:{
      type: String
    }
  },
  methods:{
    changeImage(){
      const fileReader = new FileReader();

      fileReader.readAsDataURL(this.file);

      fileReader.onload = ()=>{
        this.src = fileReader.result;
        this.$emit("change",this.file);
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/variables";

.load-image__input{
  margin-top:$margin-sm;
}
</style>