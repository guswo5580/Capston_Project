import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
console.ignoredYellowBox = ["Remote debugger"];
import { Platform, StatusBar, StyleSheet, View, YellowBox } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import io from "socket.io-client";

import AppNavigator from "./navigation/AppNavigator";

// console.disableYellowBox = true;
// YellowBox.ignoreWarnings(["Remote debugger"]);
YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // useEffect(() => {
  //   const socket = io("http://192.168.35.68:7499", {
  //     forceNew: true
  //   });
  //   socket.on("connect", () => console.log("Connection"));
  // });

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  // 로딩 데이터 설정
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/FloatingIcon/Call.png"),
      require("./assets/images/FloatingIcon/Direction.png"),
      require("./assets/images/FloatingIcon/Finish.png"),
      require("./assets/images/FloatingIcon/Plus.png"),
      require("./assets/images/FloatingIcon/User.png")
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // 폰트 설정
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
    })
  ]);
}

function handleLoadingError(error) {
  // 에러 처리
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
