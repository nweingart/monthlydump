import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import {setUpdate4, setUpdate4Image} from "../../redux/redux";
import {auth, storage} from '../../Firebase'
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

const UpdateField4 = () => {
  const [update, setUpdate] = React.useState('')
  const [image, setImage] = React.useState('');
  const [uploading, setUploading] = React.useState(false);

  const userEmail = auth.currentUser.email
  const currentPeriod = new Date().toLocaleString('default', { month: 'long', year: 'numeric' }).split(" ").join("")

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    console.log({ pickerResult })

    // once the image is picked, we call the function to handle the image
    handlePickedImage(pickerResult)

  };

  // the handle function calls the upload function
  const handlePickedImage = async (pickerResult) => {
    try {
      setUploading(true)

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri)
        setImage(uploadUrl)
      }
    } catch (e) {
      console.log(e)
      alert('Upload failed, sorry :(')
    } finally {
      setUploading(false)
    }
  }

  // the upload function!
  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      }
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      }
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    })

    const storageRef = ref(storage, `${userEmail}/${currentPeriod}/update4.png`);
    const result = await uploadBytes(storageRef, blob)
    console.log(result)

    blob.close()

    return await getDownloadURL(storageRef)
  }

  const clearImage =() => {
    setImage('')
  }

  const dispatch = useDispatch()
  const updateField4 = useSelector(state => state.updateField4)

  const characterCount = 280 - update.length

  const navigation = useNavigation()

  const handleBack = () => {
    navigation.navigate('UpdateField3')
  }

  const handleRemoveText = () => {
    setUpdate('')
  }

  const handleNext = () => {
    dispatch(setUpdate4(update))
    dispatch(setUpdate4Image(image))
    navigation.navigate('Preview')
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
        <Text style={styles.pageTitle}>{updateField4}</Text>
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

export default UpdateField4
