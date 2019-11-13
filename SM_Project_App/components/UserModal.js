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

export default class UserModal extends React.Component {
  state = {
    customBackgroundModal: false,
    defaultAnimationModal: false,
    swipeableModal: false,
    scaleAnimationModal: false,
    slideAnimationModal: false,
    bottomModalAndTitle: false,
    bottomModal: false
  }
  componentDidMount() {
    console.log(this.props.slideAnimationModal)
  }
  render() {
    return (
      <View>
        {/* <View style={styles.modalbutton}>
            <Button
              title=" Slide Animation"
              onPress={() => {
                this.setState({
                  slideAnimationModal: true
                })
              }}
            />
          </View> */}
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

const styles = StyleSheet.create({
  // modalbutton: {
  //   position: 'absolute',
  //   bottom: 0,
  //   // left: 40,
  //   width: width
  //   // height: 100
  // },
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
