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

// const headerHorizontalpadding = width / 4

export default class HomeScreen extends React.Component {
  state = {
    declare: false, //false = 신고가 들어가기 전, true는 신고가 들어간 후 모달 화면
    status: true //false = 신고 접수 중, true = 출동 중
  };

  ////////////////////////////////////////////////////////////////////
  ////////소켓 통신으로 신호를 받으면 status를 true로 변경
  ///////////////////////////////////////////////////////////////////

  componentDidMount() {
    this.requestLocationPermission();
  }
  componentDidUpdate() {
    EventBus.getInstance().addListener(
      "GrantDeclare",
      (this.listener = data => {
        this.setState({
          declare: true
        });
      })
    );
    EventBus.getInstance().addListener(
      "CancleDeclare",
      (this.listener = data => {
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
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 6
    // },
    // shadowOpacity: 0.37,
    // shadowRadius: 7.49,
    // elevation: 1
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
