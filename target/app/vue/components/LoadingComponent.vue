<template>
  <div class="loading w-100">
    <div class="loading__wrap w-100">
      <div class="loading__content w-100">
        <div class="loading__item w-100 center">
          <v-progress-circular
              indeterminate
              color="amber"
              :size="150"
          ></v-progress-circular>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingComponent"
}
</script>

<style scoped>

</style>