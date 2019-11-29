import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  Alert
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Modal, {
  ModalContent,
  ModalFooter,
  SlideAnimation
} from "react-native-modals";

//////Import socket/////
window.navigator.userAgent = "react-native";
import io from "socket.io-client/dist/socket.io";

import EventBus from "react-native-event-bus";
import * as Permissions from "expo-permissions";
import UserHeader from "./UserHeader";
import DeclareModal from "./DeclareModal";
import Color from "../constants/Colors";
import Host from "../constants/Host";

const GOOGLE_MAP_KEY = "AIzaSyDKQLsyN5E-Sj1bUOF0gX6Z7C58ezkEUxQ";
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
export default class StartScreen extends React.Component {
  state = {
    notification: false //true = 신고 접수되어 모달 등장
  };

  constructor() {
    super();
    Socket.on("connect", () => {
      console.log("connection server");
    });
  }

  requestLocationPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status !== "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }
    this.locateCurrentPosition();
  };

  locateCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.001
        };

        this.setState({ initialPosition });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );
  };

  componentDidMount() {
    // Socket.emit("RASPBERRY_SIGNAL");
    this.requestLocationPermission();

    //웹으로부터 신고 여부 확인에 대한 신호 확인, Declare모달을 실행
    Socket.on("VICTIMCHECK", () => {
      console.log("Recieve");
      this.setState({
        notification: true
      });
    });
  }

  //Declare모달에서 신고취소 이벤트를 확인, 신고 취소에 대한 정보를 웹으로 전송
  componentDidUpdate() {
    EventBus.getInstance().addListener(
      "CancleDeclare",
      (this.listener = async () => {
        await Socket.emit("CANCEL_CALL", { data: "신고취소!!" });
        await console.log("Emit");
        await this.setState({
          notification: false
        });
      })
    );
  }

  //이벤트 버스 리스너를 모두 삭제
  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.listener);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <UserHeader />
        </View>
        <View style={styles.main}>
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={map => (this._map = map)}
            style={styles.map}
            showsUserLocation={true}
            initialRegion={this.state.initialPosition}
          ></MapView>
        </View>
        {this.state.notification ? <DeclareModal /> : null}
      </View>
    );
  }
}

StartScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  header: {
    position: "absolute",
    top: "7%",
    left: "5%",
    width: width * 0.9,
    backgroundColor: "white",
    zIndex: 1,
    borderRadius: 50,
    minHeight: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12
  },
  main: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    flex: 1
  }
});
