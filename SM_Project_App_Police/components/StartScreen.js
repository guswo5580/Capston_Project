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

//////Import socket/////
window.navigator.userAgent = "react-native";
import io from "socket.io-client";

//////Import EventBus//////
import EventBus from "react-native-event-bus";

import FlipToggle from "react-native-flip-toggle-button";
import { Bubbles } from "react-native-loader";
import Color from "../constants/Colors";
import DeclareModal from "./DeclareModal.js";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
let Socket = io("http://172.16.41.21:7499", {
  jsonp: false,
  autoConnect: true,
  secure: true,
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: Infinity
});

export default class StartingScreen extends React.Component {
  state = {
    impossible: false,
    Modal: false
  };
  constructor() {
    super();
  }
  componentDidUpdate() {
    if (this.state.impossible === true) {
      Socket.disconnect();
      console.log("Socket Disconnect");
    }
    if (this.state.impossible === false) {
      console.log("Socket Connect");
      let Socket = io("http://172.16.41.21:7499", {
        jsonp: false,
        autoConnect: true,
        secure: true,
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionAttempts: Infinity
      });
      Socket.on("connect", () => {
        console.log("connection server");
      });
      Socket.on("POLICE_MESSAGE", () => {
        console.log("Recieve");
        this.setState({
          Modal: true
        });
      });
    }
  }
  componentDidMount() {
    EventBus.getInstance().addListener(
      "EmitToCall",
      (this.listener = async () => {
        await Socket.emit("POLICE_CALLBACK", {
          id: 1,
          name: "박원형",
          class: "경위",
          workArea: "광진경찰서",
          identity: "police",
          report: true
        });
        await console.log("Emit");
        await EventBus.getInstance().fireEvent("ShowMainPage", {
          declare: true
        });
      })
    );
  }

  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.listener);
  }
  render() {
    if (this.state.impossible === false) {
      return (
        <View style={styles.containerON}>
          <View>
            <Text style={{ color: "white" }}>2019/11/15/18:29</Text>
          </View>
          <View style={styles.main}>
            <FlipToggle
              value={this.state.impossible}
              // disabled={true}
              buttonWidth={400}
              buttonHeight={250}
              buttonRadius={50}
              buttonOffColor={"rgb(129,178,212)"}
              sliderOffColor={"white"}
              onToggle={value => {
                this.setState({ impossible: value });
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
                this.setState({ impossible: true });
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
              value={this.state.impossible}
              // disabled={true}
              buttonWidth={400}
              buttonHeight={250}
              buttonRadius={50}
              buttonOnColor={"rgb(234,128,136)"}
              sliderOnColor={"white"}
              onToggle={value => {
                this.setState({ impossible: value });
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
                this.setState({ impossible: false });
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
    top: height / 2.5,
    right: width / 7
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
    top: height / 2.5,
    left: width / 7
  },
  BtnText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  }
});
