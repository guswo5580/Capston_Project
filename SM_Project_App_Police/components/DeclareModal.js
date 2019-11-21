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
  ModalContent,
  ModalFooter,
  SlideAnimation
} from "react-native-modals";

import Color from "../constants/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class DeclareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { slideAnimationModal: true };
  }
  render() {
    if (this.props.modal === true) {
      return (
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
            <View style={styles.modalHeader}>
              <View style={{ paddingBottom: 5 }}>
                <Text style={{ textAlign: "center" }}>
                  <Text style={styles.modalHeaderMain}>신고자와의 거리</Text>
                  {"\u00A0"}
                  <Text style={styles.modalHeaderDistance}>294m</Text>
                </Text>
              </View>
              <Text style={styles.modalHeaderSub}>
                둔촌동역 근방 (성내 3동 관할)
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.modalMain}>
                <View style={styles.modalImage}>
                  <Image
                    source={
                      __DEV__
                        ? require("../assets/images/example2.png")
                        : require("../assets/images/example2.png")
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
      );
    }
  }
}

DeclareModal.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  modalContainer: {
    width: width * 0.85,
    height: height * 0.4 - 30
  },
  modalHeader: {
    maxHeight: height * 0.11,
    textAlign: "center",
    marginTop: -10,
    borderBottomWidth: 2,
    borderBottomColor: Color.lightgray,
    paddingBottom: 10
  },
  modalHeaderMain: {
    fontSize: 12,
    fontWeight: "bold"
  },
  modalHeaderDistance: {
    fontSize: 23,
    fontWeight: "bold"
  },
  modalHeaderSub: {
    fontSize: 11,
    color: Color.Deepgray,
    textAlign: "center"
  },
  modalMain: {
    flex: 5,
    flexDirection: "row",
    marginTop: 15
  },

  modalImage: {
    flex: 2,
    resizeMode: "contain"
  },
  modalText: {
    flex: 3,
    marginLeft: -15
  },
  repeatContent: {
    flex: 4,
    flexDirection: "row",
    maxHeight: 22
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
  repeatContentLast: {
    flex: 5,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  TextTitleLast: {
    flex: 2,
    fontSize: 12,
    fontWeight: "bold"
  },
  TextInfoLast: {
    flex: 3,
    fontSize: 12
  },
  closeBtn: {
    width: width * 0.85,
    backgroundColor: Color.mainColor,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50
  },
  closeBtnText: {
    fontSize: 19,
    color: "white"
  }
});
