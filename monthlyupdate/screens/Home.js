import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import {useNavigation} from "@react-navigation/native"
import {auth} from "../Firebase"


const Home = () => {
  const navigation = useNavigation()
  const submitted = false
  const user = auth.currentUser

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  if (!user) {
    handleSignOut()
  }

  const handleEmailListClick = () => {
    navigation.navigate("EmailList")
  }

  const handleUpdateClick = () => {
    submitted === true ? navigation.navigate("Preview") : navigation.navigate("UpdateSelect")
  }

  return (
    <View style={styles.container}>
      <View style={styles.exitButton}>
        <TouchableOpacity onPress={handleSignOut}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#ACECC2', marginTop: -150 }}>Monthly Dump</Text>
      </View>
      <View>
        <Image source={require('../assets/logo.png')} style={{ height: 100, width: 100, marginTop: -75, marginBottom: 150 }}/>
      </View>
      <View style={styles.linkWrapper}>
        <TouchableOpacity style={styles.linkButtonWrapper} onPress={handleUpdateClick}>
          <Text style={styles.linkButtonText}>
            {submitted ? "View Last Dump" : "Create Dump"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButtonWrapper} onPress={handleEmailListClick}>
          <Text style={styles.linkButtonText}>
            Edit Mailing List
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logoWrapper: {
    position: 'absolute',
    top: '20%',
  },
  exitButton: {
    marginLeft: '75%',
    position: 'absolute',
    top: '10%',
    right: '-2.5%',
  },
  linkWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -125,
  },
  linkButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ACECC2',
    borderRadius: 10,
    height: 50,
    width: 300,
    marginTop: 25,
  },
  linkButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  brandTextWrapper: {
    position: 'absolute',
    bottom: '20%',
  },
  brandText: {
    fontWeight: '600',
    fontSize: 20,
  },
})

export default Home
