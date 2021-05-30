<template>
   <div :class="css__class+' basic-layout'">
      <div class="basic-layout__wrap wrap">
         <div class="basic-layout__title text-center h3">
           {{title}}
         </div>
         <div class="basic-layout__items">
           <slot name="items"></slot>
         </div>
      </div>
   </div>
</template>

<script>
export default {
  props:{
    css__class:{
      type:String,
      default:""
    },
    title:String
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/variables";

  .basic-layout{
    margin-top:$margin-sm*3;
    margin-bottom: $margin-sm;
    width:100%;
  }

  .basic-layout__items > div{
   margin-bottom: $margin-sm;
  }

  .basic-layout__title{
    margin-bottom: $margin-sm*2;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    position:relative;
  }
</style>
