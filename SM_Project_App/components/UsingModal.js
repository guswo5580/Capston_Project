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
import Carousel from 'react-native-snap-carousel'
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation
} from 'react-native-modals'
import mainColor from '../constants/Colors'

const locations = require('../constants/locations.json')
const GOOGLE_MAP_KEY = 'AIzaSyDKQLsyN5E-Sj1bUOF0gX6Z7C58ezkEUxQ'
const width = Dimensions.get('window').width
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
    ],
    customBackgroundModal: false,
    defaultAnimationModal: false,
    swipeableModal: false,
    scaleAnimationModal: false,
    slideAnimationModal: false,
    bottomModalAndTitle: false,
    bottomModal: false
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
        <View style={styles.modalbutton}>
          <Button
            title=" Slide Animation"
            onPress={() => {
              this.setState({
                slideAnimationModal: true
              })
            }}
          />
        </View>

        <Modal
          onDismiss={() => {
            this.setState({ slideAnimationModal: false })
          }}
          onTouchOutside={() => {
            this.setState({ slideAnimationModal: false })
          }}
          swipeDirection="down"
          onSwipeOut={() => this.setState({ slideAnimationModal: false })}
          visible={this.state.slideAnimationModal}
          modalTitle={
            <ModalTitle title="Modal - Slide Animation" hasTitleBar={false} />
          }
          modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>
          <ModalContent>
            <Text>Slide Animation</Text>
          </ModalContent>
        </Modal>
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
  modalbutton: {
    position: 'absolute',
    bottom: 0,
    // left: 40,
    width: width
    // height: 100
  },
  dialogContentView: {
    paddingLeft: 18,
    paddingRight: 18
  },
  navigationBar: {
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 0.5,
    backgroundColor: '#ffffff'
  },
  navigationTitle: {
    padding: 10
  },
  navigationButton: {
    padding: 10
  },
  navigationLeftButton: {
    paddingLeft: 20,
    paddingRight: 40
  },
  navigator: {
    flex: 1
    // backgroundColor: '#000000',
  },
  customBackgroundModal: {
    opacity: 0.5,
    backgroundColor: '#000'
  }
})
