import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert,
  Platform
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Circle
} from "react-native-maps";
import * as Permissions from "expo-permissions";
import { FloatingAction } from "react-native-floating-action";
import StartingScreen from "../components/StartigScreen";
import MainHeader from "../components/MainHeader";
// import UserModal from '../components/UserModal'
import mainColor from "../constants/Colors";
import actionJson from "../constants/actions";
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation
} from "react-native-modals";

const GOOGLE_MAP_KEY = "AIzaSyDKQLsyN5E-Sj1bUOF0gX6Z7C58ezkEUxQ";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

// const headerHorizontalpadding = width / 4

export default class HomeScreen extends React.Component {
  state = {
    declare: true,
    slideAnimationModal: false,
    customBackgroundModal: false,
    defaultAnimationModal: false,
    swipeableModal: false,
    scaleAnimationModal: false,
    slideAnimationModal: false,
    bottomModalAndTitle: false,
    bottomModal: false,
    actions: [
      {
        text: "신고자 전화",
        icon: require("../assets/images/ic_language_white.png"),
        name: "bt_language",
        textColor: "white",
        transparent: true,
        textBackground: "transparent",
        textElevation: 0,
        margin: 4,
        buttonSize: 50,
        position: 1
      },
      {
        text: "신고자 정보 확인",
        icon: require("../assets/images/ic_accessibility_white.png"),
        name: "신고자 정보 확인",
        textColor: "white",
        transparent: true,
        textBackground: "transparent",
        textElevation: 0,
        margin: 4,
        buttonSize: 50,
        position: 2
      },
      {
        text: "최단거리 검색",
        icon: require("../assets/images/ic_room_white.png"),
        name: "bt_room",
        textColor: "white",
        transparent: true,
        textBackground: "transparent",
        textElevation: 0,
        margin: 4,
        buttonSize: 50,
        position: 3
      },
      {
        text: "사건 완료",
        icon: require("../assets/images/ic_videocam_white.png"),
        name: "bt_videocam",
        textColor: "white",
        transparent: true,
        textBackground: "transparent",
        textElevation: 0,
        margin: 4,
        buttonSize: 50,
        position: 4
      }
    ]
  };

  componentDidMount() {
    this.requestLocationPermission();
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
          latitudeDelta: 0.09,
          longitudeDelta: 0.035
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
          <View style={styles.Floatingcontainer}>
            {/* <Property
              propertyName="overlayColor"
              propertyValue="rgba(255, 255, 255, 1)"
              defaultValue="rgba(68, 68, 68, 0.6)"
            /> */}
            <FloatingAction
              actions={this.state.actions}
              overlayColor="rgba(0, 0, 0, 0.5)"
              onPressItem={text => {
                if (text === "신고자 정보 확인") {
                  this.setState({
                    slideAnimationModal: true
                  });
                } else {
                  Alert.alert("Icon pressed", `the icon ${text} was pressed`);
                }
              }}
            />
          </View>
          <Modal
            onDismiss={() => {
              this.setState({ slideAnimationModal: false });
            }}
            onTouchOutside={() => {
              this.setState({ slideAnimationModal: false });
            }}
            swipeDirection="down"
            onSwipeOut={() => this.setState({ slideAnimationModal: false })}
            visible={this.state.slideAnimationModal}
            modalTitle={
              <ModalTitle title="Modal - Slide Animation" hasTitleBar={false} />
            }
            modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
          >
            <ModalContent>
              <Text>Slide Animation</Text>
            </ModalContent>
          </Modal>
        </View>
      );
    } else if (this.state.declare === true && !this.state.initialPosition) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 50 }}>Loading....</Text>
        </View>
      );
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
    flex: 7,
    paddingTop: 22
  },
  header: {
    flex: 2,
    backgroundColor: mainColor.emergency
    // maxHeight: 150
  },
  main: {
    flex: 5
  },
  map: {
    flex: 1
  },
  Floatingcontainer: {
    ...StyleSheet.absoluteFillObject
  },
  dialogContentView: {
    paddingLeft: 18,
    paddingRight: 18
  },
  navigationBar: {
    borderBottomColor: "#b5b5b5",
    borderBottomWidth: 0.5,
    backgroundColor: "#ffffff"
  },
  navigationTitle: {
    padding: 10
  },
  navigationButton: {
    padding: 10
  },
  navigationLeftButton: {
    paddingLeft: 20,
    paddingRight: 40
  },
  navigator: {
    flex: 1
    // backgroundColor: '#000000',
  },
  customBackgroundModal: {
    opacity: 0.5,
    backgroundColor: "#000"
  }
});
