import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import SmallLogo from '../../assets/logoSimple.png'
import {useDispatch} from "react-redux";
import { setUpdateField1, setUpdateField2, setUpdateField3, setUpdateField4, setUpdateField5 } from '../../redux/redux'

const UpdateSelect = () => {
  const [items, setItems] = React.useState('')

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  const handleNext = () => {
    dispatch(setUpdateField1(items[0]))
    dispatch(setUpdateField2(items[1]))
    dispatch(setUpdateField3(items[2]))
    dispatch(setUpdateField4(items[3]))
    dispatch(setUpdateField5(items[4]))
    navigation.navigate('UpdateField1')
  }

  const addItem = input => {
    setItems([...items, input])
  }

  console.log(items)

  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back-outline" size='25' />
        </TouchableOpacity>
      </View>
      <View style={styles.logoWrapper}>
        <Image source={SmallLogo} />
      </View>
      <View style={styles.topTextWrapper}>
        <Text style={styles.topText}>Customize your update</Text>
      </View>
      <View>
        <TextInput
          style={styles.textBox}
          multiline={true}
          placeholder="start typing"
          value={items}
          onChangeText={text => addItem(text)}
          autoCapitalize="sentences"
        />
      </View>
      <View style={styles.nextButtonWrapper}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
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
  },
  logoWrapper: {
    position: 'absolute',
    top: '10%',
  },
  backButtonWrapper: {
    position: 'absolute',
    top: '7.5%',
    left: '7.5%',
  },
  topTextWrapper:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    width: '95%',
    height: '5%',
    position: 'absolute',
    top: '20%',
  },
  topText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  textBox: {
    padding: 20,
    height: 400,
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
  }
})

export default UpdateSelect
