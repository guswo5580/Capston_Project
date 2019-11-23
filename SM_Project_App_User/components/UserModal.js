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
import Modal, { ModalContent } from "react-native-modals";

import Color from "../constants/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class SelectModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.userModal === true) {
      return (
        <ModalContent style={styles.modalContainer}>
          <View style={{ flex: 4 }}>
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
                  <Text style={styles.TextInfo}>유승훈</Text>
                </View>
                <View style={styles.repeatContent}>
                  <Text style={styles.TextTitle}>나이</Text>
                  <Text style={styles.TextInfo}>27 (19931027)</Text>
                </View>
                <View style={styles.repeatContent}>
                  <Text style={styles.TextTitle}>혈액형</Text>
                  <Text style={styles.TextInfo}>O형(RH+)</Text>
                </View>
                <View style={styles.repeatContent}>
                  <Text style={styles.TextTitle}>정보</Text>
                  <Text style={styles.TextInfo}>
                    조선실세 사건 증인 보호 중
                  </Text>
                </View>
                <View style={styles.repeatContentLast}>
                  <Text style={styles.TextTitleLast}>현재 심장박동</Text>
                  <Text style={styles.TextInfoLast}>보통(87bpm)</Text>
                </View>
              </View>
            </View>
            <View style={styles.modalSub}>
              <View style={styles.repeatContentSub}>
                <Text style={styles.TextTitleSub}>이름</Text>
                <Text style={styles.TextInfoSub}>유승훈</Text>
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
          </View>
        </ModalContent>
      );
    } else if (this.props.finishModal === true) {
      return (
        <ModalContent style={styles.finishModal}>
          <View style={styles.finishModalContent}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>유승훈(27세, 남)</Text>
              <Text>신고자 사건의</Text>
            </Text>
            <Text>완료 알림을 보냈습니다</Text>
          </View>
        </ModalContent>
      );
    } else {
      return (
        <ModalContent style={{ display: "none" }}>
          <View>
            <Text>뻐큐</Text>
          </View>
        </ModalContent>
      );
    }
  }
}

SelectModal.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  modalContainer: {
    width: width * 0.85,
    height: height * 0.43 - 30,
    paddingBottom: -10
  },
  modalMain: {
    flex: 5,
    flexDirection: "row",
    maxHeight: height * 0.21,
    borderBottomColor: Color.lightgray,
    borderBottomWidth: 2
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
  repeatContentLast: {
    flex: 4,
    flexDirection: "row",
    maxHeight: 20,
    marginTop: 20
  },
  TextTitleLast: {
    flex: 2,
    fontSize: 12,
    fontWeight: "bold"
  },
  TextInfoLast: {
    flex: 2,
    fontSize: 12
  },

  modalSub: {
    flex: 1,
    paddingTop: 10,
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
  ///////////////////////////////////////////////////////////////
  finishModal: {
    width: width * 0.85,
    height: height * 0.2
  },
  finishModalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
