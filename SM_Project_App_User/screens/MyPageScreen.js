import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Color from "../constants/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function MyPageScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerMain}>내정보</Text>
          <Text style={styles.headerSub}>서울 강동 경찰서 관할</Text>
        </View>
      </View>

      <View style={styles.main}>
        <View style={styles.mainContainer}>
          <View style={styles.ImageContainer}>
            <Image
              source={
                __DEV__
                  ? require("../assets/images/User.png")
                  : require("../assets/images/User.png")
              }
              style={styles.userImage}
            />
          </View>
          <View style={styles.InfoContainer}>
            <View style={styles.InfoContent}>
              <Text style={styles.title}>이름</Text>
              <Text style={styles.Information}>유승훈(남)</Text>
            </View>
            <View style={styles.InfoContent}>
              <Text style={styles.title}>주소</Text>
              <Text style={styles.Information}>서울시 광진구 군자동</Text>
            </View>
            <View style={styles.InfoContent}>
              <Text style={styles.title}>상세주소</Text>
              <Text style={styles.Information}>116-9 103호</Text>
            </View>
            <View style={styles.InfoContent}>
              <Text style={styles.title}>설명</Text>
              <Text style={styles.Information}>캡스톤 고통 보호 중</Text>
            </View>
            <View style={styles.InfoContent}>
              <Text style={styles.title}>연락처</Text>
              <Text style={styles.Information}>010-8941-5576</Text>
            </View>
            <View style={styles.InfoContent}>
              <Text style={styles.title}>혈액형</Text>
              <Text style={styles.Information}>A(RH+)</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerbtn} onPress={() => {}}>
          <Text style={styles.BtnText}>내 정보 변경하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

MyPageScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    paddingTop: 22
  },
  header: {
    flex: 1,
    marginTop: 15
  },
  main: {
    flex: 8
  },
  footer: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  },
  headerContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    padding: 20
  },
  headerMain: {
    flex: 1,
    fontSize: 25,
    fontWeight: "bold"
  },
  headerSub: {
    fontSize: 19,
    fontWeight: "bold"
  },
  mainContainer: {
    flex: 3,
    flexDirection: "row"
  },
  ImageContainer: {
    flex: 1,
    overflow: "hidden",
    resizeMode: "contain",
    alignItems: "center",
    // position: "relative",
    // padding: 5,
    width: width / 5,
    height: height / 3.5,
    marginLeft: 10
  },
  InfoContainer: {
    flex: 2,
    paddingLeft: 10,
    paddingTop: 20
  },
  userImage: {
    resizeMode: "contain",
    marginTop: 15
  },
  InfoContent: {
    flex: 6,
    flexDirection: "row",
    maxHeight: 30,
    marginLeft: 15
  },
  title: {
    flex: 2,
    fontSize: 15,
    fontWeight: "bold"
  },
  Information: {
    flex: 4,
    fontSize: 15
  },
  footerbtn: {
    backgroundColor: Color.lightgray,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    height: 50
  },
  BtnText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  }
});
