<template></template>

<script>
export default {};
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