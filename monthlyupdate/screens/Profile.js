import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text>No posts yet!</Text>
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

export default Profile
