<template>
  <div>
    <button v-if="isPolice" :style="policeButton" @click="policeButtonClick()">{{pMessage}}</button>
    <button v-else-if="isWaiting" :style="policeButton" @click="policeButtonClick()">{{message}}</button>

    <button v-else-if="isVictim" :style="victimButton" @click="victimButtonClick()">{{vMessage}}</button>
    <button
      v-else-if="isCallVictim"
      :style="victimButton"
      @click="victimButtonClick()"
    >{{vvMessage}}</button>
  </div>
</template>

<script>
import { EventBus } from "../../event/eventBus";

export default {
  data() {
    return {
      vMessage: "출동 배정",
      pMessage: "출동 대기중",
      message: "출동 배정",
      vvMessage: "신고 접수",
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
      isCallVictim: false,
      isPolice: false,
      isWaiting: false,
      isDone: false,
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
      redCall: "red.ico",
      whiteCall: "white.png",
      yellowCall: "yellow.ico",
      blueCall: "blue.ico",
      purpleCall: "purple.ico",
      policeBackCALLID: "",
      victimBackCALLID: "",
      purpleCall: "purple.ico",
      waitingCall: 1,
      blueCall: "blue.ico",
      victimCallName: "",
      isAccept: false
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
      } else {
        this.isVictim = true;
        this.isWaiting = false;
        this.isPolice = false;
        this.victimCallName = position.name;
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
    EventBus.$on("FinishJob", () => {
      this.vvMessage = "출동 배정";
      this.vMessage = "출동 배정";
      this.pMessage = "출동 대기중";
      this.isCallVictim = false;
      this.isVictim = true;
    });
  },
  methods: {
    policeButtonClick() {
      if (this.markers.report === false && this.isPolice === true) {
        this.markers.report = !this.markers.report;
        //팝업에 보라색 나타내기
        EventBus.$emit("buttonPurple", this.markers, this.victimCallName);
        console.log("과연 누구인가?", this.victimCallName);
        //아이콘 보라색 바꾸기
        EventBus.$emit("changePurple", this.purpleCall, this.markers.id);
        //secondHeader에 출동배정 숫자올리기
        EventBus.$emit("askingPolice", this.waitingCall);
        this.isWaiting = true;
        this.isPolice = false;
        this.message = " 확인 중";
        this.policeBackCALLID = this.markers.id;
      } else if (this.markers.report === true && this.isWaiting === true) {
        // 나중에 서버에서 확인 받는건 NearMap.vue에 경찰 마커 객체에 acceptCall이 true일때 다음 진행하도록 만들자
        // 서버에서 특정값 true값 나오면 뜨게끔 나중에 바꿔야함
        this.isWaiting = false;
        this.isPolice = true;
        this.pMessage = "출동 중";
        EventBus.$emit("policeCall", this.policeCall);
        let index = this.markers.id;
        EventBus.$emit("changeBlue", this.blueCall, index);
        EventBus.$emit("policeDONE", this.markers, index);
        EventBus.$emit(
          "JOBSDONE",
          this.policeBackCALLID,
          this.victimBackCALLID
        );
        EventBus.$emit("getPosition2", this.markers);
        this.isDone = true;
      } else if (this.markers.report === true && this.isDone === true) {
        this.isDone = false;
        this.isPolice = true;
        this.markers.report = !this.markers.report;
        // this.message = "출동 대기중 ";
        EventBus.$emit("policeCall", this.policeBackCall);
        let index = this.markers.id;
      }
    },

    victimButtonClick() {
      if (this.markers.report === false && this.isVictim === true) {
        this.markers.report = !this.markers.report;
        this.victimBackCALLID = this.markers.id;
        this.vMessage = "신고 접수";
        let index = this.markers.id;
        EventBus.$emit("victimCall", this.victimCall, index);
        EventBus.$emit("redImage", this.redCall, index);
        EventBus.$emit("getPosition2", this.markers);
        EventBus.$emit("victimDONE", this.markers, index);
      } else if (this.markers.report === true && this.isCallVictim === true) {
        this.vvMessage = "출동 배정 ";
        let index = this.markers.id;
        EventBus.$emit("victimCall", this.victimBackCall, index);
        EventBus.$emit("yellowImage", this.yellowCall, index);
        EventBus.$emit("getPosition2", this.markers);
      }
    }
  }
};
</script>

<style scoped>
</style>