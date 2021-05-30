<template>
<div class="no-results w-100">
   <div class="no-results__wrap center flex-column text-center mt">
     <div class="h5 txt-bold mt">No results :( Sorry ...</div>
     <v-progress-circular
         :rotate="360"
         :size="100"
         :width="15"
         :value="value"
         color="amber"
         class="mt"
     >
       {{ value }}
     </v-progress-circular>
   </div>
</div>
</template>

<script>
export default {
  name: "NoResultsComponent",
  data () {
    return {
      interval: {},
      value: 0,
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  mounted () {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0)
      }
      this.value += 10
    }, 1000)
  },
}
</script>

<style scoped>
.no-results__wrap{
  min-height:150px;
}
</style>