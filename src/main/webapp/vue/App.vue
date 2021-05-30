<template>
  <v-app>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        class="center">
         <NavigationComponent/>
    </v-navigation-drawer>

    <AppBarComponent/>

    <v-main class="bg-light">
      <v-container fluid>
          <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBarComponent from "./components/AppBarComponent.vue";
import NavigationComponent from "./components/NavigationComponent";
import {menuClick$} from "./rxjs";

export default{
   data: function(){
     return {
       drawer: false
     }
   },
   components:{
     AppBarComponent,
     NavigationComponent
   },
   mounted(){
     menuClick$.subscribe(v => {
        this.$data.drawer = !this.drawer;
     });
   }
}
</script>

<style lang="scss">
@import './styles/style';

nav{
  z-index: 91111111111 !important;
}
</style>