import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

//////Import socket/////
window.navigator.userAgent = "react-native";
import io from "socket.io-client/dist/socket.io";

//////Import EventBus//////
import EventBus from "react-native-event-bus";
import * as Permissions from "expo-permissions";
import Floating from "../components/Floating";
import StartingScreen from "../components/StartScreen";
import MainHeader from "../components/MainHeader";
import Loading from "../components/Loading";
import CancleModal from "../components/CancleModal";
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

export default class HomeScreen extends React.Component {
  state = {
    declare: false,
    cancle: false,
    marker: {
      name: "유승훈",
      latitude: "37.550378",
      longitude: "127.073.192"
    }
  };

  componentDidMount() {
    this.requestLocationPermission();

    //출동 접수 이벤트를 받아, 메인 HomeScreen을 렌더링
    EventBus.getInstance().addListener(
      "ShowMainPage",
      (this.listener = data => {
        this.setState({
          declare: true
        });
      })
    );

    //신고자가 출동 중 상태에서 신고를 취소할 경우 실행
    EventBus.getInstance().addListener(
      "BackToStartScreen",
      (this.listener = data => {
        this.setState({
          declare: false
        });
      })
    );

    //사건 완료 이벤트를 받아, 전체 정보를 초기화하고 StartScreen을 렌더링
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
            >
              <Marker
                title="유승훈"
                coordinate={{ latitude: 37.550378, longitude: 127.073192 }}
              ></Marker>
            </MapView>
          </View>

          <Floating />
          {this.state.cancle ? <CancleModal /> : null}
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
