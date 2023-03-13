import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, FlatList, Alert} from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import { setMailingList } from "../redux/redux"
import { useDispatch } from "react-redux"
import { db, auth } from '../Firebase'
import {doc, getDoc, setDoc} from "firebase/firestore";

const EmailList = () => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const [email, setEmail] = React.useState([])
  const [mailingList, setMailingList] = React.useState([])

  const userEmail = auth.currentUser.email
  console.log(userEmail)

  const mailingListRef = doc(db, "mailingLists", userEmail);

  React.useEffect(() => {
    const getMailingList = async () => {
      const docSnap = await getDoc(mailingListRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setMailingList(docSnap.data().mailingList)
      } else {
        console.log("No such document!");
      }
    }
    getMailingList()
  }, [])


  const navigation = useNavigation()

  const handleChange = (text) => {
    setEmail(text)
  }

  console.log(mailingList)
  console.log(mailingList.mailingList)


  // handle functions
  const checkEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const handleBack = () => {
    navigation.goBack()
  }

  const handleDelete = () => {

  }

  const handleAdd = () => {
    if (checkEmail(email)) {
      setMailingList([...mailingList, email])
      setDoc(doc(db, "mailingLists", userEmail), {
        mailingList: mailingList
      })
      Alert.alert('Great Success!', 'Email added to mailing list')
      setEmail('')
    } else {
      alert('Please enter a valid email address')
    }
  }

  const Item = ({ item }) => (
    <View>
      <View style={styles.emailListItem}>
        <Text>{item}</Text>
      </View>
    </View>
)

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        />
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back-outline" size='25' />
        </TouchableOpacity>
      </View>
      <View style={styles.addEmailButton}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" color="#ACECC2" size='25'/>
        </TouchableOpacity>
      </View>
      <View style={styles.emailListWrapper}>
        <View style={styles.emailListItem}>
          <FlatList data={mailingList} renderItem={renderItem} keyExtractor={item => item.id} />
        </View>
      </View>
      <View style={styles.centeredView}>
        <View>
          <Modal
            animationType="slide"
            presentationStyle="formSheet"
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalView}>
              <TouchableOpacity style={styles.buttonClose} onPress={() => setModalVisible(false)}>
                <Ionicons name="close-outline" size='25'/>
              </TouchableOpacity>
            </View>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.modalText}>Add Email</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                textContentType={'emailAddress'}
                onChangeText={handleChange}
                value={email}
              />
            </View>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.modalButton} onPress={handleAdd}>
                <Text style={{ fontWeight: 'bold' }}>Add</Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
    backgroundColor: '#ffffff',
    padding: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "lightgray",
    alignItems: "center",
    shadowColor: "#000",
  },
  logoWrapper: {
    position: 'absolute',
    top: '15%',
  },
  backButtonWrapper: {
    position: 'absolute',
    top: '7.5%',
    left: '7.5%',
  },
  addEmailButton: {
    position: 'absolute',
    top: '25%',
    left: '55%',
  },
  emailListWrapper: {
    paddingVertical: 20,
    position: 'absolute',
    top: '35%',
    backgroundColor: 'white',
    height: '60%',
    width: '90%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ACECC2',
  },
  emailListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  minusIcon: {
    marginLeft: 175,
    marginTop: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: 'bold',
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    position: 'absolute',
    top: '5%',
    left: '5%'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    width: 300,
    padding: 7.5,
  },
  modalButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ACECC2',
    marginHorizontal: 10,
    borderRadius: 8,
    height: 40,
    width: 200,
    fontWeight: 'bold',
    marginTop: 50,
  },
})

export default EmailList
