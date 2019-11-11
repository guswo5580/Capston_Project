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
import * as Permissions from 'expo-permissions'
import { FloatingAction } from 'react-native-floating-action'
import Property from '../components/Property'

const locations = require('../constants/locations.json')
const GOOGLE_MAP_KEY = 'AIzaSyDKQLsyN5E-Sj1bUOF0gX6Z7C58ezkEUxQ'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
// const headerHorizontalpadding = width / 4

export default class HomeScreen extends React.Component {
  state = {
    actions: [
      {
        text: 'Accessibility',
        icon: require('../assets/images/ic_accessibility_white.png'),
        name: 'bt_accessibility',
        position: 2
      },
      {
        text: 'Language',
        icon: require('../assets/images/ic_language_white.png'),
        name: 'bt_language',
        position: 1
      },
      {
        text: 'Location',
        icon: require('../assets/images/ic_room_white.png'),
        name: 'bt_room',
        position: 3
      },
      {
        text: 'Video',
        icon: require('../assets/images/ic_videocam_white.png'),
        name: 'bt_videocam',
        position: 4
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
        <View style={styles.container}>
          <Property
            propertyName="overlayColor"
            propertyValue="rgba(255, 255, 255, 1)"
            defaultValue="rgba(68, 68, 68, 0.6)"
          />
          <FloatingAction
            actions={this.state.actions}
            overlayColor="rgba(255, 255, 255, 1)"
            onPressItem={name => {
              Alert.alert('Icon pressed', `the icon ${name} was pressed`)
            }}
          />
        </View>
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
  }
})
