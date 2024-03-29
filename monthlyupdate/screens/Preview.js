import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setUpdateSubmitted } from "../redux/redux";
import { auth } from '../Firebase'
import { httpsCallable, getFunctions } from 'firebase/functions'

const Preview = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const today = new Date()
  const currentUser = auth.currentUser
  const currentPeriod = new Date().toLocaleString('default', { month: 'long', year: 'numeric' }).split(" ").join("")
  const month = today.toLocaleString('default', { month: 'long' })
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const name = 'Ned'
  const topic1 = useSelector(state => state.updateField1)
  const update1 = useSelector(state => state.update1)
  const image1 = useSelector(state => state.update1Image)
  const topic2 = useSelector(state => state.updateField2)
  const update2 = useSelector(state => state.update2)
  const image2 = useSelector(state => state.update2Image)
  const topic3 = useSelector(state => state.updateField3)
  const update3 = useSelector(state => state.update3)
  const image3 = useSelector(state => state.update3Image)
  const topic4 = useSelector(state => state.updateField4)
  const update4 = useSelector(state => state.update4)
  const image4 = useSelector(state => state.update4Image)

  const email = currentUser.email

  const handleBack = () => {
    navigation.navigate('UpdateField4')
  }

  const functions = getFunctions()

  const handleConfirm = () => {
    dispatch(setUpdateSubmitted(true))
    const sendEmail = httpsCallable(functions, 'sendEmail');
    sendEmail({
      email: email,
      name: name,
      month: 'March',
      update1Topic: topic1,
      update1Text: update1,
      update1Image: image1,
      update2Topic: topic2,
      update2Text: update2,
      update2Image: image2,
      update3Topic: topic3,
      update3Text: update3,
      update3Image: image3,
      update4Topic: topic4,
      update4Text: update4,
      update4Image: image4,
    }).then(result => {
      console.log(result.data)
    })
    navigation.navigate('Confirmation')
  }

  const data = [
    { id: 1, uri: image1, text: update1, topic: topic1 },
    { id: 2, uri: image2, text: update2, topic: topic2 },
    { id: 3, uri: image3, text: update3, topic: topic3 },
    { id: 4, uri: image4, text: update4, topic: topic4 },
  ]

  const renderImage = ({ item }) => {
      return (
        <View style={{ width: 400 }} key={item.id}>
          <Text style={styles.topicText}>{item.topic}</Text>
          <Image source={{ uri: item.uri }} style={styles.image} />
          <Text style={styles.text}>{item.text}</Text>
        </View>
      )
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => isEnabled ? setIsEnabled(false) : setIsEnabled(true)}
        style={{ marginTop: -40, marginBottom: 40, marginRight: -200 }}
      >
        {!isEnabled ?
          <Text
            style={{ color: '#ACECC2', fontWeight: 'bold' }}>See Photoroll Version
          </Text> :
          <Text
            style={{ color: '#ACECC2', fontWeight: 'bold' }}>See Update Version
          </Text>
        }
      </TouchableOpacity>
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back-outline" size='25' style={{ color: '#ACECC2'}} />
        </TouchableOpacity>
      </View>
        <View>
          <Text style={styles.title}>{name}'s March</Text>
        </View>
      { !isEnabled ?
        <SafeAreaView style={styles.contentWrapper}>
          <FlatList data={data} renderItem={renderImage} />
        </SafeAreaView> :
        <View style={{ display: 'flex', flexDirection: 'column', height: 650, width: 400 }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Image source={{ uri: image1 }} style={{ height: 275, width: 190, borderTopLeftRadius: 15 }} />
            <Image source={{ uri: image2 }} style={{ height: 275, width: 190, borderTopRightRadius: 15 }} />
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Image source={{ uri: image3 }} style={{ height: 275, width: 190, borderBottomLeftRadius: 15 }}/>
            <Image source={{ uri: image4 }} style={{ height: 275, width: 190, borderBottomRightRadius: 15 }} />
          </View>
        </View>
      }
        <View style={styles.nextButtonWrapper}>
          <TouchableOpacity style={styles.nextButton} onPress={handleConfirm}>
            <Text style={styles.nextButtonText}>Submit</Text>
            <Ionicons name="arrow-forward-outline" size='25' style={{ color: '#ACECC2'}} />
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'snow',
    padding: 25,
    paddingTop: 100,
  },
  backButtonWrapper: {
    position: 'absolute',
    top: '7.5%',
    left: '7.5%',
  },
  title: {
    fontSize: 30,
    marginBottom: '5%',
    fontWeight: '600',
    color: '#ACECC2',
  },
  image: {
    height: 200,
    width: '100%',
    borderRadius: 8,
    marginBottom: '5%',
  },
  topicText:{
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    marginRight: 10,
    marginTop: 2.5,
    color: '#ACECC2',
  },
  text: {
    marginBottom: '10%',
    fontFamily: 'Avenir',
  },
  contentWrapper: {
    flex: 1,
    marginBottom: 50,
    borderRadius: 8,
  },
  nextButtonWrapper: {
     position: 'absolute',
     bottom: '5%',
     right: '5%',
  },
  nextButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nextButtonText: {
    fontWeight: '700',
    fontSize: 16,
    marginRight: 10,
    marginTop: 2.5,
    color: '#ACECC2',
  },
})

export default Preview
