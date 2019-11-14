import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import Color from "../constants/Colors";

export default function SettingsScreen() {
  const [isOnComplete, setisOnComplete] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerMain}>환경설정</Text>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.mainContainer}>
          <Text style={styles.mainTitle}>진동</Text>
          <View style={styles.mainFunction}>
            <ToggleSwitch
              isOn={isOnComplete}
              onColor="#EA2340"
              offColor="#D0D0D0"
              size="medium"
              onToggle={setisOnComplete}
            />
          </View>
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.mainTitle}>진동 패턴</Text>
          <Text style={styles.mainSub}>기본</Text>
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.mainTitle}>글자 크기</Text>
          <Text style={styles.mainSub}>15pt</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerbtn} onPress={() => {}}>
          <Text style={styles.BtnText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

SettingsScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    paddingTop: 22
  },
  header: {
    flex: 1
  },
  main: {
    flex: 8,
    padding: 20
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
  mainContainer: {
    flex: 2,
    flexDirection: "row",
    maxHeight: 40
  },
  mainTitle: {
    flex: 1,
    alignItems: "center",
    fontSize: 22,
    fontWeight: "bold"
  },
  mainFunction: {
    flex: 1,
    alignItems: "flex-end"
  },
  mainSub: {
    flex: 1,
    fontSize: 15,
    textAlign: "right",
    alignItems: "center"
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
