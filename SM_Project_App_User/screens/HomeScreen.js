import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Alert
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

window.navigator.userAgent = "react-native";
import io from "socket.io-client/dist/socket.io";

import EventBus from "react-native-event-bus";

import * as Permissions from "expo-permissions";
import Floating from "../components/Floating";
import StartingScreen from "../components/StartScreen";
import MainHeader from "../components/MainHeader";
import Loading from "../components/Loading";
import Color from "../constants/Colors";

const GOOGLE_MAP_KEY = "AIzaSyDKQLsyN5E-Sj1bUOF0gX6Z7C58ezkEUxQ";
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

export default class HomeScreen extends React.Component {
  state = {
    declare: false,
    status: false
    //declare true, status false = 신고 접수 중
    //decalre false, status false = startscreen
    //declare true, status true = 출동 중
  };
  constructor() {
    super();
    Socket.on("connect", () => {
      console.log("connection server");
    });
  }

  componentDidMount() {
    this.requestLocationPermission();

    ///////////////////////////////////////////////////////
    //해야할 부분
    //경찰이 출동을 시작하면 연결되고 출동 중으로 변환
    Socket.on("SENDPOLICEINFO", () => {
      this.setState({
        declare: true,
        status: true
      });
    });
  }

  componentDidUpdate() {
    //신고 확인 여부에 대해 신고가 확인되었을 때, 웹으로 신고 확인을 전송 후 화면 전환
    EventBus.getInstance().addListener(
      "GrantDeclare",
      (this.listener = async () => {
        await Socket.emit("GRANT_CALL", { data: "신고 확인!!" });
        await console.log("Grant Emit");
        await this.setState({
          declare: true,
          status: false
        });
      })
    );

    //신고가 승인되어 신고접수, 출동으로 화면 전환 후, 신고 취소를 클릭할 경우
    //StartScreen으로 화면 전환
    //웹에 상태 전송, 모든 것을 완료할 필요 있음
    EventBus.getInstance().addListener(
      "CancleDeclare_Home",
      (this.listener = async () => {
        this.setState({
          declare: false,
          status: false
        });
      })
    );
  }

  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.listener);
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

  render() {
    if (this.state.declare === true && this.state.initialPosition) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <MainHeader status={this.state.status} />
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
          {this.state.status ? (
            <Floating status={this.state.status} />
          ) : (
            <Floating status={this.state.status} />
          )}
        </View>
      );
    } else if (this.state.declare === true && !this.state.initialPosition) {
      return <Loading />;
    } else {
      return <StartingScreen />;
    }
  }
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 24
  },
  header: {
    position: "absolute",
    top: "7%",
    left: "5%",
    width: width * 0.9,
    minHeight: 100,
    zIndex: 1
  },
  main: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    flex: 1
  },
  Floatingcontainer: {
    ...StyleSheet.absoluteFillObject
  }
});
