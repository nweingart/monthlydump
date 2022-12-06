import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";

const Preview = () => {
  const navigation = useNavigation()
  const update1 = useSelector(state => state.update1)
  const update2 = useSelector(state => state.update2)
  const update3 = useSelector(state => state.update3)
  const update4 = useSelector(state => state.update4)
  const update5 = useSelector(state => state.update5)

  const handleBack = () => {
    navigation.goBack()
  }

  const handleConfirm = () => {
    navigation.navigate('Confirmation')
  }


  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back-outline" size='25' />
        </TouchableOpacity>
      </View>
      <View style={styles.textBox}>
        <Text>{update1}</Text>
      </View>
      <View style={styles.nextButtonWrapper}>
        <TouchableOpacity style={styles.nextButton} onPress={handleConfirm}>
          <Text style={styles.nextButtonText}>Submit</Text>
          <Ionicons name="arrow-forward-outline" size='25' />
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
  backButtonWrapper: {
    position: 'absolute',
    top: '7.5%',
    left: '7.5%',
  },
  textBox: {
    padding: 35,
    height: 175,
    width: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  nextButtonWrapper: {
    position: 'absolute',
    top: '95%',
    right: '10%',
  },
  nextButton: {
    flexDirection: 'row',
  },
  nextButtonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    marginRight: 10,
    marginTop: 2.5,
  },
})

export default Preview
