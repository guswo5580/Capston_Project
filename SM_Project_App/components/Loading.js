import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Color from "../constants/Colors";

export default class Loading extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={Color.mainColor} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
