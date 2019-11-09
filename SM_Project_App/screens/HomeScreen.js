import React, { useState, useEffect } from 'react';
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
// import { MapView, Permissions } from 'react-native-maps';
import MapView from 'react-native-maps';
import { Bubbles } from 'react-native-loader';
import mainColor from '../constants/Colors';

const width = Dimensions.get('window').width;
const headerHorizontalpadding = width / 4;

export default function SettingsScreen() {
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);

  // useEffect(() => {
  //   PermissionData;
  // });

  // async function PermissionData() {
  //   const status = await Permissions.getAsync(Permissions.LOCATION);
  //   if (status !== 'granted') {
  //     const response = await Permissions.askAsync(Permissions.LOCATION);
  //   }
  // }

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
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}></MapView>
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
    backgroundColor: mainColor.tintColor,
    maxHeight: 150
  },
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
  },
  main: {
    flex: 2,
    ...StyleSheet.absoluteFillObject,
    // height: 400,
    marginTop: 172,
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
