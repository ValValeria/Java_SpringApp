<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
          class="mx-auto shadow w-100"
          outlined
      >
        <v-img :src="image"></v-img>

        <v-card-text>
          <div class="title primary--text h4">
            {{title}}
          </div>
          <div class="h5">
            {{description}}
          </div>
        </v-card-text>

        <v-fade-transition>
          <v-overlay
              v-if="hover"
              absolute
              color="#424242"
          >
            <ButtonComponent txt="See more info" color="dark" @click="navigate(id)"/>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>


<script>
import ButtonComponent from "../components/ButtonComponent";

export default {
  data: () => ({
    overlay: false,
  }),
  props:["image","id","title","description"],
  components:{
    ButtonComponent
  },
  methods:{
    navigate(id){
      this.$router.push({name:"post",params:{id}});
    }
  }
}
</script>