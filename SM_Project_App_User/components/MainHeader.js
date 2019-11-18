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
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.status) {
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
    } else {
      return (
        <View
          style={{
            flex: 6,
            paddingHorizontal: headerHorizontalpadding,
            paddingVertical: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            backgroundColor: Color.Deepgray
          }}
        >
          <View style={styles.headerContentDate}>
            <Text style={styles.headerContentDateText}>2019/11/09/18:29</Text>
          </View>
          <View style={styles.headerContentMain}>
            <Text style={styles.headerContentMainText}>신고 접수 중</Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  headerContentContainer: {
    flex: 6,
    paddingHorizontal: headerHorizontalpadding,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.mainColor,
    borderRadius: 50
  },
  headerContentDate: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5
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
    fontSize: 30,
    fontWeight: "bold",
    color: "white"
  }
});
