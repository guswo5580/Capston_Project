import React, { useState, useEffect } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert,
  Platform
} from 'react-native'
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Circle
} from 'react-native-maps'
// import Geolocation from '@react-native-community/geolocation'
// import { request, PERMISSIONS } from 'react-native-permissions'
import * as Permissions from 'expo-permissions'
import Carousel from 'react-native-snap-carousel'
// import Polyline from '@mapbox/polyline'
import SlidingUpPanel from 'rn-sliding-up-panel'
// import { Bubbles } from 'react-native-loader'
import mainColor from '../constants/Colors'

const locations = require('../constants/locations.json')
const GOOGLE_MAP_KEY = 'AIzaSyDKQLsyN5E-Sj1bUOF0gX6Z7C58ezkEUxQ'
// const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
// const headerHorizontalpadding = width / 4

export default class HomeScreen extends React.Component {
  state = {
    markers: [],
    coordinates: [
      {
        name: '예시 1',
        latitude: 37.7946386,
        longitude: -122.421646,
        img: require('../assets/images/robot-dev.png')
      },
      {
        name: '예시 2',
        latitude: 37.7665248,
        longitude: -122.4165628,
        img: require('../assets/images/robot-dev.png')
      },
      {
        name: '예시 3',
        latitude: 37.7834153,
        longitude: -122.4527787,
        img: require('../assets/images/robot-dev.png')
      },
      {
        name: '예시 4',
        latitude: 37.7948105,
        longitude: -122.4596065,
        img: require('../assets/images/robot-dev.png')
      }
    ]
  }
  componentDidMount() {
    this.requestLocationPermission()
  }

  requestLocationPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    this.locateCurrentPosition()
  }

  locateCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position))

        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035
        }

        this.setState({ initialPosition })
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => (this._map = map)}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={this.state.initialPosition}></MapView>
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={{ top: height / 1.75, bottom: 120 }}
          animatedValue={this._draggedValue}
          showBackdrop={false}>
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Text style={{ color: '#FFF' }}>Bottom Sheet Peek</Text>
            </View>
            <View style={styles.container}>
              <Text>Bottom Sheet Content</Text>
            </View>
          </View>
        </SlidingUpPanel>
      </View>
    )
  }
}

HomeScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#f8f9fa',
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  panelHeader: {
    height: 120,
    backgroundColor: '#b197fc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  }
})
