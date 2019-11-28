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
import moment from "moment";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const headerHorizontalpadding = width / 4;

export default class MainHeader extends React.Component {
  state = {
    now: moment().format("YYYY/MM/DD h:mma")
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({
        now: moment().format("YYYY/MM/DD h:mma")
      });
    }, 60000);
  }
  componentWillUnmount() {
    clearInterval(this.state.now);
  }
  render() {
    return (
      <View style={styles.headerContentContainer}>
        <View style={styles.headerContentDate}>
          <Text style={styles.headerContentDateText}>{this.state.now}</Text>
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
