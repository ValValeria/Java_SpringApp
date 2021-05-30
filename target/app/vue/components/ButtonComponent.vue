<template>
  <div class="button">
      <div class="button__container">
        <button @click="$emit('click',$event)" v-ripple :class="'button-'+color">
          <span class="h6">{{txt}}</span>
        </button>
      </div>
  </div>
</template>

<script>
export default{
  props:{
    txt:{
      type: String
    },
    color:{
      type: String,
      default:()=>"orange",
      validator(value){
        return ["orange","dark"].includes(value);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

button{
  outline: none;
  border-radius: $border-radius;
  background: $orange-color;
  padding: $margin-sm/2 $margin-sm*2;
  width:100%;
  transition: 0.5s background-color ease-in;
  text-align: center;
  border:1px solid $orange-color;

  .h6{
    text-transform: uppercase !important;
    font-weight: 400 !important;
    line-height: 1;
    cursor: pointer;
  }
}

button:hover{
  background-color:transparent;
}

.button-dark{
  background-color: $dark-color;
  border-color: $dark-color;

  span{
    color: $light-color;
  }
}

.button-dark:hover{
  background-color:transparent;

  span{
    color: $dark-color;
  }
}
</style>