import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import { MapView, Permissions } from 'expo';
import { Bubbles } from 'react-native-loader';
import mainColor from '../constants/Colors';

const width = Dimensions.get('window').width;
const headerHorizontalpadding = width / 4;

export default function SettingsScreen() {
  return <MapView style={{ flex: 1 }}></MapView>;
}

SettingsScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    paddingTop: 22
  },
  header: {
    flex: 1,
    backgroundColor: mainColor.tintColor
  },
  main: {
    flex: 2
  },
  mapStyle: {
    width: Dimensions.get('window').width
  },
  // footer: {
  //   flex: 1,
  //   padding: 20,
  //   justifyContent: 'center'
  // },
  headerContentContainer: {
    flex: 6,
    paddingHorizontal: headerHorizontalpadding,
    paddingVertical: 10
  },
  headerContentDate: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContentDateText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold'
  },
  headerContentMain: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContentMainText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white'
  },
  headerContentFooter: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
  ///////////////////////////////////
});
