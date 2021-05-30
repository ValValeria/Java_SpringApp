<template>
  <div class="letters">
    <BasicLayout title="Letters" css_class="letters__layout">
      <template #items>
          <div class="letters__info mb">
            <v-alert
                prominent
                color="#212121"
                type="info"
            >
              <v-row align="center">
                <v-col class="grow">
                  <div class="h6 txt-light">Dear admin, here you view and delete letters. In addition, you have an opportunity to update letters</div>
                </v-col>
              </v-row>
            </v-alert>
          </div>
          <div class="letters__calendar mb">
            <v-expansion-panels>
              <v-expansion-panel class="shadow">
                <v-expansion-panel-header>
                  <div class="h6">Calendar</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
         <div class="letters__list mt" v-if="isLoaded && letters.length">
              <LetterComponent v-for="letter in letters" :letter="letter" :key="Math.random()" class="mb w-100"/>
          </div>
          <div class="letters__empty w-100 mt" v-if="!isLoaded && !letters.length">
              <LoadingProgressComponent/>
          </div>
          <div class="letters__loader mt w-100" v-if="isLoaded && !letters.length">
              <NoResultsComponent/>
          </div>
      </template>
    </BasicLayout>
  </div>
</template>

<script>
import BasicLayout from '../layouts/BasicLayout';
import {mapState} from 'vuex';
import LetterComponent from "../components/LetterComponent";
import LoadingProgressComponent from "../components/LoadingProgressComponent";
import NoResultsComponent from "../components/NoResultsComponent";

export default{
  components:{
    NoResultsComponent,
    LoadingProgressComponent,
    LetterComponent,
    BasicLayout
  },
  data:function(){
    return {
      isLoaded: false
    }
  },
  computed:{
    ...mapState({
       letters: state => state.letters
    })
  },
  mounted(){
     this.$store.dispatch("viewLetters").
         then(v=>this.$data.isLoaded = true);
  }
}
</script>