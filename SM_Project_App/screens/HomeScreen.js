import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import MapView from 'react-native-maps'
import * as Permissions from 'expo-permissions'
// import Polyline from '@mapbox/polyline'
import { Bubbles } from 'react-native-loader'
import mainColor from '../constants/Colors'

const locations = require('../constants/locations.json')
const GOOGLE_MAP_KEY = 'AIzaSyAK7wVY4QNAmElV21G9QYHpvq6bzcuvdlY'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const headerHorizontalpadding = width / 4

export default class HomeScreen extends React.Component {
  state = {
    latitude: null,
    longitude: null
    // locations
  }

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        this.setState({ latitude, longitude }, () =>
          console.log('State : ', this.state)
        ),
      error => console.log('Error:', error)
    )

    // const {
    //   locations: [sampleLocation]
    // } = this.state

    // this.setState(
    //   {
    //     desLatitude: sampleLocation.coords.latitude,
    //     desLongitude: sampleLocation.coords.longitude
    //   },
    //   this.mergeCoords
    // ),
    //   error => console.log('Error : ', error)
  }

  //좌표로 거리 구하기
  // mergeCoords = () => {
  //   const { latitude, longitude, desLatitude, desLongitude } = this.state

  //   const hasStartAndEnd = latitude !== null && desLatitude !== null

  //   if (hasStartAndEnd) {
  //     const concatStart = `${latitude},${longitude}`
  //     const concatEnd = `${desLatitude},${desLongitude}`
  //     // this.getDirections(concatStart, concatEnd)
  //     console.log(concatStart)
  //     console.log(concatEnd)
  //   }
  // }
  // //경로 구하기
  // async getDirections(startLoc, desLoc) {
  //   try {
  //     const resp = await fetch(
  //       `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=${GOOGLE_MAP_KEY}`
  //     )
  //     console.log('resp Value', resp)
  //     const respJson = await resp.json()
  //     console.log('respJson Value', respJson)
  //     const points = Polyline.decode(
  //       respJson.routes[0].overview_polyline.points
  //     )
  //     const coords = points.map(point => {
  //       return {
  //         latitude: point[0],
  //         longitude: point[1]
  //       }
  //     })
  //     this.setState({ coords })
  //   } catch (error) {
  //     console.log('Error: ', error)
  //   }
  // }

  render() {
    const { latitude, longitude } = this.state
    if (latitude) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContentContainer}>
              <View style={styles.headerContentDate}>
                <Text style={styles.headerContentDateText}>
                  2019/11/09/18:29
                </Text>
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
              showsUserLocation
              style={styles.map}
              region={{
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0121
              }}></MapView>
          </View>
        </View>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    // paddingTop: 22
    backgroundColor: 'yellow'
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
    marginTop: 150,
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})
