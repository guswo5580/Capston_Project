<template>
  <div>
    <div class="bpm-word" style="padding-top: 10px;">
      현재 심장박동
      <span class="bpm">{{pulseNumber}}</span>
      <span class="bpm-bpm">bpm</span>
    </div>
    <trend
      :data="numbers"
      :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
      auto-draw
      :autoDrawDuration="5000"
      smooth
      :key="componentKey"
    ></trend>
  </div>
</template>

<script>
// import Trend from "vuetrend";
// :autoDrawDuration="30000"
export default {
  data() {
    return {
      componentKey: 0,
      numbers: [
        -0.1,
        -0,
        1,
        -0.1,
        -0.1,
        0.5,
        0.3,
        0.1,
        -0.7,
        -0.8,
        0.1,
        0.7,
        0.8,
        0.1,
        -0.7,
        -0.8,
        0.2,
        0.2,
        0.2,
        -0.1,
        -0.1,
        -0.1,
        -0.1,
        -0,
        1,
        -0.1,
        -0.1,
        0.5,
        0.3,
        0.1,
        -0.7,
        -0.8,
        0.1,
        0.7,
        0.8,
        0.1,
        -0.7,
        -0.8,
        0.2,
        0.2,
        0.2,
        -0.1,
        -0.1,
        -0.1,
        -0.1,
        -0,
        1,
        -0.1,
        -0.1,
        0.5,
        0.3,
        0.1,
        -0.7,
        -0.8,
        0.1,
        0.7,
        0.8,
        0.1,
        -0.7,
        -0.8,
        0.2,
        0.2,
        0.2,
        -0.1,
        -0.1,
        -0.1,
        -0.1,
        -0,
        1,
        -0.1,
        -0.1,
        0.5,
        0.3,
        0.1,
        -0.7,
        -0.8,
        0.1,
        0.7,
        0.8,
        0.1,
        -0.7,
        -0.8,
        0.2,
        0.2,
        0.2,
        -0.1,
        -0.1,
        -0.1,
        -0.1,
        -0,
        1,
        -0.1,
        -0.1,
        0.5,
        0.3,
        0.1,
        -0.7,
        -0.8,
        0.1,
        0.7,
        0.8,
        0.1,
        -0.7,
        -0.8,
        0.2,
        0.2,
        0.2,
        -0.1,
        -0.1,
        -0.1,
        -0.1,
        -0,
        1,
        -0.1,
        -0.1,
        0.5,
        0.3,
        0.1,
        -0.7,
        -0.8,
        0.1,
        0.7,
        0.8,
        0.1,
        -0.7,
        -0.8,
        0.2,
        0.2,
        0.2,
        -0.1,
        -0.1,
        -0.1,
        -0.1,
        -0,
        1,
        -0.1,
        -0.1,
        0.5,
        0.3,
        0.1,
        -0.7,
        -0.8,
        0.1,
        0.7,
        0.8,
        0.1,
        -0.7,
        -0.8,
        0.2,
        0.2,
        0.2,
        -0.1,
        -0.1,
        -0.1,
        -0.1,
        -0,
        1,
        -0.1,
        -0.1,
        0.5,
        0.3,
        0.1,
        -0.7,
        -0.8,
        0.1,
        0.7,
        0.8,
        0.1,
        -0.7,
        -0.8,
        0.2,
        0.2,
        0.2,
        -0.1,
        -0.1,
        -0.1
      ],
      pulseNumber: ""
    };
  },

  methods: {
    callFunction: function() {
      var v = this;
      setInterval(function() {
        v.componentKey += 1;
      }, 5000);
    },
    checkPulse() {
      var v = this;
      setInterval(function() {
        v.pulseNumber = Math.ceil(Math.random() * 40 + 50);
      }, 5000);
    }
  },
  mounted() {
    this.callFunction();
    this.checkPulse();
  }
};
</script>

<style>
.bpm {
  padding-left: 220px;
  font-weight: bold;
  font-size: 25px;
}
.bpm-word {
  font-weight: bold;
  padding-left: 0;
  padding-bottom: 15px;
  font-size: 17px;
}
.bpm-bpm {
  font-weight: normal;
}
</style>