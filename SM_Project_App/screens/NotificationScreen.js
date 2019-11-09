import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Opening,
  Notification,
  Cancle
} from '../components/NotificationExample';

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerMain}>알림</Text>
        </View>
      </View>
      <View style={styles.main}>
        <Opening />
        <Notification />
        <Cancle />
      </View>
    </View>
  );
}

NotificationScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    paddingTop: 22
  },
  header: {
    flex: 1
  },
  main: {
    flex: 9
  },
  headerContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  headerMain: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold'
  }
});
