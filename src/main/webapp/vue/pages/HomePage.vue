<template>
  <BasicLayout title="Home" css__class="home">
    <template #items>
      <div class="home w-100">
        <div class="home__chart w-100 ">
          <HomeSparkLine class="w-100"/>
        </div>
        <div class="home__cards mt">
          <GridLayout>
            <v-card class="shadow" outlined>
              <v-card-title>457</v-card-title>
              <v-card-subtitle>Members online</v-card-subtitle>
            </v-card>
            <v-card class="shadow" outlined>
              <v-card-title>56</v-card-title>
              <v-card-subtitle>Published posts</v-card-subtitle>
            </v-card>
            <v-card class="shadow" outlined>
              <v-card-title>67</v-card-title>
              <v-card-subtitle>Registered users</v-card-subtitle>
            </v-card>
          </GridLayout>
        </div>
      </div>
    </template>
  </BasicLayout>
</template>

<script>
import HomeSparkLine from "../components/HomeSparkLine";
import GridLayout from "../layouts/GridLayout";
import BasicLayout from "../layouts/BasicLayout";
export default{
  components: {BasicLayout, GridLayout, HomeSparkLine}
}
</script>

<style scoped lang="scss">
@import '../styles/variables';
</style>