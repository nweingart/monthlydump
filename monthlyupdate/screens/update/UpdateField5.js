import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import LogoNew from '../../assets/LogoNew.png'
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { setUpdate1 } from "../../redux/redux";

const UpdateField5 = () => {
  const [update, setUpdate] = React.useState('')
  const [update2, setUpdate2] = React.useState('')
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const dispatch = useDispatch()
  const updateField5 = useSelector(state => state.updateField5)

  const characterCount = 150 - update.length
  const characterCount2 = 150 - update2.length

  const disabled = characterCount > 150

  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  const handleNext = () => {
    if (disabled) {
      alert('You may only use 500 characters per update.')
    } else {
      dispatch(setUpdate1(update))
      navigation.navigate('Preview')
    }
  }

  React.useEffect(() => {
  }, [characterCount])

  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back-outline" size='25' />
        </TouchableOpacity>
      </View>
      <View style={styles.logoWrapper}>
        <Image source={LogoNew} style={{ width: 50, height: 50}}/>
      </View>
      <View style={styles.topTextWrapper}>
        <Text style={styles.topText}>{updateField5}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 30}}>
        <TextInput
          style={styles.textBox}
          multiline={true}
          placeholder="start typing"
          value={update}
          onChangeText={text => setUpdate(text)}
          autoCapitalize="sentences"
        />
        <Text style={ characterCount < 25 ? styles.characterCount2 : styles.characterCount}>{characterCount}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 30}}>
        <TextInput
          style={styles.textBox}
          multiline={true}
          placeholder="start typing"
          value={update2}
          onChangeText={text => setUpdate2(text)}
          autoCapitalize="sentences"
        />
        <Text style={ characterCount2 < 25 ? styles.characterCount2 : styles.characterCount}>{characterCount2}</Text>
      </View>
      <View style={{ flexDirection: 'row'}}>
        <View style={{ marginRight: 150}}>
          <View style={{ flexDirection: 'row'}}>
            <TouchableOpacity style={styles.nextButton} onPress={pickImage}>
              <Text style={styles.nextButtonText}>Add Picture</Text>
              <Ionicons name="images-outline" size='25' />
            </TouchableOpacity>
            <View style={{ marginLeft: 10 }}>
              { image && <Ionicons name="checkmark-circle-outline" size='25' /> }
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
            <Ionicons name="arrow-forward-outline" size='25' />
          </TouchableOpacity>
        </View>
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
    padding: 35,
    height: 175,
    width: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  characterCount: {
    marginTop: 10,
    marginLeft: -35,
    fontWeight: 'bold',
    opacity: 0.5
  },
  characterCount2: {
    marginTop: 10,
    marginLeft: -35,
    fontWeight: 'bold',
    opacity: 0.5,
    color: 'red',
  },
  buttonsWrapper: {
    flexDirection: 'row',
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

export default UpdateField5
