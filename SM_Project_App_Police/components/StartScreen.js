import React from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  Animated
} from "react-native";
import FlipToggle from "react-native-flip-toggle-button";
import { Bubbles } from "react-native-loader";
import Color from "../constants/Colors";
import DeclareModal from "./DeclareModal.js";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class StartingScreen extends React.Component {
  state = {
    isActive: false,
    Modal: true
  };

  //소켓 통신으로 Modal을 true로  부르기

  render() {
    if (this.state.isActive === false) {
      return (
        <View style={styles.containerON}>
          <View>
            <Text style={{ color: "white" }}>2019/11/15/18:29</Text>
          </View>
          <View style={styles.main}>
            <FlipToggle
              value={this.state.isActive}
              // disabled={true}
              buttonWidth={400}
              buttonHeight={250}
              buttonRadius={50}
              buttonOffColor={"rgb(129,178,212)"}
              sliderOffColor={"white"}
              onToggle={value => {
                this.setState({ isActive: value });
              }}
            />
          </View>
          <View style={styles.footer}>
            <Bubbles size={6} color="#FFF" />
          </View>
          <View style={styles.Logout}>
            <TouchableOpacity style={styles.footerbtnOFF} onPress={() => {}}>
              <Text style={styles.BtnText}>퇴근하기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.StatusTextON}>
            <TouchableNativeFeedback
              onPress={() => {
                this.setState({ isActive: true });
              }}
            >
              <Animated.Text
                style={[
                  {
                    fontSize: 40,
                    fontWeight: "bold",
                    color: "#036EB8"
                  }
                ]}
              >
                출동 대기
              </Animated.Text>
            </TouchableNativeFeedback>
          </View>
          {this.state.Modal ? <DeclareModal modal={this.state.Modal} /> : null}
        </View>
      );
    } else {
      return (
        <View style={styles.containerOFF}>
          <View>
            <Text style={{ color: "white" }}>2019/11/15/18:29</Text>
          </View>
          <View style={styles.main}>
            <FlipToggle
              value={this.state.isActive}
              // disabled={true}
              buttonWidth={400}
              buttonHeight={250}
              buttonRadius={50}
              buttonOnColor={"rgb(234,128,136)"}
              sliderOnColor={"white"}
              onToggle={value => {
                this.setState({ isActive: value });
              }}
            />
          </View>
          <View style={styles.footer}>
            <Bubbles size={6} color="#FFF" />
          </View>
          <View style={styles.Logout}>
            <TouchableOpacity style={styles.footerbtnON} onPress={() => {}}>
              <Text style={styles.BtnText}>퇴근하기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.StatusTextOFF}>
            <TouchableNativeFeedback
              onPress={() => {
                this.setState({ isActive: false });
              }}
            >
              <Animated.Text
                style={[
                  {
                    fontSize: 40,
                    fontWeight: "bold",
                    color: "#E60012"
                  }
                ]}
              >
                출동 불가
              </Animated.Text>
            </TouchableNativeFeedback>
          </View>
          {this.state.Modal ? <DeclareModal modal={this.state.Modal} /> : null}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  containerOFF: {
    flex: 1,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.red
  },
  footerbtnOFF: {
    backgroundColor: "rgb(129,178,212)",
    width: width * 0.9,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 2,
    justifyContent: "center",
    height: 50
  },
  StatusTextOFF: {
    position: "absolute",
    top: height / 2.6,
    right: width / 8.7
  },
  main: {
    padding: 15
  },
  footer: {
    padding: 15
  },
  Logout: {
    position: "absolute",
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    width: width,
    padding: 15
  },
  containerON: {
    flex: 1,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.blue
  },
  footerbtnON: {
    backgroundColor: "rgb(234,128,136)",
    width: width * 0.9,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 2,
    justifyContent: "center",
    height: 50
  },
  StatusTextON: {
    position: "absolute",
    top: height / 2.6,
    left: width / 8.7
  },
  BtnText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  }
});
