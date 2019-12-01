<template>
  <b-container class="bv-example-row">
    <div>
      <b-row class="divOut">
        <b-col>
          <b-row class="divIn">
            <b-col style="padding-left:2%">
              <i class="fas fa-circle first"></i>
              <span>
                신고접수
                <span style="color:#707070;">{{ victimCall }}건</span>
                <span class="divLine">|</span>
              </span>
            </b-col>
            <b-col>
              <i class="fas fa-circle second"></i>
              <span>
                출동 배정
                <span style="color:#707070;">{{ askingCall }}건</span>
                <span class="divLine">|</span>
              </span>
            </b-col>
            <b-col>
              <i class="fas fa-circle third"></i>
              <span>
                출동 중
                <span style="color:#707070;">{{ policeCall }}건</span>
                <span class="divLine2">|</span>
              </span>
            </b-col>
            <b-col style="padding-right:10px">
              <i class="fas fa-circle fourth"></i>
              <span>보호 관찰</span>
              <span style="color:#707070; padding-left:2px;">{{ victimSafe }}건</span>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import { EventBus } from "../../event/eventBus";
export default {
  data() {
    return {
      victimCall: 0,
      askingCall: 0,
      policeCall: 0,
      victimSafe: 3
    };
  },
  created() {
    EventBus.$on("victimCall", () => {
      this.victimCall += 1;
      this.victimSafe -= 1;
    });
    EventBus.$on("askingPolice", () => {
      this.askingCall += 1;
    });
    EventBus.$on("policeCall", () => {
      this.askingCall -= 1;
      this.policeCall += 1;
    });
    EventBus.$on("statusReset", () => {
      // this.policeCall -= 1;
      // this.victimCall -= 1;
      // this.victimSafe += 1;
      this.victimCall = 0;
      this.askingCall = 0;
      this.policeCall = 0;
      this.victimSafe = 3;
    });
    EventBus.$on("victimSafeCall", () => {
      this.victimSafe -= 1;
    });
    EventBus.$on("victimSafeCallBack", () => {
      this.victimCall -= 1;
      this.victimSafe += 1;
    });
  }
};
</script>

<style>
div.col {
  font-size: 1mm;

  padding-left: 0px;
  padding-right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: auto;
}
.first {
  color: red;
  padding-right: 2%;
}
.second {
  color: purple;
  padding-right: 2%;
  padding-left: 2%;
}
.third {
  color: blue;
  padding-right: 2%;
  padding-left: 2%;
}
.fourth {
  color: yellow;
  padding-right: 10%;
  padding-left: 2%;
}
.divOut {
  padding: 0;
  max-width: 100%;
  height: auto;
  padding-left: 20px;
}
.divIn {
  border: 1px solid lightgrey;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  box-sizing: content-box;
  width: 100%;
  line-height: 25px;
  max-width: 100%;
  height: auto;
}
.divLine {
  color: lightgrey;
  margin-left: 4px;
}
.divLine2 {
  margin-left: 10px;
  color: lightgrey;
}
</style>
