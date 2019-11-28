<template>
  <div>
    <!-- <gmap-map
      ref="gmap"
      :center="{lat:currentLocation.lat, lng:currentLocation.lng}"
      :zoom="8"
      style="width:100%;  height: 100vh;"
      @click="geolocation"
    >-->
    <gmap-map
      ref="gmap"
      :center="{ lat: currentLocation.lat, lng: currentLocation.lng }"
      :zoom="8"
      style="width:100%;  height: 100vh;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :icon="m.icon"
        @click="toggleInfoWindow(m, index)"
      ></gmap-marker>

      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
        <div v-html="infoContent" @Click="changedInfo()"></div>
        <NearChart v-if="clickedVictim"></NearChart>
        <NearMapModal></NearMapModal>
      </gmap-info-window>
    </gmap-map>
  </div>
</template>
<script>
/* global google */
import axios from "axios";
import { EventBus } from "../event/eventBus";
import NearMapModal from "./common/NearMapModal";
import NearChart from "./common/NearChart";
import NearMissionComplete from "../view/NearMissionComplete";
import NearMPopUp from "../view/NearPopUp";
import io from "socket.io-client";

export default {
  name: "GoogleMap",
  data() {
    return {
      socket: io("http://192.168.35.35:7499"),
      currentLocation: { lat: 0, lng: 0 },
      map: null,
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      countCall: 1,
      //haha
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      callfunction: false,
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
        },

        {
          id: 2,
          name: "여소빈",
          age: "22 (981001)",
          bloodType: "B형 (RH+)",
          position: { lat: 37.539704, lng: 127.065603 },
          info: "최근 스토커로부터 전화 협박 받음",
          img: "MrYoo.jpeg",
          report: false,
          identity: "victim",
          icon: { url: "yellow.png" }
        },
        {
          id: 3,
          name: "손영덕",
          age: "27 (930304)",
          bloodType: "A형 (RH+)",
          position: { lat: 37.537928, lng: 127.071459 },
          img: "MrYoo.jpeg",
          info: "신변보호 필요",
          report: false,
          identity: "victim",
          icon: { url: "yellow.png" }
        },
        {
          id: 4,
          name: "김장수(남)",
          workArea: "광진 파출소",
          class: "경위",
          bloodType: "O형(RH+)",
          position: { lat: 37.55974, lng: 127.085245 },
          img: "Police.jpg",
          report: false,
          waitingCall: false,
          acceptCall: false,
          finishCall: false,
          identity: "police",
          icon: { url: "white.png" }
        },

        {
          id: 5,
          name: "이지광(남)",
          workArea: "광진 파출소",
          class: "경위",
          bloodType: "A형(RH+)",
          position: { lat: 37.548439, lng: 127.04845 },
          img: "Police.jpg",
          report: false,
          waitingCall: false,
          acceptCall: false,
          finishCall: false,
          identity: "police",
          icon: { url: "white.png" }
        },
        {
          id: 6,
          name: "김목수(남)",
          workArea: "광진 파출소",
          class: "경위",
          bloodType: "B형(RH+)",
          position: { lat: 37.545554, lng: 127.099834 },
          img: "Police.jpg",
          report: false,
          waitingCall: false,
          acceptCall: false,
          finishCall: false,
          identity: "police",
          icon: { url: "white.png" }
        },
        {
          id: 7,
          name: "최태형(남)",
          workArea: "광진 파출소",
          class: "경위",
          bloodType: "O형(RH+)",
          position: { lat: 37.538233, lng: 127.053206 },
          img: "Police.jpg",
          report: false,
          waitingCall: false,
          acceptCall: false,
          finishCall: false,
          identity: "police",
          icon: { url: "white.png" }
        }
      ],
      clickedPosition: { lat: 0, lng: 0 },
      clickedPolice: false,
      clickedVictim: false,
      componentKey: 0,
      purpleCall: "purple.png",
      waitingCall: 1,
      policeBackID: "",
      victimBackID: "",
      policeBusy: false,
      rasberryCall: null,
      calling: true,
      intervalid: ""
    };
  },
  //   axios
  //         .post("/RaspNull", {
  //           RaspberryData: null
  //         })
  //         .then(res => {
  //           console.log(res.data);
  //         });

  created() {
    this.SetInterval();
    //     this.intervalid = setInterval(() => {
    //       axios
    //         .get("/raspData")
    //         .then(res => {
    //           console.log(res.data.response);
    //           if (res.data.response === "Fucking") {
    //             this.rasberryCall = res.data.response;
    //           } else {
    //             this.rasberryCall = null;
    //           }
    //         })
    //         .catch();
    //     }, 5000);

    EventBus.$on("rasberryCall", () => {
      this.markers[0].icon = "red.png";
      clearInterval(rasBCall);
    });
    EventBus.$on("redImage", (redCall, number) => {
      this.markers[number].icon = redCall;
    }),
      EventBus.$on("yellowImage", (yellowCall, number) => {
        this.markers[number].icon = yellowCall;
      }),
      EventBus.$on("changeBlue", (blueCall, number) => {
        this.markers[number].icon = blueCall;
      }),
      EventBus.$on("whiteImage", (whiteCall, number) => {
        this.markers[number].icon = whiteCall;
      }),
      //사건완료시 경찰, 사용자 색 원래대로 돌리기
      EventBus.$on("backYellow", victimBackId => {
        this.victimBackID = victimBackId;
        this.markers[victimBackId].icon = "yellow.png";
      }),
      EventBus.$on("backWhite", policeBackId => {
        this.markers[policeBackId].icon = "white.png";
      }),
      EventBus.$on("changePurple", (purpleCall, index) => {
        this.markers[index].icon = purpleCall;
      }),
      EventBus.$on("FinishJob", (pid, vid) => {
        this.markers[pid.id].report = false;
        this.markers[vid.id].report = false;
      });

    // 라즈베리파이 신호보낸후 마커 색깔바꾸기
    // 버튼 글짜 바꿔야됨
    this.socket.on("victim_cancel", () => {
      console.log(
        "사용자로부터 취소신청 받고 맵 마커 색깔이 바뀐후에 버튼으로 이벤트 발생!"
      );
      this.markers[0].icon = "yellow.png";
      this.markers[0].report = false;
      EventBus.$emit("victimCancelCAll");
      EventBus.$emit("victimSafeCallBack");
      this.SetInterval();
    });
    //알림 표시 필요하면 해야함
    this.socket.on("POLICE_BUSY", () => {
      console.log("바쁘다고! 색깔바꿔!");
      this.markers[1].icon = "green.png";
      // 버튼 출동불가 바꾸기
      this.policeBusy = true;
      EventBus.$emit("police_isBusy");
    });
    //알림 표시 필요하면 해야함
    this.socket.on("POLICE_CAN_WORK", () => {
      console.log("NearMap에서 이벤트 받고 경찰이 다시 일할수있음");
      this.markers[1].icon = "white.png";
      this.policeBusy = false;
      EventBus.$emit("police_canWork");
    });
    this.socket.on("VICTIM_NO_NEED_HELP", data => {
      console.log(
        "사용자가 신고접수후 경찰이 출동했는데 사용자가 취소를 눌렀다!"
      );
      this.markers[0].icon = "yellow.png";
      this.markers[0].report = false;
      this.markers[1].icon = "white.png";
      this.markers[1].report = false;
      //취소 신청시 알림 신고취소로 변경
      EventBus.$emit("victim_no_need_help");
      EventBus.$emit("victim_no_button");
      EventBus.$emit("victimSafeCallBack");
      //버튼 표시 변경
      EventBus.$emit("doneCall", data);
      // setInterval 다시 켜주기
      this.SetInterval();
    });
    this.socket.on("JOBS_done", police => {
      // this.police.report = !this.police.report;
      this.markers[0].icon = "yellow.png";
      this.markers[1].icon = "white.png";
      this.markers[0].report = false;
      this.markers[1].report = false;
      console.log("JOBS_done 받고 JOBSDONE을 NearFlow로 보냄! ");
      EventBus.$emit("JOBSDONE", police, this.markers[0]);
      EventBus.$emit("doneCall");
      this.SetInterval();
    });
    EventBus.$on("police_not_busy", () => {
      this.policeBusy = false;
    });
    this.socket.on("KILL_POLICE", () => {
      this.markers[1].icon = NULL;
    });
    this.socket.emit("POLICE_YES_OR_NO", () => {});
  },
  mounted() {
    this.$refs.gmap.$mapPromise.then(map => {
      const bounds = new google.maps.LatLngBounds();
      for (let m of this.markers) {
        bounds.extend(m.position);
      }
      map.fitBounds(bounds);
    });
  },
  watch: {
    rasberryCall: function(newVal) {
      console.log(newVal);
      if (newVal === "Fucking") {
        this.markers[0].icon = "red.png";
        EventBus.$emit("getPosition2", this.markers[0]);
        this.SetInterval();
      } else {
        console.log("Rasberry Call is done");
      }
    }
  },
  methods: {
    SetInterval() {
      this.intervalid = setInterval(() => {
        axios
          .get("/raspData")
          .then(res => {
            console.log(res.data.response);
            if (res.data.response === "Fucking") {
              this.rasberryCall = res.data.response;
            } else {
              this.rasberryCall = null;
            }
          })
          .catch();
      }, 5000);
    },
    _StartInterVal() {
      console.log("시작한다!!");
      console.log(this.intervalid);
    },
    _StopInterval() {
      clearInterval(this.intervalid);
      axios
        .post("/raspNull", {
          data: null
        })
        .then(function(data) {
          console.log(data.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = this.getInfoWindowContent(marker);

      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    geolocation: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },

    getInfoWindowContent: function(marker, countCall) {
      this.clickedPosition = marker;

      EventBus.$emit(
        "getPosition",
        this.clickedPosition,
        this.countCall,
        this.clickedPosition.id,
        this.policeBusy
      );
      let userImg = JSON.stringify(marker.img);

      if (marker.identity === "police") {
        this.clickedVictim = false;
        return `<div>
            <div >
                <img  src=${userImg} align="left" width="128px" height="128px" class="imgMv">
                <div class="policeFrontContents">이름    <span class="policeBackContents">${marker.name}</span></div>
               <div class="policeFrontContents">소속    <span class="policeBackContents">${marker.workArea}</span></div>
               <div class="policeFrontContents">계급   <span class="policeBackContents" >${marker.class}</span></div>
               <div class="policeFrontContents">혈액형    <span class="policeBackContents" style="padding-left:8px;">${marker.bloodType}</span></div>
            </div>
          </div>
          <div class="dv"></div>
          </div>`;
      } else {
        this.clickedPolice = false;
        this.clickedVictim = true;
        return `<div>
            <div>
                <img  src=${userImg} align="left" width="106.2px" height="141.6px" class="imgMv" >
                <div class="contents-word">이름    <span class="contents-dword">${marker.name}</span></div>
               <div class="contents-word">나이    <span class="contents-dword">${marker.age}</span></div>
               <div class="contents-word">혈액형   <span class="contents-dword" style="padding-left:8px;">${marker.bloodType}</span></div>
               <div class="contents-word">정보    <span class="contents-dword">${marker.info}</span></div>
            </div>
            <div class="divChange"></div>
            </div>
          </div>
          </div>`;
      }
    }
  },
  components: {
    NearMapModal,
    NearChart,
    NearMissionComplete,
    NearMPopUp
  }
};
</script>

<style>
.information {
  text-align: center;
  text-decoration: bold;
}
.move {
  width: 100%;
  height: 20px;
  margin-top: 20px;
  background-color: red;
  color: white;
}
.gm-style-iw-d {
  width: 50vh;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.gm-style-iw.gm-style-iw-c {
  padding-left: 20px;
}
.image,
is-4by3 {
  width: auto;
}
.top {
  display: inline-block;
}
div.card-image {
  width: 50px;
}

.contents {
  text-align: left;
}
.contents-word {
  font-size: 17px;
  font-weight: bold;
  padding-left: 10px;
  padding-bottom: 3px;
  padding-top: 7px;
  margin: 7px;
}
.contents-dword {
  font-weight: lighter;
  padding-left: 20px;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
}

.divChange {
  height: -40px;

  padding-bottom: 9px;
  color: lightgray;
  width: 100%;
  border-bottom: 2px;
  border-bottom-style: inset;
}
.policeFrontContents {
  font-weight: bold;

  font-size: 17px;
  margin: 14.5px;
  /* margin: 10; */
  /* padding-left: 10px;
  padding-bottom: 3px; */
}
.policeBackContents {
  font-weight: lighter;
  padding-left: 20px;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
}
.dv {
  /* width: 100%;
  height: 100%; */
  padding: 5px;
}
.imgMv {
  margin-right: 20px;
}
</style>
