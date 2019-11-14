import React from "react";
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
  ModalTitle,
  ModalContent,
  ModalFooter,
  SlideAnimation
} from "react-native-modals";

import { FloatingAction } from "react-native-floating-action";
import Color from "../constants/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class FloatingandModal extends React.Component {
  state = {
    slideAnimationModal: false,
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
          modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        >
          <ModalContent style={styles.modalContainer}>
            <View style={styles.modalMain}>
              <View style={styles.modalImage}>
                <Image
                  source={
                    __DEV__
                      ? require("../assets/images/example.png")
                      : require("../assets/images/example.png")
                  }
                  style={styles.userImage}
                />
              </View>
              <View style={styles.modalText}>
                <View style={styles.repeatContent}>
                  <Text style={styles.TextTitle}>이름</Text>
                  <Text style={styles.TextInfo}>조현재</Text>
                </View>
                <View style={styles.repeatContent}>
                  <Text style={styles.TextTitle}>나이</Text>
                  <Text style={styles.TextInfo}>26세, 1994년 03월 08일</Text>
                </View>
                <View style={styles.repeatContent}>
                  <Text style={styles.TextTitle}>혈액형</Text>
                  <Text style={styles.TextInfo}>B형(RH+)</Text>
                </View>
                <View style={styles.repeatContent}>
                  <Text style={styles.TextTitle}>정보</Text>
                  <Text style={styles.TextInfo}>캡스톤 개발 고통 중</Text>
                </View>
                <View style={styles.repeatContentLast}>
                  <Text style={styles.TextTitleLast}>현재 심장박동</Text>
                  <Text style={styles.TextInfoLast}>보통(164bpm)</Text>
                </View>
              </View>
            </View>

            <View style={styles.modalSub}>
              <View style={styles.repeatContentSub}>
                <Text style={styles.TextTitleSub}>이름</Text>
                <Text style={styles.TextInfoSub}>조현재</Text>
              </View>
              <View style={styles.repeatContentSub}>
                <Text style={styles.TextTitleSub}>연락처</Text>
                <Text style={styles.TextInfoSub}>010-8941-5576</Text>
              </View>
              <View style={styles.repeatContentSub}>
                <Text style={styles.TextTitleSub}>주소</Text>
                <Text style={styles.TextInfoSub}>
                  서울특별시 광진구 군자동 116-9 103호
                </Text>
              </View>
            </View>
          </ModalContent>
          <ModalFooter>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => this.setState({ slideAnimationModal: false })}
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
  modalContainer: {
    width: width * 0.85,
    height: height * 0.4
  },
  modalMain: {
    flex: 5,
    flexDirection: "row",
    maxHeight: height / 5,
    paddingBottom: 10,
    borderBottomColor: Color.lightgray,
    borderBottomWidth: 2
  },
  modalImage: {
    flex: 2,
    resizeMode: "contain"
  },
  modalText: {
    flex: 3
  },
  repeatContent: {
    flex: 4,
    flexDirection: "row",
    maxHeight: 20
  },
  TextTitle: {
    flex: 1,
    fontSize: 12,
    paddingLeft: 10,
    fontWeight: "bold"
  },
  TextInfo: {
    flex: 3,
    fontSize: 12
  },
  repeatContentLast: {
    flex: 4,
    flexDirection: "row",
    maxHeight: 20,
    marginTop: 20
  },
  TextTitleLast: {
    flex: 2,
    fontSize: 12,
    paddingLeft: 10,
    fontWeight: "bold"
  },
  TextInfoLast: {
    flex: 2,
    fontSize: 12
  },
  ///////////////////////////////////////////////////////////////
  modalSub: {
    flex: 1,
    paddingTop: 13,
    maxHeight: height / 8
  },
  repeatContentSub: {
    flex: 5,
    flexDirection: "row",
    maxHeight: 20
  },
  TextTitleSub: {
    flex: 1,
    fontSize: 12,
    marginLeft: 0,
    fontWeight: "bold"
  },
  TextInfoSub: {
    flex: 4,
    fontSize: 12
  },
  ////////////////////////////////////////////////
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
