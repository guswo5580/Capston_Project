<template>
  <div>
    <!-- <b-button v-b-modal.modal-center>Launch centered modal</b-button>
    <b-modal id="modal-center" centered title="BootstrapVue">
      <p class="my-4">Vertically centered modal!</p>
    </b-modal>-->
    <button v-if="isPolice" :style="policeButton" @click="buttonChecked()">{{message}}</button>
    <button v-if="isVictim" :style="victimButton" @click="buttonChecked()">{{message}}</button>
  </div>
</template>

<script>
import { EventBus } from "../../event/eventBus";

export default {
  data() {
    return {
      message: "출동 배정",
      buttonClicked: false,
      markers: [],
      victimCall: 1,
      victimBackCall: -1,
      policeCall: 1,
      policeBackCall: -1,
      isVictim: false,
      isPolice: false,
      victimButton: {
        width: "100%",
        height: "20px",
        marginTop: "20px",
        backgroundColor: "#E60012",
        color: "white",
        border: 0,
        outline: 0
      },
      policeButton: {
        width: "100%",
        height: "20px",
        backgroundColor: "#036EB8",
        color: "white",
        border: 0,
        outline: 0
      },
      //   redCall: { url: "red.ico" },
      //  blueCall: { url: "blue.ico" },
      //  purpleCall: { url: "purple.ico" },
      //  whiteCall: { url: "white.png" },
      //   yellowCall: { url: "yellow.ico" },
      redCall: "red.ico",
      whiteCall: "white.png",
      yellowCall: "yellow.ico",
      blueCall: "blue.ico",
      purpleCall: "purple.ico"
    };
  },
  created() {
    EventBus.$on("getPosition", (position, countCall) => {
      this.markers = position;
      this.victimCall = countCall;
      if (this.markers.identity === "police") {
        this.isPolice = true;
        this.isVictim = false;
      } else {
        this.isVictim = true;
        this.isPolice = false;
      }
      if (this.markers.report === false && this.markers.identity === "police") {
        this.message = "출동 대기중";
      } else if (
        this.markers.report === false &&
        this.markers.identity === "victim"
      ) {
        this.message = "출동 배정";
      }
    });
  },
  methods: {
    buttonChecked() {
      if (this.markers.report === false && this.markers.identity === "police") {
        this.markers.report = !this.markers.report;
        this.message = "출동 중";
        EventBus.$emit("policeCall", this.policeCall);
        let index = this.markers.id;
        EventBus.$emit("blueImage", this.blueCall, index);
      } else if (
        this.markers.report === true &&
        this.markers.identity === "police"
      ) {
        this.markers.report = !this.markers.report;
        this.message = "출동 대기중 ";
        EventBus.$emit("policeCall", this.policeBackCall);
        let index = this.markers.id;
        EventBus.$emit("whiteImage", this.whiteCall, index);
      } else if (
        this.markers.report === false &&
        this.markers.identity === "victim"
      ) {
        this.markers.report = !this.markers.report;
        this.message = "신고 접수 ";
        EventBus.$emit("victimCall", this.victimCall);
        let index = this.markers.id;
        EventBus.$emit("redImage", this.redCall, index);
      } else if (
        this.markers.report === true &&
        this.markers.identity === "victim"
      ) {
        this.markers.report = !this.markers.report;
        this.message = "출동 배정 ";
        EventBus.$emit("victimCall", this.victimBackCall);
        let index = this.markers.id;
        EventBus.$emit("yellowImage", this.yellowCall, index);
      }
      EventBus.$emit("getPosition2", this.markers);
    }
  }
};
</script>

<style scoped>
</style>