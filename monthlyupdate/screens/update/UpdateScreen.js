import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Alert
} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"

import Dropdown from "../../common/Dropdown";
import * as ImagePicker from "expo-image-picker";

import { storage, auth, db } from '../../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {doc, setDoc} from "firebase/firestore";

const UpdateScreen = ({ number, fieldTitle, setUpdateAction, setUpdateImageAction, navigateFrom, navigateTo}) => {
  const email = auth.currentUser.email;
  const [update, setUpdate] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const option1 = useSelector((state) => state.updateField1);
  const option2 = useSelector((state) => state.updateField2);
  const option3 = useSelector((state) => state.updateField3);
  const option4 = useSelector((state) => state.updateField4);

  const currentPeriod = new Date().toLocaleString('default', { month: 'long', year: 'numeric' }).split(" ").join("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    const response = await fetch(image);
    const blob = await response.blob();

    const storageRef = ref(storage, `images/${email}/${currentPeriod}/${number}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at:', downloadURL)
        console.log(downloadURL)
        setImageUrl(downloadURL)
        dispatch(setUpdateImageAction(downloadURL))
      }
    );
  };


  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const disabled = !update && !image;
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleBack = () => {
    console.log('back button pressed');
    navigation.navigate(`${navigateFrom}`);
  };

  const takeDump = async (userId, month, updateNumber, topic, text, imageUrl) => {
    const docId = `${userId}-${month}`;
    const docRef = doc(db, 'dumps', docId);

    await setDoc(docRef, {
      [`update${updateNumber}`]: {
        topic,
        text,
        imageUrl
      }
    }, { merge: true });
  }

  console.log(image)
  console.log(setUpdateImageAction)


  const handleNext = () => {
    if (disabled) {
      return Alert.alert('Whoops!', 'Please add an update or image to continue', [{ text: 'OK' }]);
    } else if (update && image) {
      takeDump(email, currentPeriod, number, fieldTitle, update, imageUrl);
      uploadImage();
      dispatch(setUpdateAction(update));
      navigation.navigate(`${navigateTo}`);
    }
  };

  const characterCount = 280 - update.length;

  // Render function for the modal component
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
  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name={'arrow-back-outline'} size='25' color={'#ACECC2'} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleWrapper}>
        <Dropdown option1={option1} option2={option2} option3={option3} option4={option4} number={number - 1} />
      </View>
      <View>
        {
          modalVisible ? modalComponent() : null
        }
        <View>
          <View style={{ marginTop: 15 }}>
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
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
          <Ionicons name="arrow-forward-outline" size='25' color={'#ACECC2'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    width: 100,
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
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

export default UpdateScreen;

