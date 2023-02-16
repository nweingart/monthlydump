import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image, SafeAreaView, FlatList} from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import LogoNew from '../../assets/LogoNew.png'
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { setUpdate1, setUpdate1Image } from "../../redux/redux";
import { storage } from '../../Firebase'

const UpdateField1 = () => {
  const [update, setUpdate] = React.useState('')
  const [image, setImage] = React.useState(null);

  const submitPhoto = async () => {
    const uploadUri = image
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

    try {
      await storage.ref(filename).put(uploadUri)
    } catch(err) {
      console.log(err)
    }
  }

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
  const updateField1 = useSelector(state => state.updateField1)

  const characterCount = 280 - update.length

  const disabled = characterCount > 280

  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  const clearUpdate = () => {
    setUpdate('')
  }

  console.log(image)

  const handleNext = () => {
    if (disabled) {
      alert('You may only use 500 characters per update.')
    } else {
      submitPhoto()
        .then(() => console.log('photo submitted!'))
      dispatch(setUpdate1(update))
      dispatch(setUpdate1Image(image))
      navigation.navigate('UpdateField2')
    }
  }

  React.useEffect(() => {
  }, [characterCount])

  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back-outline" size='25' color={'#ACECC2'} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.pageTitle}>{updateField1}</Text>
      </View>
      <View style={styles.imageSectionWrapper}>
        <TouchableOpacity onPress={pickImage} style={styles.addPictureButton}>
          <Text style={{ marginLeft: '7.5%', fontWeight: 'bold', color: '#ACECC2' }}>Add Picture</Text>
          { image && <Ionicons name="checkmark-circle-outline" size='25' style={{ marginLeft: '2.5%', marginTop: '-1%', color: '#ACECC2'}} /> }
        </TouchableOpacity>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          { image && <Image source={{ uri: image }} style={{ width: '90%', height: '100%', borderRadius: 15}} /> }
        </View>
      </View>
      <View style={styles.imageSectionWrapper}>
        <Text style={{ marginLeft: '7.5%', fontWeight: 'bold', color: '#ACECC2', marginTop: 50 }}>Add Update</Text>
        <View style={styles.textBoxWrapper}>
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
      </View>
      <View style={styles.nextButtonWrapper}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext} disabled={disabled}>
          <Text style={styles.nextText}>Next</Text>
          <Ionicons name="arrow-forward-outline" size='25' color={'#ACECC2'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'snow',
    opacity: 0.9,
  },
  backButtonWrapper: {
    marginTop: 75,
    marginLeft: 25,
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 30,
    marginBottom: '5%',
    color: '#ACECC2',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
  },
  imageSectionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: 300,
  },
  addPictureButton: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '2.5%',
  },
  textBoxWrapper: {
    marginTop: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    padding: 35,
    marginTop: -20,
    paddingTop: 10,
    height: 175,
    width: 350,
    borderRadius: 15,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  characterCount: {
    marginTop: -25,
    fontWeight: 'bold',
    opacity: 0.5,
    marginLeft: -275,
    color: '#ACECC2',
  },
  characterCount2: {
    marginTop: -25,
    fontWeight: 'bold',
    opacity: 0.5,
    marginLeft: -275,
    color: 'red',
  },
  buttonsWrapper: {
    flexDirection: 'row',
  },
  clearButton: {
    position: 'absolute',
    top: '66%',
    left: '20%',
  },
  nextButtonWrapper: {
    position: 'absolute',
    bottom: '0%',
    right: '5%',
  },
  nextButton: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 75,
    marginLeft: 300,
  },
  nextText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    marginRight: 10,
    marginTop: 2.5,
    color: '#ACECC2',
  },
})

export default UpdateField1
