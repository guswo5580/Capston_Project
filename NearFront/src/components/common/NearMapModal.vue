<template>
  <div>
    <button v-if="isPolice" :style="policeButton" @click="policeButtonClick()">{{ pMessage }}</button>
    <button v-else-if="isWaiting" :style="policeButton" @click="policeButtonClick()">{{ pMessage }}</button>
    <button v-else-if="isBusy" :style="policeBusyButton">{{ pMessage }}</button>
    <button v-else-if="isVictim" :style="victimButton" @click="victimButtonClick()">{{ vMessage }}</button>
  </div>
</template>

<script>
import { EventBus } from "../../event/eventBus";
import NearPopUp from "../../view/NearPopUp";
import NearMissionComplete from "../../view/NearMissionComplete";
import io from "socket.io-client";

// let socket = io();
export default {
  data() {
    return {
      socket: io("http://192.168.35.35:7499"),
      markers: [
        {
          id: 0,
          name: "유승훈(남)",
          age: "27 (931027)",
          bloodType: "O형 (RH+)",
          position: { lat: 37.550378, lng: 127.073192 },
          info: "조선실세 사건 증인 보호 중",
          img: "MrYoo.jpeg",
          report: false,
          identity: "victim",
          icon: { url: "yellow.png" }
        },
        {
          id: 1,
          name: "박원형(남)",
          workArea: "광진 경찰서",
          class: "경위",
          bloodType: "AB형(RH+)",
          position: { lat: 37.545344, lng: 127.07664 },
          img: "Police.png",
          report: false,
          waitingCall: false,
          acceptCall: false,
          finishCall: false,
          identity: "police",
          icon: { url: "white.png" }
        }
      ],

      vMessage: "신고 여부 확인",
      pMessage: "출동 대기중",
      message: "출동 배정",
      policeMessage: "출동 대기중",
      victimMessage: "출동 배정",
      backPolice: false,
      backVictim: false,
      buttonClicked: false,
      victimCall: 1,
      victimBackCall: -1,
      policeCall: 1,
      policeBackCall: -1,
      waitingCall: 1,
      isVictim: false,
      isPolice: false,
      isWaiting: false,
      isBusy: false,
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
      policeBusyButton: {
        width: "100%",
        height: "40px",
        backgroundColor: "gray",
        color: "white",
        padding: 0,
        margin: 30,
        border: 0,
        outline: 0,
        fontSize: "17px"
      },
      redCall: "red.png",
      whiteCall: "white.png",
      yellowCall: "yellow.png",
      blueCall: "blue.png",
      purpleCall: "purple.png",
      policeBackCALLID: "",
      victimBackCALLID: "",
      purpleCall: "purple.png",
      waitingCall: 1,
      blueCall: "blue.png",
      victimCallName: "",
      isAccept: false,
      policeBBB: false
    };
  },
  created() {
    EventBus.$on("getPosition", (position, countCall, index, policeBusy) => {
      this.markers = position;
      console.log(this.markers.identity);
      this.victimCall = countCall;
      if (this.markers.identity === "police") {
        if (policeBusy === true) {
          console.log("경찰이 바쁜상태");
          this.isPolice = false;
          this.isWaiting = false;
          this.isVictim = false;
          this.isBusy = true;
        } else if (policeBusy === false) {
          console.log("경찰이 안바쁜 상태");
          this.isPolice = true;
          this.policeButton.backgroundColor = "#036EB8";
          this.isWaiting = false;
          this.isVictim = false;
          this.isBusy = false;
        }

        // EventBus.$emit("buttonPurple", position);
      } else {
        this.isVictim = true;
        this.isWaiting = false;
        this.isPolice = false;
        this.isBusy = false;
        this.victimCallName = position.name;
      }
      // Police 출동 여부 및 출동배정
      // if (this.markers.report === false && this.markers.identity === "police") {
      //   this.message = "출동 대기중";
      // } else if (
      //   this.markers.report === false &&
      //   this.markers.identity === "victim"
      // ) {
      //   this.message = "신고 여부 확인";
      // }
    });
    //신고 완료 또는 신고 취소시 이벤트 발생
    EventBus.$on("doneCall", data => {
      console.log("doneCall identity", data);
      if (this.policeBBB === false) {
        this.isVictim = true;
        this.isPolice = false;
        this.vMessage = "신고 여부 확인";
        this.pMessage = "출동 대기중";
      } else if (this.policeBBB === true) {
        this.isVictim = false;
        this.isPolice = true;
        this.policeButton.backgroundColor = "#036EB8";
        this.vMessage = "신고 여부 확인";
        this.pMessage = "출동 대기중";
      }
      EventBus.$emit("statusReset");
      // this.markers[0].report = false;
      // this.markers[1].report = false;
    });
    this.socket.on("SEND_POLICE_INFO", police => {
      console.log("SEND_POLICE_INFO 작동해서 내 프런트에서 변화 시작!");
      console.log("경찰 버튼 및 상태 출동중으로 바뀜!");
      let index = police.id;
      this.policeButton.backgroundColor = "#036EB8";
      this.isWaiting = false;
      this.isPolice = true;
      this.isWaiting = false;
      this.isVictim = false;
      this.pMessage = "출동 중";
      EventBus.$emit("policeCall", console.log("status에 파란색 값 증가!"));
      console.log("파란색!! 파란색!!");
      EventBus.$emit("changeBlue", this.blueCall, police.id);
      EventBus.$emit("policeDONE", police, police.id);
      EventBus.$emit("getPosition2", police);
    });
    // 라즈베리파이에서 사용자가 신고접수 할때 버튼이름 신고접수로 바꾸기
    // this.socket.on('레드 버튼 글짜 바꾸기 콜', () => {
    // 	this.vMessage = "신고 접수";
    // });
    EventBus.$on("victimCancelCAll", () => {
      console.log("버튼 색깔 및 표시를 바꿈!");
      this.isPolice = false;
      this.isWaiting = false;
      this.isBusy = false;
      this.isVictim = true;
      this.vMessage = "신고 여부 확인";
      this.pMessage = "출동 대기중";
      this.victimButton.backgroundColor = "#E60012";
      this.policeButton.backgroundColor = "#036EB8";
      this.markers[0].report = false;
      this.markers[1].report = false;
    });
    this.socket.on("CHECK_BUTTON", () => {
      console.log("사용자 버튼 빨간색으로 바뀐뒤! 신고접수 표시!");
      this.victimButton.backgroundColor = "#E60012";
      this.vMessage = "신고 접수";
    });
    EventBus.$on("police_isBusy", () => {
      console.log("바빠요! 버튼바꿔!");
      this.isPolice = false;
      this.isWaiting = false;
      this.isVictim = false;
      this.isBusy = true;
      this.markers[1].report = true;
      this.pMessage = "출동 불가";
    });
    EventBus.$on("police_canWork", () => {
      console.log("다시 일할수 있어요!");
      this.isBusy = false;
      this.isWaiting = false;
      this.isVictim = false;
      this.isPolice = true;
      this.pMessage = "출동 대기중";
      this.markers[1].report = false;
      EventBus.$emit("police_not_busy");
    });
    EventBus.$on("victim_no_button", () => {
      console.log("15초가 지난후에 사용자가 신고취소를 누름!!");
      this.isVictim = true;
      this.isBusy = false;
      this.isWaiting = false;
      this.isPolice = false;
      this.vMessage = "사건여부 확인";
      // this.pMessage = "출동 대기중";
      // this.policeButton.backgroundColor = "#036EB8";
      this.victimButton.backgroundColor = "#E60012";

      // this.markers[0].report = false;
      // console.log("hahaha", this.markers[0].report);
      // this.markers[1].report = false;
      // console.log("hahaha", this.markers[1].report);
    });
  },
  methods: {
    //기본적인 시나리오
    //1.라즈베리파이 소켓통신이 오면 사용자 빨간색변경 및 버튼 '신고접수' 로 변경. 신고접수 알림이 뜸.
    //2. 출동배정 할 경찰 클릭후 출동배정 클릭시 버튼이 확인중으로 바뀌고 사용자 색 보라색으로 변경. 확인중 알림이 뜸.
    //3. 앱으로부터 경찰한테 출동확인을 받으면 경찰 마커색 파란색으로 변경후 버튼 출동중으로 바뀜 출동중 알림이 뜸.
    //4. 앱으로부터 사건완료 소켓통신이 오면 경찰은 '하얀색' 사용자는 '노란색'으로 변경뒤에 사건완료 알림이 뜸. 경찰버튼 '출동 대기중', 사용자버튼 '출동 배정'으로 바뀜
    policeButtonClick() {
      if (this.markers.report === false && this.isPolice === true) {
        this.isWaiting = true;
        this.isPolice = false;
        this.isVictim = false;
        this.isBusy = false;
        this.markers.report = !this.markers.report;
        //팝업에 보라색 나타내기
        EventBus.$emit("buttonPurple", this.markers, this.victimCallName);
        this.policeButton.backgroundColor = "gray";
        //아이콘 보라색 바꾸기
        EventBus.$emit("changePurple", this.purpleCall, this.markers.id);
        //secondHeader에 출동배정 숫자올리기
        EventBus.$emit("askingPolice");
        this.socket.emit("POLICE_CALLNOW", console.log("YES!"));
        this.policeBBB = true;
        this.pMessage = " 확인 중";
        // 확인중 상황일때 버튼 나타내기

        this.policeBackCALLID = this.markers.id;

        // const socket = io('http://192.168.35.68:7499');
      }
      // else if (this.markers.report === true && this.isWaiting === true) {
      // 	// 나중에 서버에서 확인 받는건 NearMap.vue에 경찰 마커 객체에 acceptCall이 true일때 다음 진행하도록 만들자
      // 	// 서버에서 특정값 true값 나오면 뜨게끔 나중에 바꿔야함
      // 	// this.isWaiting = false;
      // 	//출동 중 일때 버튼 나타내기
      // 	// this.isPolice = true;
      // 	this.pMessage = '출동 중';
      // 	//Second Header에 숫자 변경
      // 	EventBus.$emit('policeCall', this.policeCall);
      // 	let index = this.markers.id;
      // 	//경찰 아이콘 블루색 변경
      // 	EventBus.$emit('changeBlue', this.blueCall, index);
      // 	//경찰 출동승인
      // 	EventBus.$emit('policeDONE', this.markers, index);
      // 	//신고완료 되는 이벤트
      // 	EventBus.$emit(
      // 		'JOBSDONE',
      // 		this.policeBackCALLID,
      // 		this.victimBackCALLID
      // 	);
      // 	EventBus.$emit('getPosition2', this.markers);
      // }
    },

    victimButtonClick() {
      if (this.markers.report === false && this.isVictim === true) {
        this.policeBBB = false;
        this.markers.report = !this.markers.report;
        this.victimButton.backgroundColor = "gray";
        this.vMessage = "신고 여부 확인중 ";
        this.victimBackCALLID = this.markers.id;
        let index = this.markers.id;
        EventBus.$emit("victimCall", this.victimCall, index);
        //보호 관찰 숫자 변경
        EventBus.$emit("victimSafeCall");
        EventBus.$emit("redImage", this.redCall, index);
        EventBus.$emit("getPosition2", this.markers);
        EventBus.$emit("victimDONE", this.markers, index);
        this.socket.emit(
          "VICTIM_CHECK",
          console.log("victim check! from the button")
        );
      }
      // else if (
      // 	this.markers.report === true &&
      // 	this.markers.identity === 'victim'
      // ) {
      // 	this.markers.report = !this.markers.report;
      // 	this.vMessage = '신고 여부 확인 ';
      // 	let index = this.markers.id;
      // 	EventBus.$emit('victimCall', this.victimBackCall, index);
      // 	EventBus.$emit('yellowImage', this.yellowCall, index);
      // 	EventBus.$emit('getPosition2', this.markers);
      // }
    }
    // callSocket() {
    // 	console.log('hello#@#!');
    // 	this.socket.emit('POLICE_MESSAGE', () => {
    // 		console.log('hello!');
    // 	});
    // },
  },
  components: {
    NearPopUp,
    NearMissionComplete
  }
};
</script>

<style scoped></style>
