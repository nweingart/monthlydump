import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Pressable, Image, Modal, TextInput} from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import SmallLogo from "../assets/logoSimple.png";

const EmailList = () => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [emailList, setEmailList] = React.useState([])

  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
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
          <Text style={styles.emailListItem}>{email}</Text>
          {email !== '' && (
            <TouchableOpacity style={styles.minusIcon}>
              <Ionicons  name="remove-circle-outline" size='25'/>
            </TouchableOpacity>
          )}
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
              <Pressable
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>x</Text>
              </Pressable>
            </View>
            <View>
              <Text style={styles.modalText}>Add Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
              />
            </View>
            <View>
              <Text>{email}</Text>
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
    backgroundColor: "#2196F3",
    position: 'absolute',
    top: '5%',
    left: '5%'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  }
})

export default EmailList
