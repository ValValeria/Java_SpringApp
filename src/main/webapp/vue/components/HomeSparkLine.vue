<template>
  <v-card
      class="mx-auto text-center w-100"
      color="#212121"
      dark
  >
    <SnackbarComponent :show-snackbar="showSnackbar" :message="message"/>

    <v-card-text>
      <v-sheet color="#424242">
        <v-sparkline
            :value="value"
            color="rgba(255, 255, 255, .7)"
            height="100"
            padding="24"
            stroke-linecap="round"
            smooth
        >
          <template v-slot:label="item">
            {{ days[item.index]}}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn
          block
          text
      >
        The activity of users last week
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
import SnackbarComponent from "./SnackbarComponent";

export default {
  data: () => ({
    value: [0, 2, 5, 9, 5, 10, 3],
    showSnackbar: false,
    message: "",
    days:["Monday","Tuesday ","Wednesday","Thursday","Friday","Saturday","Sunday"]
  }),
  components:{
    SnackbarComponent
  },
  async mounted(){
    try{
      const response = await fetch("/api/statistics/",{
        headers:{
          Auth: localStorage.getItem("user")
        }
      });

      if(response.ok){
        const json = await response.json();
        const data = Array.isArray(json.data) ? json.data : [];

        this.value = data.slice(0,7).map(v=>v.visits);
      } else {
        throw new Error("Http Error. Status code is " + response.status);
      }
    } catch (e){
      console.log(e)
      this.showSnackbar = true;
      this.message = "Some errors have occurred during http request, so the data on the chart is invalid";
    }
  }
}
</script>

<style lang="scss">
@import '../styles/_variables.scss';

.home .v-card__text text{
  color:$light-color !important;
}
</style>