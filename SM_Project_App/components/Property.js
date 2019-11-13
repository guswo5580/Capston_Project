import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const PropertyComponent = ({
  propertyName,
  propertyValue,
  defaultValue,
  actionLabel,
  verticalMargin,
  onActionPress
}) => (
  <View style={[styles.container, { marginVertical: verticalMargin }]}>
    {propertyName && (
      <Text style={styles.propertyName}>Property: {propertyName}</Text>
    )}
    {defaultValue && <Text style={styles.propertyType}>Default:</Text>}
    {defaultValue && (
      <Text
        style={styles.propertyValue}>{`${propertyName}: ${defaultValue}`}</Text>
    )}
    {propertyValue && (
      <Text style={[styles.propertyType, { marginTop: 10 }]}>Used:</Text>
    )}
    {propertyValue && (
      <Text
        style={
          styles.propertyValue
        }>{`${propertyName}: ${propertyValue}`}</Text>
    )}
    {actionLabel && (
      <TouchableOpacity onPress={onActionPress}>
        <Text style={styles.action}>{actionLabel}</Text>
      </TouchableOpacity>
    )}
  </View>
)

PropertyComponent.defaultProps = {
  verticalMargin: 40
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 40
  },
  propertyName: {
    fontSize: 18,
    color: 'yellow',
    fontWeight: 'bold',
    marginBottom: 10
  },
  propertyType: {
    fontSize: 14,
    color: 'blue',
    fontWeight: 'bold',
    marginBottom: 5
  },
  propertyValue: {
    fontSize: 14,
    color: 'green',
    marginBottom: 5
  },
  action: {
    marginTop: 10,
    width: 170,
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 5
    // color: '#FFF'
  }
})

export default PropertyComponent
