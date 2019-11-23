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

import EventBus from "react-native-event-bus";
import { FloatingAction } from "react-native-floating-action";
import Color from "../constants/Colors";
import SelectModal from "./UserModal";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class FloatingandModal extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    slideAnimationModal: false,
    actions1: [
      {
        text: "신고 취소",
        icon: require("../assets/images/FloatingIcon/cancle.png"),
        name: "cancle",
        textColor: "white",
        color: "white",
        transparent: true,
        textBackground: "transparent",
        textElevation: 0,
        margin: 0,
        buttonSize: 55,
        position: 1
      }
    ],
    actions2: [
      {
        text: "담당자와 전화",
        icon: require("../assets/images/FloatingIcon/Call.png"),
        name: "call",
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
        text: "담당자 정보 확인",
        icon: require("../assets/images/FloatingIcon/confirm.png"),
        name: "confirm",
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
        text: "신고 취소",
        icon: require("../assets/images/FloatingIcon/cancle.png"),
        name: "cancle",
        textColor: "white",
        color: "white",
        transparent: true,
        textBackground: "transparent",
        textElevation: 0,
        margin: 0,
        buttonSize: 55,
        position: 3
      }
    ]
  };

  render() {
    if (this.props.status) {
      return (
        <View style={styles.Floatingcontainer}>
          <FloatingAction
            actions={this.state.actions2}
            color="white"
            overlayColor="rgba(0, 0, 0, 0.5)"
            iconWidth={20}
            iconHeight={20}
            iconColor={Color.Deepgray}
            actionsPaddingTopBottom={2}
            distanceToEdge={20}
            showBackground={true}
            onPressItem={text => {
              if (text === "confirm") {
                this.setState({
                  slideAnimationModal: true
                });
              } else if (text === "cancle") {
                EventBus.getInstance().fireEvent("CancleDeclare_Home", {
                  declare: false,
                  status: false
                });
              } else {
                Alert.alert("Icon pressed", `the icon ${text} was pressed`);
              }
            }}
          />
          <Modal
            onDismiss={() => {
              this.setState({
                slideAnimationModal: false
              });
            }}
            onTouchOutside={() => {
              this.setState({
                slideAnimationModal: false
              });
            }}
            swipeDirection="down"
            onSwipeOut={() => {
              this.setState({
                slideAnimationModal: false
              });
            }}
            visible={this.state.slideAnimationModal}
            modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
          >
            <ModalContent style={styles.modalContainer}>
              <View style={{ flex: 4 }}>
                <View style={styles.modalMain}>
                  <View style={styles.modalImage}>
                    <Image
                      source={
                        __DEV__
                          ? require("../assets/images/profile.png")
                          : require("../assets/images/profile.png")
                      }
                      style={styles.userImage}
                    />
                  </View>
                  <View style={styles.modalText}>
                    <View style={styles.repeatContent}>
                      <Text style={styles.TextTitle}>이름</Text>
                      <Text style={styles.TextInfo}>박원형(남)</Text>
                    </View>
                    <View style={styles.repeatContent}>
                      <Text style={styles.TextTitle}>소속</Text>
                      <Text style={styles.TextInfo}>둔춘 파출소</Text>
                    </View>
                    <View style={styles.repeatContent}>
                      <Text style={styles.TextTitle}>계급</Text>
                      <Text style={styles.TextInfo}>경위</Text>
                    </View>
                    <View style={styles.ContentMessage}>
                      <Text style={styles.Message}>약 3분 뒤(235m) 이내</Text>
                      <Text style={styles.Message}>현장 도착 예정입니다.</Text>
                    </View>
                  </View>
                </View>
              </View>
            </ModalContent>
            <ModalFooter>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => {
                  this.setState({
                    slideAnimationModal: false
                  });
                }}
              >
                <Text style={styles.closeBtnText}>닫기</Text>
              </TouchableOpacity>
            </ModalFooter>
          </Modal>
        </View>
      );
    } else {
      return (
        <View style={styles.Floatingcontainer}>
          <FloatingAction
            actions={this.state.actions1}
            color="white"
            overlayColor="rgba(0, 0, 0, 0.5)"
            iconWidth={20}
            iconHeight={20}
            iconColor={Color.Deepgray}
            actionsPaddingTopBottom={2}
            distanceToEdge={20}
            onPressItem={text => {
              EventBus.getInstance().fireEvent("CancleDeclare_Home", {
                declare: false,
                status: false
              });
            }}
          />
        </View>
      );
    }
  }
}

FloatingandModal.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  Floatingcontainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1
  },
  modalContainer: {
    width: width * 0.85,
    height: height * 0.3 - 40
  },
  modalMain: {
    flex: 5,
    flexDirection: "row",
    maxHeight: height * 0.21
  },
  modalImage: {
    flex: 2,
    resizeMode: "contain"
  },
  modalText: {
    flex: 3,
    marginLeft: 0
  },
  repeatContent: {
    flex: 4,
    flexDirection: "row",
    maxHeight: 20
  },
  TextTitle: {
    flex: 1,
    fontSize: 12,
    fontWeight: "bold"
  },
  TextInfo: {
    flex: 3,
    fontSize: 12
  },
  ContentMessage: {
    flex: 1,
    marginTop: 30
  },
  Message: {
    fontSize: 14,
    fontWeight: "bold"
  },
  closeBtn: {
    width: width * 0.85,
    backgroundColor: Color.lightgray,
    justifyContent: "center",
    alignItems: "center",
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
