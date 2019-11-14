import React from "react";
import { Platform, Image, Text, View } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import MyPageScreen from "../screens/MyPageScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NotificationScreen from "../screens/NotificationScreen";

import { Ionicons, Foundation } from "@expo/vector-icons";
import Color from "../constants/Colors";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarOptions: {
    style: {
      height: 65
    }
  },
  tabBarLabel: ({ focused }) =>
    focused ? (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 3
        }}
      >
        <Text style={{ color: Color.Deepgray }}>홈</Text>
      </View>
    ) : (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 3
        }}
      >
        <Text style={{ color: Color.lightgray }}>홈</Text>
      </View>
    ),
  tabBarIcon: ({ focused }) =>
    focused ? (
      <Image
        style={{ marginTop: 10 }}
        source={require("../assets/images/Navigation/home_active.png")}
      />
    ) : (
      <Image
        style={{ marginTop: 10 }}
        source={require("../assets/images/Navigation/home.png")}
      />
    )
};

HomeStack.path = "";

const NotificationStack = createStackNavigator(
  {
    Notification: NotificationScreen
  },
  config
);

NotificationStack.navigationOptions = {
  tabBarOptions: {
    style: {
      height: 65
    }
  },
  tabBarLabel: ({ focused }) =>
    focused ? (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 3
        }}
      >
        <Text style={{ color: Color.Deepgray }}>알림</Text>
      </View>
    ) : (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 3
        }}
      >
        <Text style={{ color: Color.lightgray }}>알림</Text>
      </View>
    ),
  tabBarIcon: ({ focused }) =>
    focused ? (
      <Image
        style={{ marginTop: 10 }}
        source={require("../assets/images/Navigation/notification_active.png")}
      />
    ) : (
      <Image
        style={{ marginTop: 10 }}
        source={require("../assets/images/Navigation/notification.png")}
      />
    )
};
NotificationStack.path = "";

const MypageStack = createStackNavigator(
  {
    MyPage: MyPageScreen
  },
  config
);

MypageStack.navigationOptions = {
  tabBarOptions: {
    style: {
      height: 65
    }
  },
  tabBarLabel: ({ focused }) =>
    focused ? (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 3
        }}
      >
        <Text style={{ color: Color.Deepgray }}>내정보</Text>
      </View>
    ) : (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 3
        }}
      >
        <Text style={{ color: Color.lightgray }}>내정보</Text>
      </View>
    ),
  tabBarIcon: ({ focused }) =>
    focused ? (
      <Image
        style={{ marginTop: 10 }}
        source={require("../assets/images/Navigation/mypage_active.png")}
      />
    ) : (
      <Image
        style={{ marginTop: 10 }}
        source={require("../assets/images/Navigation/mypage.png")}
      />
    )
};

MypageStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarOptions: {
    style: {
      height: 65
    }
  },
  tabBarLabel: ({ focused }) =>
    focused ? (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 3
        }}
      >
        <Text style={{ color: Color.Deepgray }}>설정</Text>
      </View>
    ) : (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 3
        }}
      >
        <Text style={{ color: Color.lightgray }}>설정</Text>
      </View>
    ),
  tabBarIcon: ({ focused }) =>
    focused ? (
      <Image
        style={{ marginTop: 10 }}
        source={require("../assets/images/Navigation/setting_active.png")}
      />
    ) : (
      <Image
        style={{ marginTop: 10 }}
        source={require("../assets/images/Navigation/setting.png")}
      />
    )
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  NotificationStack,
  MypageStack,
  SettingsStack
});

tabNavigator.path = "";

export default tabNavigator;
