import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { auth } from "../Firebase";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
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

export default Settings
