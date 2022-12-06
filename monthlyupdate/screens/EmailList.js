import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Pressable, Image, Modal, TextInput, FlatList} from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import SmallLogo from "../assets/logoSimple.png";

const EmailList = () => {
  const initialList = [{
    id: 1,
    email: 'nweingart12@gmail.com'
  }]

  const [modalVisible, setModalVisible] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [emailList, setEmailList] = React.useState(initialList)


  const navigation = useNavigation()

  const handleChange = (text) => {
    setEmail(text)
  }

  const handleAdd = () => {
    const newList = emailList.concat({ id: emailList.length + 1, email: email })
    setModalVisible(false)
    setEmailList(newList)
  }

  const handleBack = () => {
    navigation.goBack()
  }

  const Item = ({ item }) => (
    <View>
      <Text>{item.email}</Text>
    </View>
)

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        />
    )
  }

  console.log(emailList)

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
          <FlatList data={emailList} renderItem={renderItem} keyExtractor={item => item.id} />
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
    flexDirection:'row',
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
