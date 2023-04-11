import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  Modal,
  Alert
} from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import {setUpdate4, setUpdate4Image} from "../../redux/redux";
import { storage, auth } from '../../Firebase'
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage'
import {manipulateAsync, SaveFormat} from "expo-image-manipulator";

const UpdateField4 = () => {
  const [update, setUpdate] = React.useState('')
  const [modalVisible, setModalVisible] = React.useState(false)
  const [image, setImage] = React.useState('');
  const [uploading, setUploading] = React.useState(false);

  const userEmail = auth.currentUser.email
  const currentPeriod = new Date().toLocaleString('default', { month: 'long', year: 'numeric' }).split(" ").join("")


  // base function for picking the image
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


  // base function for picking the image


  const handleModalOpen = () => {
    setModalVisible(true)
  }

  const handleModalClose = () => {
    setModalVisible(false)
  }

  React.useEffect(() => {
    console.log(image)
  }, [image])

  // the handle function calls the upload function

  // the upload function!

  const disabled = !update && !image
  const dispatch = useDispatch()
  const updateField4 = useSelector(state => state.updateField4)

  const navigation = useNavigation()

  const handleBack = () => {
    console.log('back button pressed')
    navigation.navigate('UpdateField3')
  }

  const handleRemoveText = () => {
    setUpdate('')
  }

  const handleNext = () => {
    if (disabled) {
      return Alert.alert('Whoops!', 'Please add an update or image to continue', [{text: 'OK'}])
    } else {
      dispatch(setUpdate4(update))
      dispatch(setUpdate4Image(image))
      navigation.navigate('Preview')
    }
  }

  const characterCount = 280 - update.length

  const modalComponent = () => {
    return (
      <View style={styles.centeredView}>
        <View>
          <Modal
            animationType="slide"
            presentationStyle="formSheet"
            visible={modalVisible}
          >
            <View style={styles.modalView}>
              <TouchableOpacity style={styles.buttonClose} onPress={handleModalClose}>
                <Ionicons name="close-outline" size='25'/>
              </TouchableOpacity>
            </View>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.modalText}>Add Update</Text>
              <TextInput
                style={styles.textBox}
                autoCapitalize="sentences"
                textContentType={'emailAddress'}
                onChangeText={text => setUpdate(text)}
                value={update}
                multiline={true}
              />
            </View>
            <View style={{ position: 'absolute', right: '8%', top: '7.5%'}}>
              <Text style={ characterCount < 25 ? styles.characterCount2 : styles.characterCount}>{characterCount}</Text>
            </View>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, backgroundColor: '#ACECC2', height: 30, width: 100, borderRadius: 8 }} onPress={handleModalClose}>
                <Text style={{ fontWeight: 'bold', color: 'black', }}>Add</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    )
  }
  const promptBox = (icon, type) => {
    return (
      <TouchableOpacity onPress={type === 'Update' ? handleModalOpen : pickImage}>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, width: 200, backgroundColor: '#ACECC2', borderRadius: 5 }}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>Click to add {type}</Text>
          <Ionicons name={icon} size='100' color={'black'} />
        </View>
      </TouchableOpacity>
    )
  }
  const baseComponentWithUpdate = () => {
    return (
      <View>
        <View style={{...styles.textBoxWrapper, marginTop: 100}}>
          <View
            style={styles.textBox}
          >
            <Text>{update}</Text>
          </View>
          <TouchableOpacity style={{ marginLeft: 300, marginTop: -35}} onPress={() => setModalVisible(true)}>
            <Text style={{ fontWeight: 'bold', color: '#ACECC2' }}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const baseComponentWithoutUpdate = () => {
    return (
      <View style={{...styles.textBoxWrapper, marginBottom: 50}}>
        { promptBox('document-text-outline', 'Update')}
      </View>
    )
  }

  const baseComponentWithoutImage = () => {
    return (
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        { promptBox('image-outline', 'Image') }
      </View>
    )
  }

  const baseComponentWithImage = (image) => {
    return (
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        { image &&
          <>
            <Image source={{ uri: image }} style={{ width: 350, height: 300, borderRadius: 15 }} />
            <TouchableOpacity style={{ marginLeft: 300, marginTop: -35}} onPress={pickImage}>
              <Text style={{ fontWeight: 'bold', color: '#ACECC2' }}>Edit</Text>
            </TouchableOpacity>
          </>
        }
      </View>
    )
  }

  // NOW RENDER ALL THIS
  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name={'arrow-back-outline'} size='25' color={'#ACECC2'} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.pageTitle}>{updateField4}</Text>
      </View>
      <View>
        {
          modalVisible ? modalComponent() : null
        }
        <View>
          <View style={{ marginTop: 15}}>
            {
              !image ? baseComponentWithoutImage() : baseComponentWithImage(image)
            }
          </View>
          <View>
            {
              !update ? baseComponentWithoutUpdate() : baseComponentWithUpdate()
            }
          </View>
        </View>
      </View>
      <View style={styles.nextButtonWrapper}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext} >
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
    display: 'flex',
    backgroundColor: 'snow',
    opacity: 0.9,
  },
  backButtonWrapper: {
    marginTop: 70,
    marginLeft: 25,
    zIndex: 5,
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
    padding: 15,
    paddingTop: 15,
    paddingRight: 50,
    height: 175,
    width: 350,
    borderRadius: 15,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  characterCount: {
    fontWeight: 'bold',
    opacity: 0.5,
    color: '#ACECC2',
    paddingLeft: 25,
  },
  characterCount2: {
    fontWeight: 'bold',
    opacity: 0.5,
    color: 'red',
    paddingLeft: 25,
  },
  buttonsWrapper: {
    flexDirection: 'row',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
})

export default UpdateField4
