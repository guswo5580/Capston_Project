<template>
  <div>
    <!-- <b-button v-b-modal.modal-center>Launch centered modal</b-button>
    <b-modal id="modal-center" centered title="BootstrapVue">
      <p class="my-4">Vertically centered modal!</p>
    </b-modal>-->
    <button
      v-if="isPolice"
      :style="policeButton"
      @click="policeButtonClick(this.markers)"
    >{{message}}</button>
    <button
      v-if="isVictim"
      :style="victimButton"
      @click="victimButtonClick(this.markers)"
    >{{message}}</button>
    <!-- <button v-if="backPolice" :style="policeButton" @click="buttonChecked()">{{policeMessage}}</button>
    <button v-if="backVictim" :style="victimButton" @click="buttonChecked()">{{victimMessage}}</button>-->
  </div>
</template>

<script>
import { EventBus } from "../../event/eventBus";

export default {
  props: [markers],
  data() {
    return {
      message: "출동 배정",
      policeMessage: "출동 대기중",
      victimMessage: "출동 배정",
      backPolice: false,
      backVictim: false,
      buttonClicked: false,
      markers: [],
      victimCall: 1,
      victimBackCall: -1,
      policeCall: 1,
      policeBackCall: -1,
      waitingCall: 1,
      isVictim: false,
      isPolice: false,
      isWaiting: false,
      isFinished: 1,
      victimButton: {
        width: "100%",
        height: "40px",
        marginTop: "20px",
        backgroundColor: "#E60012",
        color: "white",
        border: 0,
        outline: 0,
        fontSize: "17px"
      },
      policeButton: {
        width: "100%",
        height: "40px",
        backgroundColor: "#036EB8",
        color: "white",
        padding: 0,
        margin: 30,
        border: 0,
        outline: 0,
        fontSize: "17px"
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
      purpleCall: "purple.ico",
      policeBackCALLID: "",
      victimBackCALLID: ""
    };
  },
  created() {
    EventBus.$on("getPosition", (position, countCall, index) => {
      this.markers = position;
      console.log(this.markers.identity);
      this.victimCall = countCall;
      if (this.markers.identity === "police") {
        this.isPolice = true;
        this.isWaiting = false;
        this.isVictim = false;
        EventBus.$emit("buttonPurple", position);
      } else {
        this.isVictim = true;
        this.isWaiting = false;
        this.isPolice = false;
      }
      // Police 출동 여부 및 출동배정
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
    policeButtonClick() {
      if (this.markers.report === false && this.markers.identity === "police") {
        this.markers.report = !this.markers.report;
        this.policeBackCALLID = this.markers.id;
        this.message = "출동 중";
        EventBus.$emit("policeCall", this.policeCall);
        let index = this.markers.id;
        EventBus.$emit("blueImage", this.blueCall, index);
        // EventBus.$emit("policeDONE", this.markers, index);
        console.log(
          "PoliceBackCALLID! and VictimBackCALLID",
          policeBackCALLID,
          victimBackCALLID
        );
        if (this.policeBackCALLID !== NULL && this.victimBackCALLID !== NULL) {
          EventBus.$emit(
            "JobsDone",
            this.policeBackCALLID,
            this.victimBackCALLID
          );
        }
        EventBus.$emit("getPosition2", this.markers);
      } else if (
        this.markers.report === true &&
        this.markers.identity === "police"
      ) {
        this.markers.report = !this.markers.report;
        this.message = "출동 대기중 ";
        EventBus.$emit("policeCall", this.policeBackCall);
        let index = this.markers.id;
        EventBus.$emit("whiteImage", this.whiteCall, index);
        EventBus.$emit("getPosition2", this.markers);
      }
    },

    victimButtonClick() {
      if (this.markers.report === false && this.markers.identity === "victim") {
        this.markers.report = !this.markers.report;
        this.message = "신고 접수 ";
        this.victimBackCALLID = this.markers.id;
        let index = this.markers.id;
        EventBus.$emit("victimCall", this.victimCall, index);
        EventBus.$emit("redImage", this.redCall, index);
        EventBus.$emit("getPosition2", this.markers);
        // EventBus.$emit("victimDONE", this.markers, index);
      } else if (
        this.markers.report === true &&
        this.markers.identity === "victim"
      ) {
        this.markers.report = !this.markers.report;
        this.message = "출동 배정 ";
        let index = this.markers.id;
        EventBus.$emit("victimCall", this.victimBackCall, index);
        EventBus.$emit("yellowImage", this.yellowCall, index);
        EventBus.$emit("getPosition2", this.markers);
      }
    }

    //       if (this.markers.report === false && this.markers.identity === "police") {
    //         this.markers.report = !this.markers.report;
    //         this.message = "출동 배정";
    //         EventBus.$emit("policeCall", this.policeCall);
    //         let index = this.markers.id;
    //         EventBus.$emit("blueImage", this.blueCall, index);
    //         //경찰 임무 완수시 사건완료 알림
    //         EventBus.$emit("JobsDone");
    //       } else if (
    //         this.markers.report === true &&
    //         this.markers.identity === "police"
    //       ) {
    //         this.markers.report = !this.markers.report;
    //         this.message = "출동 대기중 ";
    //         EventBus.$emit("policeCall", this.policeBackCall);
    //         let index = this.markers.id;
    //         EventBus.$emit("whiteImage", this.whiteCall, index);
    //       }
    //       if (this.markers.report === false && this.markers.identity === "victim") {
    //         this.markers.report = !this.markers.report;
    //         this.message = "신고 접수 ";
    //         EventBus.$emit("victimCall", this.victimCall);
    //         let index = this.markers.id;
    //         EventBus.$emit("redImage", this.redCall, index);
    //       } else if (
    //         this.markers.report === true &&
    //         this.markers.identity === "victim"
    //       ) {
    //         this.markers.report = !this.markers.report;
    //         this.message = "출동 배정 ";
    //         EventBus.$emit("victimCall", this.victimBackCall);
    //         let index = this.markers.id;
    //         EventBus.$emit("yellowImage", this.yellowCall, index);
    //       }
  }
};
</script>

<style scoped>
</style>