import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";

const Confirmation = () => {
  const navigation = useNavigation()

  const handleReturn = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <Text style={styles.text}>Confirmed!</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleReturn}>
          <Text style={styles.buttonText}>Return Home</Text>
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
    backgroundColor: 'snow',
    padding: 25,
    paddingTop: 100,
  },
  text: {
    fontSize: 30,
    marginBottom: '5%',
    color: '#ACECC2',
  },
  button: {
    marginTop: '5%',
    marginBottom: '5%',
    backgroundColor: '#ACECC2',
    height: 50,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    padding: 2.5,
    fontSize: 18,
    color: 'snow',
    textAlign: 'center',
    alignItems: 'center',
  },
})

export default Confirmation
