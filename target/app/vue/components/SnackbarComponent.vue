<template>
  <v-snackbar
      v-model="showSnackbar"
  >
    <span class="txt-light">{{ message }}</span>

    <template v-slot:action="{ attrs }">
      <v-btn
          text
          v-bind="attrs"
          @click="showSnackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackbarComponent",
  props:{
    showSnackbar:{
      type: Boolean,
      default: false
    },
    message:{
      type: String,
      default: ""
    }
  }
}
</script>

<style scoped>

</style>