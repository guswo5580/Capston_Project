import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  ScrollView
} from "react-native";
import Color from "../constants/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const headerHorizontalpadding = width / 4;

export default class MainHeader extends React.Component {
  render() {
    return (
      <View style={styles.headerContentContainer}>
        <View style={styles.headerContentDate}>
          <Text style={styles.headerContentDateText}>2019/11/09/18:29</Text>
        </View>
        <View style={styles.headerContentMain}>
          <Text style={styles.headerContentMainText}>출동 중</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContentContainer: {
    flex: 6,
    paddingHorizontal: headerHorizontalpadding,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  headerContentDate: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headerContentDateText: {
    fontSize: 13,
    color: "white"
  },
  headerContentMain: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  headerContentMainText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white"
  }
});
