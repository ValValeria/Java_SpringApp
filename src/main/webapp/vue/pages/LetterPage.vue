<template>
   <div class="letter-page">
     <BasicLayout title="Letter">
       <template #items>
         <div class="letter-page__content">
           <v-alert
               border="top"
               colored-border
               color="#ffde30"
               class="shadow"
           >
             <v-list>
               <v-list-item>
                 <v-list-item-content>
                   <v-list-item-title>
                      Username
                   </v-list-item-title>
                   <v-list-item-subtitle v-html="letter.username"></v-list-item-subtitle>
                 </v-list-item-content>
               </v-list-item>

               <v-divider></v-divider>

               <v-list-item>
                 <v-list-item-content>
                   <v-list-item-title>
                     Email
                   </v-list-item-title>
                   <v-list-item-subtitle v-html="letter.email"></v-list-item-subtitle>
                 </v-list-item-content>
               </v-list-item>

               <v-divider></v-divider>

               <v-list-item>
                 <v-list-item-content>
                   <v-list-item-title>
                     Date
                   </v-list-item-title>
                   <v-list-item-subtitle v-html="letter.date"></v-list-item-subtitle>
                 </v-list-item-content>
               </v-list-item>

               <v-divider></v-divider>

               <v-list-item>
                 <v-list-item-content>
                   {{letter.message}}
                 </v-list-item-content>
               </v-list-item>
             </v-list>
           </v-alert>
         </div>
       </template>
     </BasicLayout>
   </div>
</template>
<script>
import BasicLayout from "../layouts/BasicLayout";
import {mapGetters} from 'vuex';

export default{
  components: {BasicLayout},
  computed:{
    ...mapGetters(['getLetter']),
    letter(){
      return this.getLetter(this.$route.params.id) || {};
    }
  },
  mounted() {
    this.$store.dispatch("viewLetter",this.$route.params.id);
  }
}
</script>