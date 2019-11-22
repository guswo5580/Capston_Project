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
  ModalButton,
  SlideAnimation
} from "react-native-modals";

//////Import EventBus//////
import EventBus from "react-native-event-bus";

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
    SendMessage: false,
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
        margin: 0,
        buttonSize: 55,
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
        margin: 0,
        buttonSize: 55,
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
        margin: 0,
        buttonSize: 55,
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
        margin: 0,
        buttonSize: 55,
        position: 4
      }
    ]
  };

  componentDidUpdate() {
    if (this.state.SendMessage === true) {
      EventBus.getInstance().fireEvent("BackToStartScreen", {
        declare: false
      });
    }
  }
  render() {
    return (
      <View style={styles.Floatingcontainer}>
        <FloatingAction
          actions={this.state.actions}
          color="white"
          overlayColor="rgba(0, 0, 0, 0.5)"
          iconWidth={20}
          iconHeight={20}
          iconColor={Color.Deepgray}
          actionsPaddingTopBottom={2}
          distanceToEdge={20}
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
          {this.state.userModal === true && this.state.finishModal === false ? (
            <ModalFooter>
              <TouchableOpacity
                style={styles.closeBtn1}
                onPress={async () => {
                  if (this.state.userModal === true) {
                    await this.setState({
                      slideAnimationModal: false,
                      userModal: false
                    });
                  } else {
                    await this.setState({
                      slideAnimationModal: false,
                      finishModal: false
                    });
                    await this.setState({
                      SendMessage: true
                    });
                  }
                }}
              >
                <Text style={styles.closeBtnText}>닫기</Text>
              </TouchableOpacity>
            </ModalFooter>
          ) : (
            <ModalFooter>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={async () => {
                  if (this.state.userModal === true) {
                    await this.setState({
                      slideAnimationModal: false,
                      userModal: false
                    });
                  } else {
                    await this.setState({
                      slideAnimationModal: false,
                      finishModal: false
                    });
                    await this.setState({
                      SendMessage: true
                    });
                  }
                }}
              >
                <Text style={styles.closeBtnText}>닫기</Text>
              </TouchableOpacity>
            </ModalFooter>
          )}
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
  closeBtn1: {
    width: width * 0.85,
    backgroundColor: Color.lightgray,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
    marginTop: -30
  },
  closeBtnText: {
    fontSize: 19,
    color: "white"
  },
  closeBtn: {
    width: width * 0.85,
    backgroundColor: Color.lightgray,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50
  }
});

FloatingAction.propTypes = {
  floatingIcon: PropTypes.any
};
