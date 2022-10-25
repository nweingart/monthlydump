import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import SmallLogo from "../assets/logoSimple.png";

const EmailList = () => {
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
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size='25'/>
        </TouchableOpacity>
      </View>
      <View style={styles.emailListWrapper}>
        <View style={styles.emailListItem}>
          <Text style={styles.emailListItem}>Email 1</Text>
          <TouchableOpacity style={styles.minusIcon}>
            <Ionicons  name="remove-circle-outline" size='25'/>
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
  }
})

export default EmailList
