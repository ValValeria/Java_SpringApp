<template>
  <div class="letter">
    <v-card class="shadow" outlined>
       <v-card-title>
         <div class="h5 txt-bold">
           {{letter.username}}
         </div>
       </v-card-title>
       <v-card-subtitle>{{date}}</v-card-subtitle>
       <v-card-text>
         <div class="h6">
           {{sliceTextToSize(letter.message)}}
         </div>
       </v-card-text>
       <v-card-text class="w-100 center">
         <ButtonComponent txt="Read" @click="navigate" color="orange" class="letter__btn"/>
       </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {sliceTextToSize} from "../functions/index";
import ButtonComponent from "./ButtonComponent";

export default {
  name: "LetterComponent",
  components: {ButtonComponent},
  props:{
    letter:{
      type: Object
    }
  },
  methods:{
    sliceTextToSize,
    navigate(){
      this.$router.push({params:{id:this.letter.id}, name:"letter"})
    }
  },
  computed:{
    date(){
      const dateObj = new Date(this.letter.date);
      const month = dateObj.getUTCMonth() + 1; //months from 1-12
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();
      const result = [month > 9 ? month : '0'+month,
                      day > 9 ? day : '0'+day, year].join("-");

      return result;
    }
  }
}
</script>

<style scoped>
 .letter__btn{
   max-width:250px;
 }
</style>