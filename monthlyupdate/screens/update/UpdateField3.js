import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard, TouchableWithoutFeedback,
} from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { setUpdate3, setUpdate3Image } from "../../redux/redux";
import { storage } from '../../Firebase'

const UpdateField3 = () => {
  const [update, setUpdate] = React.useState('')
  const [image, setImage] = React.useState(null);
  const [filename, setFilename] = React.useState('')

  const submitPhoto = async () => {
    const response = await fetch(image)
    const blob = await response.blob()
    const filename = image.substring(image.lastIndexOf('/') + 1)

    try {
      await storage.ref().child(filename).put(blob)
      setFilename(filename)
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


    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const clearImage =() => {
    setImage(null)
  }

  const dispatch = useDispatch()
  const updateField3 = useSelector(state => state.updateField3)

  const characterCount = 280 - update.length

  const disabled = characterCount > 280

  const navigation = useNavigation()

  const handleBack = () => {
    dispatch(setUpdate3(update))
    dispatch(setUpdate3Image(image))
    navigation.navigate('UpdateField2')
  }

  const handleRemoveText = () => {
    setUpdate('')
  }

  const handleNext = () => {
    if (disabled) {
      alert('You may only use 500 characters per update.')
    } else {
      submitPhoto()
        .then(() => console.log('photo submitted!'))
      dispatch(setUpdate3(update))
      dispatch(setUpdate3Image(image))
      navigation.navigate('UpdateField4')
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
        <Text style={styles.pageTitle}>{updateField3}</Text>
      </View>
      <View style={styles.textSectionWrapper}>
        <TouchableOpacity style={{ position: 'absolute', left: 50, top: 165, zIndex: 5}} onPress={() => handleRemoveText()}>
          <Text style={{ color: '#ACECC2', fontWeight: 'bold'}}>Clear</Text>
        </TouchableOpacity>
        <View style={styles.textBoxWrapper}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <TextInput
              style={styles.textBox}
              multiline={true}
              placeholder="start typing"
              value={update}
              onChangeText={text => setUpdate(text)}
              autoCapitalize="sentences"
            />
          </TouchableWithoutFeedback>
          <Text style={ characterCount < 25 ? styles.characterCount2 : styles.characterCount}>{characterCount}</Text>
          <TouchableOpacity onPress={Keyboard.dismiss}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageSectionWrapper}>
        <TouchableOpacity onPress={!image ? pickImage : clearImage} style={styles.addPictureButton}>
          <Text style={{ marginLeft: '7.5%', fontWeight: 'bold', color: '#ACECC2' }}>{ !image ? 'Add Picture' : null }</Text>
        </TouchableOpacity>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          { image && <Image source={{ uri: image }} style={{ width: '90%', height: '100%', borderRadius: 15}} /> }
        </View>
      </View>
      <View style={styles.nextButtonWrapper}>
        {
          image ? <TouchableOpacity style={{ marginLeft: 25, marginBottom: -25 }} onPress={clearImage}>
            <Ionicons name="trash-outline" size='25' color={'#ACECC2'} />
          </TouchableOpacity> : null
        }
        {
          !image && !update ? null :
            <TouchableOpacity style={styles.nextButton} onPress={handleNext} >
              <Text style={styles.nextText}>Next</Text>
              <Ionicons name="arrow-forward-outline" size='25' color={'#ACECC2'} />
            </TouchableOpacity>
        }
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
    marginTop: -30,
    marginBottom: 25,
    color: '#ACECC2',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
  },
  imageSectionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: 300,
    marginTop: 5,
  },
  textSectionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: -25,
    height: 250,
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
    paddingRight: 50,
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
    marginTop: -160,
    fontWeight: 'bold',
    opacity: 0.5,
    color: '#ACECC2',
    marginRight: -275,
    paddingLeft: 25,
  },
  characterCount2: {
    marginTop: -160,
    marginRight: -275,
    fontWeight: 'bold',
    opacity: 0.5,
    color: 'red',
    paddingLeft: 25,
  },
  buttonsWrapper: {
    flexDirection: 'row',
  },
  clearButton: {
    position: 'absolute',
    top: '100%',
    left: '100%',
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
  bottomSectionWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  nextText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    marginRight: 10,
    marginTop: 2.5,
    color: '#ACECC2',
  },
  saveText: {
    marginLeft: 275,
    marginTop: 115,
    color: '#ACECC2',
    fontWeight: 'bold',
  },
})

export default UpdateField3
