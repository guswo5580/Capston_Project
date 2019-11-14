import React from "react";
import { Image, StyleSheet, Text, View, Button, Alert } from "react-native";
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation
} from "react-native-modals";

import { FloatingAction } from "react-native-floating-action";
import Color from "../constants/Colors";

export default class FloatingandModal extends React.Component {
  state = {
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
        icon: require("../assets/images/ic_accessibility_white.png"),
        name: "call",
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
        icon: require("../assets/images/ic_language_white.png"),
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

  render() {
    return (
      <View style={styles.Floatingcontainer}>
        <FloatingAction
          actions={this.state.actions}
          color="rgb(255,255,255)"
          icon="../assets/images/floating_btn.svg"
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
  }
}

FloatingandModal.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
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
    padding: 10,
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
