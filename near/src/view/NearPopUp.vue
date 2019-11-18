<template>
  <div class="dv">
    <div>
      <div class="rightBox">
        <div v-if="victim | police | policeWay" class="testline">
          <div v-if="victim" :style="red" class="firstDiv">
            <img src="../../public/NumberOne.png" width="30px" align="left" class="imgMv" />
          </div>
          <div v-if="police" :style="purple" class="firstDiv">
            <img src="../../public/NumberTwo.png" width="30px" align="left" class="imgMv" />
          </div>
          <div v-if="policeWay" :style="blue" class="firstDiv">
            <img src="../../public/NumberThree.png" width="30px" align="left" class="imgMv" />
          </div>
          <div v-if="victim" class="secondDiv">{{callInfo1}}</div>
          <div v-if="police" class="secondDiv">{{callInfo3}}</div>
          <div v-if="policeWay" class="secondDiv">{{callInfo2}}</div>
          <div>
            <span v-if="victim" class="thirdDiv">{{callName}}</span>
            <span v-if="victim" class="thirdDiv">{{typeOfCall[0]}}</span>
            <br />
            <span class="fourthDiv">{{currentSituation[0]}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div>
      <div class="divIn">
        <span v-if="victim" :style="red" class="firstDiv">
          <img src="../../public/NumberOne.png" width="30%" align="left" />
        </span>
        <span v-if="police" :style="blue">
          <img src="../../public/NumberTwo.png" width="30%" align="left" />
        </span>
        <span v-if="policeWay" :style="purple">
          <img src="../../public/NumberThree.png" width="30%" align="left" />
        </span>
      </div>
      <div class="divIn">{{callInfo1}}<</div>
      <div class="divIn">{{newPosition.name}}</div>

      <div v-if="victim" :style="red">
        <div class="changeIn">
          <img src="NumberOne.svg" width="30px" height="20px" align="left" />
        </div>
        <div class="changeIn"></div>
        <div class="changeIn"></div>
      </div>

      <ul>
        <li v-for="(info) in this.newPosition" :key="info.id">{{info}}</li>
      </ul>
    </div>-->
  </div>
</template>

<script scoped>
import { EventBus } from "../event/eventBus";
export default {
  data() {
    return {
      newPosition: {},
      messages: ["신고접수", "출동 배정", "출동 중"],
      currentSituation: ["담당 경찰관이 배정되지 않았습니다."],
      typeOfCall: ["수동신고", "자동신고"],
      red: {
        backgroundColor: "#E60012",
        width: "15%",
        height: "100%",
        alignItem: "center",
        justifyContent: "center",
        position: "center"
      },
      purple: {
        backgroundColor: "#7E318E",
        idth: "15%",
        height: "100%",
        alignItem: "center",
        justifyContent: "center",
        position: "center"
      },
      blue: {
        backgroundColor: "#036EB8",
        idth: "15%",
        height: "100%",
        alignItem: "center",
        justifyContent: "center",
        position: "center"
      },
      victim: false,
      police: false,
      policeWay: false,
      callInfo1: "",
      callInfo2: "",
      callInfo3: "",
      callName: ""
    };
  },
  mounted() {
    EventBus.$on("getPosition2", markers => {
      this.newPosition = markers;
      if (markers.identity === "victim") {
        // console.log("1) victim");
        this.victim = true;
        this.police = false;
        this.policeWay = false;
        this.callInfo1 = "신고 접수";
        this.callName = markers.name;
      } else if (markers.identity === "police") {
        this.police = false;
        this.policeWay = true;
        this.victim = false;
        this.callInfo2 = "출동 중";
      }
    });
    EventBus.$on("buttonPurple", markers => {
      this.newPosition = markers;
      console.log("purple!!!");
      if (markers.identity === "police") {
        this.police = true;
        this.policeWay = false;
        this.victim = false;
        this.callInfo3 = "확인 중";
      }
    });
  }
  // beforeDestroy() {
  //   EventBus.$off("getPosition2");
  //   EventBus.$off("buttonPurple");
  // }
};
</script>
<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 100%;
  line-height: 100%;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
  border-color: black;
  border: solid;
  justify-content: left;
  align-items: center;
}
.rightBox {
  float: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.popUp {
  /* border: 1px solid lightgray; */
  position: right;
  width: 200px;
  height: 50px;
  padding: 0px;
}
.bv-example-row.container {
  width: 75%;
  padding-left: 0px;
  padding-right: 0px;
  margin-right: 0px;
}
.secondContent {
  font-weight: normal;
  font-size: 15px;
  padding: 10px;
}

.divOut {
  border: 1px solid lightgrey;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  box-sizing: content-box;
  width: 100%;
  height: 48px;
}
.dv {
  padding-left: 20px;
  padding-right: 20px;
}
.testline {
  border: 1px solid lightgrey;
  border-radius: 5px;
  box-sizing: content-box;
  width: 100%;
  height: 50px;
}
.divIn {
  float: left;
  width: 30%;
}
.firstDiv {
  float: left;
  width: 15%;
  background-color: #e60012;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  justify-items: center;
}
.secondDiv {
  width: 20%;
  float: left;

  text-align: center;
  align-items: center;
  justify-items: center;
  margin-left: 10px;
  margin-top: 12px;
}
.thirdDiv {
  width: 55%;
  float: center;
  margin: 0 auto;
  font-size: 11px;
  padding-left: 10px;
}
.fourthDiv {
  width: 55%;
  float: center;
  margin: 0 auto;
  font-size: 11px;
  color: #d0d0d0;
  padding-left: 10px;
  position: absolute;
}
.imgMv {
  margin-left: 10px;
  margin-top: 10px;
}
</style>