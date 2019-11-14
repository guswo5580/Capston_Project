import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Modal, {
  ModalContent,
  ModalFooter,
  SlideAnimation
} from "react-native-modals";

import { FloatingAction } from "react-native-floating-action";
import Color from "../constants/Colors";
import SelectModal from "./UserModal";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class FloatingandModal extends React.Component {
  state = {
    slideAnimationModal: false,
    userModal: false,
    finishModal: false,
    actions: [
      {
        text: "신고자 전화",
        icon: require("../assets/images/FloatingIcon/Call.png"),
        name: "call",
        textColor: "white",
        color: "white",
        transparent: true,
        textBackground: "transparent",
        textElevation: 0,
        margin: 4,
        buttonSize: 50,
        position: 1
      },
      {
        text: "신고자 정보 확인",
        icon: require("../assets/images/FloatingIcon/User.png"),
        name: "신고자 정보 확인",
        textColor: "white",
        color: "white",
        transparent: true,
        textBackground: "transparent",
        textElevation: 0,
        margin: 4,
        buttonSize: 50,
        position: 2
      },
      {
        text: "최단거리 검색",
        icon: require("../assets/images/FloatingIcon/Direction.png"),
        name: "bt_room",
        textColor: "white",
        color: "white",
        transparent: true,
        textBackground: "transparent",
        textElevation: 0,
        margin: 4,
        buttonSize: 50,
        position: 3
      },
      {
        text: "사건 완료",
        icon: require("../assets/images/FloatingIcon/Finish.png"),
        name: "사건 완료",
        textColor: "white",
        color: "white",
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
          color="rgba(0, 0, 0, 0.5)"
          overlayColor="rgba(0, 0, 0, 0.5)"
          onPressItem={text => {
            if (text === "신고자 정보 확인") {
              this.setState({
                slideAnimationModal: true,
                userModal: true
              });
            } else if (text === "사건 완료") {
              this.setState({
                slideAnimationModal: true,
                finishModal: true
              });
            } else {
              Alert.alert("Icon pressed", `the icon ${text} was pressed`);
            }
          }}
        />
        <Modal
          onDismiss={() => {
            if (this.state.userModal === true) {
              this.setState({
                slideAnimationModal: false,
                userModal: false
              });
            } else {
              this.setState({
                slideAnimationModal: false,
                finishModal: false
              });
            }
          }}
          onTouchOutside={() => {
            if (this.state.userModal === true) {
              this.setState({
                slideAnimationModal: false,
                userModal: false
              });
            } else {
              this.setState({
                slideAnimationModal: false,
                finishModal: false
              });
            }
          }}
          swipeDirection="down"
          onSwipeOut={() => {
            if (this.state.userModal === true) {
              this.setState({
                slideAnimationModal: false,
                userModal: false
              });
            } else {
              this.setState({
                slideAnimationModal: false,
                finishModal: false
              });
            }
          }}
          visible={this.state.slideAnimationModal}
          modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        >
          <SelectModal
            userModal={this.state.userModal}
            finishModal={this.state.finishModal}
          />
          <ModalFooter>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                if (this.state.userModal === true) {
                  this.setState({
                    slideAnimationModal: false,
                    userModal: false
                    // finishModal: false
                  });
                } else {
                  this.setState({
                    slideAnimationModal: false,
                    finishModal: false
                  });
                }
              }}
            >
              <Text style={styles.closeBtnText}>닫기</Text>
            </TouchableOpacity>
          </ModalFooter>
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

  closeBtn: {
    width: width * 0.85,
    backgroundColor: Color.lightgray,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -15,
    minHeight: 50
  },
  closeBtnText: {
    fontSize: 19,
    color: "white"
  }
});

FloatingAction.propTypes = {
  floatingIcon: PropTypes.any
};
