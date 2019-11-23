import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";
import Modal, {
  ModalContent,
  ModalFooter,
  SlideAnimation
} from "react-native-modals";
import EventBus from "react-native-event-bus";
import Color from "../constants/Colors";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class DeclareModal extends React.Component {
  notification = true;
  state = {
    slideAnimationModal: true,
    count: 15
  };
  //모달이 시작되면 15초의 카운트 다운 시작
  componentDidMount() {
    this.counter = setInterval(() => {
      this.setState({
        count: this.state.count - 1
      });
    }, 1000);
  }
  //카운트가 0이 되는 순간을 캐치
  async componentDidUpdate() {
    if (this.state.count === 0) {
      await clearInterval(this.counter);
      await this.setState({
        slideAnimationModal: false
      });
      //신고에 대한 사용자의 승인 이벤트를 HomeScreen으로 전송
      await EventBus.getInstance().fireEvent("GrantDeclare");
    }
  }
  //setInterval에 대한 저장소 초기화
  componentWillUnmount() {
    clearInterval(this.counter);
    this.notification = true;
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          //모달이 Dismiss 되었을 때는 사용자의 신고 취소 여부를 확인할 수 없으니 신호를 보내면 안됨
          onDismiss={() => {}}
          swipeDirection="down"
          onSwipeOut={async () => {
            await clearInterval(this.counter);
            await this.setState({
              slideAnimationModal: false
            });
            //사용자가 신고 확인 모달에 대해 신고 취소를 하였을 때, StartScreen을 통해 이벤트를 전송
            await EventBus.getInstance().fireEvent("CancleDeclare", {
              notification: this.notification
            });
          }}
          visible={this.state.slideAnimationModal}
          modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        >
          <ModalContent style={styles.modalContainer}>
            <View
              style={{
                flex: 3,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold"
                  }}
                >
                  증인 보호 프로그램을 시작합니다.
                </Text>
              </View>
              <Text
                style={{
                  flex: 1,
                  fontSize: 35,
                  fontWeight: "bold"
                }}
              >
                00:{this.state.count}
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: Color.lightgray
                    // marginTop: 10
                  }}
                >
                  응답이 없으면 자동으로 신고 처리가 됩니다.
                </Text>
              </View>
            </View>
          </ModalContent>
          <ModalFooter>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={async () => {
                await EventBus.getInstance().fireEvent("CancleDeclare", {
                  notification: this.notification
                });
                await clearInterval(this.counter);
                await this.setState({
                  slideAnimationModal: false
                });
              }}
            >
              <Text style={styles.closeBtnText}>신고 취소</Text>
            </TouchableOpacity>
          </ModalFooter>
        </Modal>
      </View>
    );
  }
}

DeclareModal.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },

  modalContainer: {
    width: width * 0.85,
    height: height * 0.43 - 150
  },
  closeBtn: {
    width: width * 0.85,
    backgroundColor: Color.lightgray,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50
  },
  closeBtnText: {
    fontSize: 16,
    color: "white"
  }
});
