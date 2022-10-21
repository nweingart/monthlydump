import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import SmallLogo from '../../assets/logoSimple.png'

const UpdateField4 = () => {
  const [items, setItems] = React.useState([])

  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  const handleNext = () => {
    navigation.navigate('UpdateField5')
  }

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
        <Text style={styles.topText}>Update Field 4</Text>
      </View>
      <View style={styles.multiSelectWrapper}>
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
  multiSelectWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    width: '95%',
    height: '60%',
    position: 'absolute',
    top: '30%',
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

export default UpdateField4
