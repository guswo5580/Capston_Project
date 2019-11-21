<template>
  <div id="app">
    <div class="leftBox">
      <near-map></near-map>
      <!-- <line-chart></line-chart> -->
    </div>
    <div class="rightBox">
      <near-menu></near-menu>
      <router-view></router-view>
    </div>

    <!-- <near-status></near-status> -->
  </div>
</template>

<script>
/* eslint-disable */
import NearMenu from "./components/NearMenu.vue";
import NearMap from "./components/NearMap.vue";

export default {
  components: {
    NearMenu,
    NearMap
  }
};
</script>

<style>
@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);

.leftBox {
  float: left;
  width: 78%;
  /* max-width: 100%;
  height: auto; */
  box-sizing: border-box;
}
.rightBox {
  float: right;
  width: 22%;
  /* max-width: 100%;
  height: auto; */
  box-sizing: border-box;
}
</style>
