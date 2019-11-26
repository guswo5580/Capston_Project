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
import Host from "../constants/Host";
import CancleModal from "../components/CancleModal";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
let Socket = io(Host.Port, {
  jsonp: false,
  autoConnect: true,
  secure: true,
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: Infinity
});

//경찰이 출동을 시작하기 전에 시작되는 컴포넌트
export default class StartingScreen extends React.Component {
  state = {
    impossible: false,
    Modal: false
  };
  constructor() {
    super();
  }
  async componentDidUpdate() {
    //경찰의 현 상황에 따라서 웹으로부터 통신 불가, 통신 가능 상태를 웹에 전송
    if (this.state.impossible === true) {
      Socket.emit("POLICE_ISBUSY");
    }

    //경찰이 출동 신호를 받고 모달을 통해 신고자의 정보를 확인
    Socket.on("POLICE_MESSAGE", () => {
      console.log("Recieve");
      this.setState({
        Modal: true
      });
    });
  }
  componentDidMount() {
    Socket.on("connect", console.log("Socket is connected"));

    //신고자 정보 확인 후 출동 신고를 웹에 보냄
    Socket.on("VICTIM_NO_NEED_HELP", async () => {
      await this.setState({
        Modal: false
      });
      // await this.setState({
      //   cancel: true
      // });
    });
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
        await EventBus.getInstance().fireEvent("ShowMainPage", {
          declare: true
        });
      })
    );
    EventBus.getInstance().addListener(
      "BackToStartScreen",
      (this.listener = data => {
        this.setState({
          impossible: false,
          Modal: false
        });
      })
    );
  }

  //전체 이벤트 리스너를 삭제
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
            <TouchableOpacity
              style={styles.footerbtnON}
              onPress={async () => {
                await Socket.emit("LOGOUT_POLICE", { data: "경찰 퇴근" });
                await console.log("퇴근 신호 전달");
              }}
            >
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
