<template>
  <div class="navigation w-100">
    <div class="navigation__container  center flex-column  w-100">
      <div class="navigation__brand text-center w-100" hidden>
        <v-card flat>
          <div class="h3">
            <span>Web</span>Design
          </div>
          <div class="h5">
            Admin Panel
          </div>
        </v-card>
      </div>
      <div class="navigation__menu w-100 text-left">
        <MenuComponent/>
      </div>
    </div>
  </div>
</template>

<script>
import MenuComponent from "./MenuComponent";

export default{
  components:{
    MenuComponent
  }
}
</script>

<style scoped lang="scss">
@import '../styles/_variables';

.navigation{
  height:100%;
  padding: $margin-sm*3 0;
}

.navigation__container{
  max-height:600px;
  height:100%;
}
</style>