<template>
   <div class="grid w-100">
     <div class="grid__items" v-bind:style="gridColumn">
       <slot></slot>
     </div>
   </div>
</template>

<script>
 export default{
   props:{
     grid:{
       type: String,
       default(){
         return `repeat(auto-fill, minmax(250px,1fr))`;
       }
     },
     min:{
       type: String,
       default:"250px"
     }
   },
   computed:{
     gridColumn(){
       return `grid-template-columns:${this.grid}`
     }
   },
 }
</script>

<style lang="scss" scoped>
  @import '../styles/variables';

  .grid__items{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
    grid-auto-rows: auto;
    grid-gap:$margin-sm;
    width:100%;
  }
</style>