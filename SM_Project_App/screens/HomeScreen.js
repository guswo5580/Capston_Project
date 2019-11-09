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
import { MapView } from 'expo';
import { Bubbles } from 'react-native-loader';
import mainColor from '../constants/Colors';

const headerHorizontalpadding = Dimensions.get('window').width / 4;

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContentContainer}>
          <View style={styles.headerContentDate}>
            <Text style={styles.headerContentDateText}>2019/11/09/18:29</Text>
          </View>
          <View style={styles.headerContentMain}>
            <Text style={styles.headerContentMainText}>출동 대기중</Text>
          </View>
          <View style={styles.headerContentFooter}>
            <Bubbles size={5} color="#FFF" />
          </View>
        </View>
      </View>
      <View style={styles.main}>
        {/* <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        /> */}
      </View>
    </View>
  );
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
    flex: 2,
    padding: 20
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
});
