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
import Modal, { ModalContent } from "react-native-modals";
import Color from "../constants/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const headerHorizontalpadding = width / 5;

export default class UserHeader extends React.Component {
  render() {
    return (
      <View style={styles.headerContentContainer}>
        <View style={styles.headerContentMain}>
          <Text style={styles.headerContentMainText}>
            서울 광진 경찰서 관할
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContentContainer: {
    flex: 1,
    paddingHorizontal: headerHorizontalpadding,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  headerContentMain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headerContentMainText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black"
  }
});
