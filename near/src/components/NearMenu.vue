<template>
  <div>
    <div>
      <NearHeader></NearHeader>
    </div>
    <div>
      <NearSecondHeader></NearSecondHeader>
    </div>
    <div>
      <NearStatus></NearStatus>
    </div>
    <div style="padding-left: 5px">
      <b-nav>
        <b-nav-item @click="changeToggle(title)">
          <router-link to="/popup">{{this.title[0].label}}</router-link>
        </b-nav-item>
        <b-nav-item @click="changeToggle(title)">
          <router-link to="/missionComplete">{{this.title[1].label}}</router-link>
        </b-nav-item>
      </b-nav>
    </div>
  </div>
</template>

<script>
import NearHeader from "./common/NearHeader";
import NearStatus from "./common/NearStatus";
import NearSecondHeader from "./common/NearSecondHeader";

export default {
  data() {
    return {
      title: [
        { label: "알림", clicked: false },
        { label: "사건완료", clicked: false }
      ],

      checked: false
    };
  },
  methods: {
    changeToggle() {
      this.title.clicked = !this.title.clicked;
    }
  },
  components: {
    NearHeader,
    NearStatus,
    NearSecondHeader
  }
};
</script>

<style scoped>
a {
  color: #d0d0d0;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
a:focus {
  color: black;
  border-bottom: 2px solid;
}
/* .changeLine {
  color: black;
  text-decoration: underline;
  text-underline-position: under;
  border-bottom: solid;
} */
</style>