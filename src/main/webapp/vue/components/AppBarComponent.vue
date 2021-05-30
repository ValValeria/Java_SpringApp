<template>
    <v-app-bar
      color="#fcfcfc"
      dense
      dark
      class="nav shadow w-100"
      app
  >
    <div class="wrap center justify-content-between">
      <div class="nav__brand" @click="navigateToHome">
        <div class="h3">
          <span>Web</span>Design
        </div>
      </div>

      <div class="nav__actions center">
        <v-btn
            class="mx-2"
            fab
            dark
            color="#212121"
            outlined
            @click="menuClick"
        >
          <v-icon dark>
            mdi-format-list-bulleted-square
          </v-icon>
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>


<script>
import {menuClick$} from "../rxjs";

export default{
   methods:{
      menuClick(){
        menuClick$.next(true);
      },
      navigateToHome(){
        this.$router.push({name:"home"});
      }
   }
 }
</script>

<style lang="scss">
@import '../styles/variables';

.nav__brand span{
  padding-right: $margin-sm/3;
  font-weight:600;
}

.v-toolbar__content, header{
  height: auto !important;
}

.v-toolbar__content{
  padding: $margin-sm/2 !important;
}

.nav__brand{
  flex: 1 1 70%;

  .h3{
    cursor: pointer;
  }
}

.v-main{
  padding-top:76px !important;
}
</style>