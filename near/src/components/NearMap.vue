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
      :center="{lat:currentLocation.lat, lng:currentLocation.lng}"
      :zoom="8"
      style="width:100%;  height: 100vh;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :icon="m.icon"
        @click="toggleInfoWindow(m,index)"
      ></gmap-marker>

      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div v-html="infoContent" @Click="changedInfo()"></div>
        <NearMapModal></NearMapModal>
      </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>
/* global google */

import { EventBus } from "../event/eventBus";
import NearMapModal from "./common/NearMapModal";

export default {
  name: "GoogleMap",
  data() {
    return {
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
      //
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
          name: "유승훈 (남)",
          age: "27 (9301027)",
          bloodType: "O형 (RH+)",
          position: { lat: 37.546497, lng: 127.069922 },
          info: "조선실세 사건 증인 보호 중",
          img: "MrYoo.jpeg",
          report: false,
          identity: "victim",
          icon: { url: "yellow.ico" }
        },
        {
          id: 1,
          name: "박원형 (남)",
          workArea: "둔촌 파출소",
          class: "경위",
          bloodType: "AB형(RH++)",
          position: { lat: 37.54817, lng: 127.069234 },
          img: "MrYoo.jpeg",
          report: false,
          identity: "police",
          icon: { url: "white.png" }
        },
        {
          id: 2,
          name: "House of Johannes Cele",
          age: "age 3",
          bloodType: "",
          position: { lat: 37.539704, lng: 127.065603 },
          img: "",
          report: false,
          identity: "victim",
          icon: { url: "yellow.ico" }
        },
        {
          id: 3,
          name: "House of Johannes Cele",
          age: "age 4",
          bloodType: "",
          position: { lat: 37.537928, lng: 127.071459 },
          img: "",
          report: false,
          identity: "victim",
          icon: { url: "yellow.ico" }
        },
        {
          id: 4,
          name: "김장수 (남)",
          workArea: "둔촌 파출소",
          class: "경위",
          bloodType: "O형(RH++)",
          position: { lat: 37.545344, lng: 127.07664 },
          img: "MrYoo.jpeg",
          report: false,
          identity: "police",
          icon: { url: "white.png" }
        },
        {
          id: 5,
          name: "이지광 (남)",
          workArea: "둔촌 파출소",
          class: "경위",
          bloodType: "A형(RH++)",
          position: { lat: 37.54921, lng: 127.09006 },
          img: "MrYoo.jpeg",
          report: false,
          identity: "police",
          icon: { url: "white.png" }
        },
        {
          id: 6,
          name: "김목수 (남)",
          workArea: "둔촌 파출소",
          class: "경위",
          bloodType: "B형(RH++)",
          position: { lat: 37.551836, lng: 127.077932 },
          img: "MrYoo.jpeg",
          report: false,
          identity: "police",
          icon: { url: "white.png" }
        },
        {
          id: 7,
          name: "최태형 (남)",
          workArea: "둔촌 파출소",
          class: "경위",
          bloodType: "O형(RH++)",
          position: { lat: 37.545313, lng: 127.062799 },
          img: "MrYoo.jpeg",
          report: false,
          identity: "police",
          icon: { url: "white.png" }
        }
      ],
      clickedPosition: { lat: 0, lng: 0 }
    };
  },
  created() {
    EventBus.$on("redImage", (redCall, number) => {
      //  delete this.markers[number].icon.url;
      console.log(redCall);
      this.markers[number].icon = redCall;
    });
    EventBus.$on("yellowImage", (yellowCall, number) => {
      //  delete this.markers[number].icon.url;
      this.markers[number].icon = yellowCall;
    });
    EventBus.$on("blueImage", (blueCall, number) => {
      //  delete this.markers[number].icon.url;
      this.markers[number].icon = blueCall;
    });
    EventBus.$on("whiteImage", (whiteCall, number) => {
      //  delete this.markers[number].icon.url;
      console.log(whiteCall);
      this.markers[number].icon = whiteCall;
    });
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
  methods: {
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
      //  console.log(this.clickedPosition.icon.url);
      //  this.clickedPosition.icon.url.pop();
      //  this.clickedPosition.icon.url = "test.png";
      EventBus.$emit("getPosition", this.clickedPosition, this.countCall);
      let userImg = JSON.stringify(marker.img);

      if (marker.identity === "police") {
        return `<div>
            <div>
                <img  src=${userImg} align="left" width="74px" height="98px" >
                <div class="policeFrontContents">이름    <span class="policeBackContents">${marker.name}</span></div>
               <div class="policeFrontContents">소속    <span class="policeBackContents">${marker.workArea}</span></div>
               <div class="policeFrontContents">계급   <span class="policeBackContents" >${marker.class}</span></div>
               <div class="policeFrontContents">혈액형    <span class="policeBackContents" style="padding-left:8px;">${marker.bloodType}</span></div>
            </div>
          </div>
          </div>`;
      } else {
        return `<div>
            <div>
                <img  src=${userImg} align="left" width="74px" height="98px" >
                <div class="contents-word">이름    <span class="contents-dword">${marker.name}</span></div>
               <div class="contents-word">나이    <span class="contents-dword">${marker.age}</span></div>
               <div class="contents-word">혈액형   <span class="contents-dword" style="padding-left:8px;">${marker.bloodType}</span></div>
               <div class="contents-word">정보    <span class="contents-dword">${marker.info}</span></div>
            </div>
            <div class="divChange"></div>
            <div class="bpm-word" style="padding-top: 10px;">현재 심장박동 <span class="bpm">164</span> <span class="bpm-bpm">bpm</span></div>
            <div><img src="heartbeat.png" width="100%"</div>
            </div>
          </div>
          </div>`;
      }
    }
  },
  components: {
    NearMapModal
  }
};
</script>

<style  >
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
  width: 40vh;
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
  font-weight: bold;
  padding-left: 10px;
  padding-bottom: 3px;
  padding-top: 7px;
}
.contents-dword {
  font-weight: lighter;
  padding-left: 20px;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
}
.bpm {
  padding-left: 160px;
  font-weight: bold;
  font-size: 25px;
}
.bpm-word {
  font-weight: bold;
  padding-left: 0;
  padding-bottom: 3px;
  font-size: 17px;
}
.bpm-bpm {
  font-weight: normal;
}

.divChange {
  height: -40px;
  padding-bottom: 30px;
  color: lightgray;
  width: 100%;
  border-bottom: 2px;
  border-bottom-style: inset;
}
.policeFrontContents {
  font-weight: bold;
  padding-top: 9px;
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
</style>