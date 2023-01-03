import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import {useNavigation} from "@react-navigation/native";
import {auth} from "../Firebase";
import LogoFull from '../assets/logoFull.png'
import { useSelector } from "react-redux";


const Home = () => {
  const navigation = useNavigation()
  const submitted = useSelector(state => state.updateSubmitted)

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
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
      <View style={styles.logoWrapper}>
        <Image source={LogoFull} />
      </View>
      <View style={styles.linkWrapper}>
        <TouchableOpacity style={styles.linkButtonWrapper} onPress={handleUpdateClick}>
          <Text style={styles.linkButtonText}>
            {submitted ? "View Update" : "Create Update"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButtonWrapper} onPress={handleEmailListClick}>
          <Text style={styles.linkButtonText}>
            View Email List
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.brandTextWrapper}>
        <Text style={styles.brandText}>Appreciate the past,</Text>
        <Text style={styles.brandText}>strive for the future.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ACECC2',
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
    backgroundColor: 'white',
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
