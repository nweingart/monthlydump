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
        <Text>Confirmed!</Text>
      </View>
      <View>
        <TouchableOpacity onPress={handleReturn}>
          <Text>Return to Home</Text>
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
    backgroundColor: '#ACECC2',
    padding: 25,
    paddingTop: 100,
  },
})

export default Confirmation
