import React, { useState, useEffect } from "react";
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
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Circle
} from "react-native-maps";
import * as Permissions from "expo-permissions";
import Carousel from "react-native-snap-carousel";
import mainColor from "../../constants/Colors";

const locations = require("../constants/locations.json");
const GOOGLE_MAP_KEY = "AIzaSyDKQLsyN5E-Sj1bUOF0gX6Z7C58ezkEUxQ";
// const width = Dimensions.get('window').width
// const height = Dimensions.get('window').height
// const headerHorizontalpadding = width / 4

export default class HomeScreen extends React.Component {
  state = {
    markers: [],
    coordinates: [
      {
        name: "예시 1",
        latitude: 37.7946386,
        longitude: -122.421646,
        img: require("../assets/images/robot-dev.png")
      },
      {
        name: "예시 2",
        latitude: 37.7665248,
        longitude: -122.4165628,
        img: require("../assets/images/robot-dev.png")
      },
      {
        name: "예시 3",
        latitude: 37.7834153,
        longitude: -122.4527787,
        img: require("../assets/images/robot-dev.png")
      },
      {
        name: "예시 4",
        latitude: 37.7948105,
        longitude: -122.4596065,
        img: require("../assets/images/robot-dev.png")
      }
    ]
  };
  componentDidMount() {
    this.requestLocationPermission();
  }
  showing = () => {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  };

  requestLocationPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status !== "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }
    this.locateCurrentPosition();
  };

  locateCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position));

        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035
        };

        this.setState({ initialPosition });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );
  };
  /////////////Carousel//////////////

  onCarouselItemChange = index => {
    let location = this.state.coordinates[index];

    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    });

    this.state.markers[index].showCallout();
  };
  onMarkerPressed = (location, index) => {
    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    });

    this._carousel.snapToItem(index);
  };
  _renderItem({ item, index }) {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Image source={item.img} style={styles.cardImage} />
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => (this._map = map)}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={this.state.initialPosition}
        >
          <Polygon
            coordinates={this.state.coordinates}
            fillColor={"rgba(100,100,200,0.3)"}
            strokeWidth={3}
          />
          <Circle
            center={{ latitude: 37.8025259, longitude: -122.4351431 }}
            radius={1000}
            fillColor={"rgba(200,300,200,0.5)"}
          />
          {this.state.coordinates.map((marker, index) => (
            <Marker
              key={marker.name}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
              ref={ref => (this.state.markers[index] = ref)}
              onPress={() => this.onMarkerPressed(marker, index)}
              // title={marker.name}
            >
              <Callout onPress={this.showing}>
                {/* <Image
                  style={{ resizeMode: 'contain' }}
                  source={require('../assets/images/robot-prod.png')}
                /> */}
                <Text>An Interesting City</Text>
                <Text>{marker.name}</Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.state.coordinates}
          renderItem={this._renderItem}
          containerCustomStyle={styles.carousel}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={300}
          onSnapToItem={index => this.onCarouselItemChange(index)}
          removeClippedSubviews={false}
        />
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  carousel: {
    position: "absolute",
    bottom: 0,
    marginBottom: 48
  },
  cardContainer: {
    backgroundColor: "rgba(0,0,0,0.6)",
    height: 200,
    width: 300,
    padding: 24,
    borderRadius: 24
  },
  cardImage: {
    height: 120,
    width: 300,
    bottom: 0,
    position: "absolute",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },
  cardTitle: {
    color: "white",
    fontSize: 22,
    alignSelf: "center"
  }
});
