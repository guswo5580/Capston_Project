import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Circle
} from "react-native-maps";

//////Import socket/////
//////io 위치는 상황에 따라 변경 가능/////
window.navigator.userAgent = "react-native";
import io from "socket.io-client/dist/socket.io";

//////Import EventBus//////
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
    declare: false
  };

  componentDidMount() {
    this.requestLocationPermission();
    EventBus.getInstance().addListener(
      "ShowMainPage",
      (this.listener = data => {
        this.setState({
          declare: true
        });
      })
    );
    EventBus.getInstance().addListener(
      "BackToStartScreen",
      (this.listener = data => {
        this.setState({
          declare: false
        });
      })
    );
    EventBus.getInstance().addListener(
      "JOBS_DONE",
      (this.listener = data => {
        this.setState({
          declare: false
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
            <MainHeader />
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

          <Floating />
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
    backgroundColor: Color.mainColor,
    zIndex: 1,
    borderRadius: 50,
    minHeight: 100
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
