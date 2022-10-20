import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { auth } from "../Firebase";
import {useNavigation} from "@react-navigation/native";


const Friends = () => {
  return (
    <View style={styles.container}>
      <Text>No friends yet!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '50%',
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})

export default Friends
