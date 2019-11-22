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
  componentDidMount() {
    this.counter = setInterval(() => {
      this.setState({
        count: this.state.count - 1
      });
    }, 1000);
  }
  async componentDidUpdate() {
    if (this.state.count === 0) {
      await clearInterval(this.counter);
      await this.setState({
        slideAnimationModal: false
      });
      EventBus.getInstance().fireEvent("GrantDeclare", {
        count: this.state.count
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.counter);
    this.notification = true;
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal
          onDismiss={() => {
            this.setState({
              slideAnimationModal: false
            });
            clearInterval(this.counter);
          }}
          swipeDirection="down"
          onSwipeOut={() => {
            clearInterval(this.counter);
            this.setState({
              slideAnimationModal: false
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
                    color: Color.lightgray,
                    marginTop: 10
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
                console.log("Click");
                await clearInterval(this.counter);
                await this.setState({
                  slideAnimationModal: false
                });
                EventBus.getInstance().fireEvent("CancleDeclare", {
                  notification: this.notification
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
    height: height * 0.43 - 120
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
