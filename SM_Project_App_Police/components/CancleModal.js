import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Dimensions
} from "react-native";
import Modal, { ModalContent, SlideAnimation } from "react-native-modals";

//////Import EventBus//////
import EventBus from "react-native-event-bus";

import Color from "../constants/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

//사용자의 신고과 확인되었을 때, 경찰 출동 신호를 전달받는 컴포넌트
export default class CancleModal extends React.Component {
  constructor() {
    super();
  }
  state = {
    slideAnimationModal: true
  };
  render() {
    return (
      <Modal
        onDismiss={async () => {
          await this.setState({
            slideAnimationModal: false
          });
          //StartScreen에 출동 접수 신호 전송
          await EventBus.getInstance().fireEvent("BackToStartScreen");
        }}
        swipeDirection="down"
        onSwipeOut={async () => {
          await this.setState({
            slideAnimationModal: false
          });
          await EventBus.getInstance().fireEvent("BackToStartScreen", {
            emit: true
          });
        }}
        visible={this.state.slideAnimationModal}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        <ModalContent style={styles.finishModal}>
          <View style={styles.finishModalContent}>
            <Text>
              <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                유승훈(27세, 남)
              </Text>
              <Text style={{ fontSize: 15 }}>
                신고자의 신고가 취소 되었습니다.
              </Text>
            </Text>
          </View>
        </ModalContent>
      </Modal>
    );
  }
}

CancleModal.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  finishModal: {
    width: width * 0.85,
    height: height * 0.15
  },
  finishModalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
