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
//////io 위치는 상황에 따라 변경 가능/////
window.navigator.userAgent = "react-native";
import io from "socket.io-client/dist/socket.io";

import EventBus from "react-native-event-bus";
import * as Permissions from "expo-permissions";
import UserHeader from "./UserHeader";
import DeclareModal from "./DeclareModal";
import Color from "../constants/Colors";

const GOOGLE_MAP_KEY = "AIzaSyDKQLsyN5E-Sj1bUOF0gX6Z7C58ezkEUxQ";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class StartScreen extends React.Component {
  state = {
    notification: false //true = 신고 접수되어 모달 등장
  };
  constructor() {
    super();
    this.socket = io("http://192.168.35.68:7499", {
      timeout: 10000,
      jsonp: false,
      autoConnect: false,
      agent: "-",
      // path: "/", // Whatever your path is
      pfx: "-",
      // key: token, // Using token-based auth.
      // passphrase: cookie, // Using cookie auth.
      cert: "-",
      ca: "-",
      ciphers: "-",
      rejectUnauthorized: "-",
      perMessageDeflate: "-"
    });
    this.socket.on("POLICE_MESSAGE", () => {
      console.log("Socket");
      this.setState({
        Modal: true
      });
    });
  }

  ////////////////////////////////////////////////////////
  //라즈베리파이 소켓 통신을 통해 notification을 true로 변경
  ////////////////////////////////////////////////////////

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
    this.requestLocationPermission();
  }
  componentDidUpdate() {
    EventBus.getInstance().addListener(
      "CancleDeclare",
      (this.listener = data => {
        this.setState({
          notification: false
        });
      })
    );
  }
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
