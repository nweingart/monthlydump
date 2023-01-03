import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, FlatList} from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import SmallLogo from "../assets/logoSimple.png";
import { setMailingList } from "../redux/redux";
import { useDispatch, useSelector } from "react-redux";

const EmailList = () => {

  const [modalVisible, setModalVisible] = React.useState(false)
  const [email, setEmail] = React.useState('')

  const mailingList = useSelector(state => state.mailingList) || []

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleChange = (text) => {
    setEmail(text)
  }

  const checkEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const handleAdd = () => {
    if (checkEmail(email) === true) {
      const newList = mailingList.concat({id: mailingList.length + 1, email: email})
      setModalVisible(false)
      dispatch(setMailingList(newList))
      setEmail('')
    } else {
      alert('Please enter a valid email address')
    }
  }

  const handleDelete = (id) => {
    const newList = mailingList.filter(item => item.id !== id)
    dispatch(setMailingList(newList))
  }

  const handleBack = () => {
    navigation.goBack()
  }

  const Item = ({ item }) => (
    <View>
      <View style={styles.emailListItem}>
        <Text>{item.email}</Text>
        <TouchableOpacity>
          <Ionicons name="trash" size={20} color="black" onPress={() => handleDelete(item.id)} />
        </TouchableOpacity>
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
      <View style={styles.logoWrapper}>
        <Image source={SmallLogo} />
      </View>
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back-outline" size='25' />
        </TouchableOpacity>
      </View>
      <View style={styles.addEmailButton}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size='25'/>
        </TouchableOpacity>
      </View>
      <View style={styles.emailListWrapper}>
        <View style={styles.emailListItem}>
          <FlatList data={mailingList ? mailingList : emailList} renderItem={renderItem} keyExtractor={item => item.id} />
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
              <TouchableOpacity style={styles.buttonClose} onPress={handleBack}>
                <Ionicons name="close-outline" size='25'/>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.modalText}>Add Email</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                textContentType={'emailAddress'}
                onChangeText={handleChange}
                value={email}
              />
            </View>
            <View>
              <TouchableOpacity style={styles.modalButton} onPress={handleAdd}>
                <Text>Add Email</Text>
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
    backgroundColor: '#ACECC2',
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
    borderColor: 'black',
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
    textAlign: "center"
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
  },
  modalButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ACECC2',
    marginHorizontal: 10,
    borderRadius: 8,
    height: 40,
  },
})

export default EmailList
