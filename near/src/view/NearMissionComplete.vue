<template>
  <div class="dv">
    <div>
      <div class="rightBox">
        <div class="testline">
          <div :style="finish" class="firstDiv">
            <img src="../../public/finish.png" width="30px" align="left" class="imgMv" />
          </div>
          <span class="secondDiv">사건완료</span>
          <div>
            <span class="thirdDiv">{{victimName}}</span>
          </div>
          <div class="fourthDiv">
            <span class="fourthDiv">{{policeName}}</span>
            <span style="padding-left:5px">{{policeClass}}</span>
            <span>({{policeWorkArea}})</span>
            <span>담당</span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="dv" v-if="isDone">
        <div>
          <div class="rightBox">
            <div class="testline">
              <div :style="finish" class="firstDiv">
                <img src="../../public/finish.png" width="30px" align="left" class="imgMv" />
              </div>
              <span class="secondDiv">사건완료</span>
              <div>
                <span class="thirdDiv">{{victimName}}</span>
              </div>
              <div class="fourthDiv">
                <span class="fourthDiv">{{policeName}}</span>
                <span style="padding-left:5px">{{policeClass}}</span>
                <span>({{policeWorkArea}})</span>
                <span>담당</span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../event/eventBus";
export default {
  data() {
    return {
      isDone: false,
      marker: [],
      policeId: "",
      victimId: "",
      finish: {
        backgroundColor: "#707070",
        width: "15%",
        height: "50px",
        alignItem: "center",
        justifyContent: "center",
        position: "center"
      },
      policeName: "",
      victimName: "",
      policeClass: "",
      policeWorkArea: "",
      whiteCall: "white.png",
      yellowCall: "yellow.ico"
    };
  },

  created() {
    EventBus.$on("policeDONE", (policeMarkers, index) => {
      this.policeId = index;
      // this.isDone = false;
      console.log(index);
      this.policeName = policeMarkers.name;
      this.policeClass = policeMarkers.class;
      this.policeWorkArea = policeMarkers.workArea;
    }),
      EventBus.$on("victimDONE", (victimMarkers, index) => {
        this.victimId = index;
        // this.isDone = false;
        console.log(index);
        this.victimName = victimMarkers.name;
      }),
      EventBus.$on("JobsDone", () => {
        var v = this;
        console.log("5초뒤 작동");
        v.isDone = true;
        EventBus.$emit("backYellow", this.victimId);
        EventBus.$emit("backWhite", this.polcieId);
        EventBus.$emit("backPoliceButton");
        EventBus.$emit("backVictimButton");
        EventBus.$emit("doneCall");
        // setTimeout(() => {
        //   v.isDone = true;
        //   EventBus.$emit("backYellow", this.victimId);
        //   EventBus.$emit("backWhite", this.polcieId);
        //   EventBus.$emit("backPoliceButton");
        //   EventBus.$emit("backVictimButton");
        //   EventBus.$emit("doneCall");
        // }, 6000);
      });
    // setTimeout(() => {
    //   let v = this;
    //   console.log("5초뒤 작동");
    //   v.isDone = true;
    //   this.callEventFunction();
    // }, 6000);
  }
  // methods: {
  // //   callEventFunction() {
  // //     EventBus.$emit("backYellow", this.victimId);
  // //     EventBus.$emit("backWhite", this.policeId);
  // //     EventBus.$emit("backPoliceButton");
  // //     EventBus.$emit("backVictimButton");
  // //     EventBus.$emit("doneCall");
  // //   }
  // // }
  // // methods: {
  // //   callFinish() {
  // //     let v = this;
  // //     setTimeOut(function() {
  // //       v.isDone = true;
  // //     }, 5000);
  // //   }
  // // },
  // // mounted() {
  // //   this.callFinish();
  // // }
};
</script>

<style scoped>
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
  font-weight: bold;
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
  padding-left: 10px;
}
.rightBox {
  float: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.dv {
  padding-left: 20px;
  padding-right: 20px;
}
.imgMv {
  margin-left: 10px;
  margin-top: 10px;
}
.fourthDiv {
  width: 100%;
  float: center;
  margin: 0 auto;
  font-size: 11px;
  padding-left: 10px;
}
.testline {
  border: 1px solid lightgrey;
  border-radius: 5px;
  box-sizing: content-box;
  width: 100%;
  height: 50px;
}
</style>