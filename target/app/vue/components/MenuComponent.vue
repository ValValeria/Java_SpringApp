<template>
  <v-card
      class="mx-auto"
      max-width="300"
      flat
  >
    <v-card-text>
      <div class="avatar">
        <div class="avatar__icon center w-100 mb">
          <v-btn
              class="avatar__btn mx-2"
              fab
              dark
              x-large
              color="#212121"
          >
            <v-icon dark>
              mdi-android
            </v-icon>
          </v-btn>
        </div>
        <div class="avatar__txt h4 text-center txt-bold">
          Admin
        </div>
      </div>
    </v-card-text>
    <v-list shaped>
      <v-subheader>MENU</v-subheader>
      <v-list-item-group
          color="#212121"
      >
        <v-list-item
            v-for="(link) in links"
            v-on:click="click(link[1])"
            :key="link[0]"
        >
          <v-list-item-content>
            <v-list-item-title v-text="link[0]"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data:function(){
    return {
      links:[["Home","home"],
             ["Add a post","add-post"],
             ['View posts',"posts"],
             ['View letters',"letters"]]
    }
  },
  methods:{
    click(link){
      this.$router.push({name:link});
    }
  }
}
</script>

<style scoped lang="scss">
.avatar__btn{
  height: 130px !important;
  width: 130px !important;
}
</style>