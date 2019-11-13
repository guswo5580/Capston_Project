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

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class StartingScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.Text}>Starting Screen</Text>
      </View>
    )
  }
}

StartingScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  Text: {
    fontSize: 30
  }
})
