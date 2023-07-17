import React, {useState} from 'react'
import {FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import { setUpdateSubmitted } from "../../redux/redux";
import { auth, db } from '../../Firebase'
import { getFunctions, httpsCallable } from 'firebase/functions'
import {doc, getDoc, setDoc} from "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/storage';

const Preview = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [name, setName] = useState('')
  const [mailingList, setMailingList] = useState([])
  const userEmail = auth.currentUser.email
  const currentUser = auth.currentUser
  const navigation = useNavigation()
  const dispatch = useDispatch()
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
  const updateGoal1 = useSelector(state => state.updateGoal1)
  const updateGoal2 = useSelector(state => state.updateGoal2)
  const updateGoal3 = useSelector(state => state.updateGoal3)

  const email = currentUser.email


  const getCurrentMonth = () => {
    const date = new Date();
    const monthIndex = date.getMonth();
    const months = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];

    return months[monthIndex];
  }


  const month = getCurrentMonth()
  const year = new Date().getFullYear()
  const currentPeriod =  month + "/" + year
  console.log(currentPeriod)
  const userRef = doc(db, "users", userEmail);
  const mailingListRef = doc(db, "mailingLists", userEmail);

  const handleBack = () => {
    navigation.goBack()
  }

  const functions = getFunctions()

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


  React.useEffect(() => {
    const getUserName = async () => {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setName(docSnap.data().firstName)
      } else {
        console.log("No such document!");
      }
    }
    getUserName()
  }, [])


  const handleConfirm = () => {
    dispatch(setUpdateSubmitted(true))
    const sendEmail = httpsCallable(functions, 'sendEmail');
    sendEmail({
      email: email,
      name: name,
      month: 'March',
      mailingList: mailingList,
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
      updateGoal1: updateGoal1,
      updateGoal2: updateGoal2,
      updateGoal3: updateGoal3,
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
        <View style={{ width: 325 }} key={item.id}>
          <Text style={styles.topicText}>{item.topic}</Text>
          <Image source={{ uri: item.uri }} style={styles.image} />
          <Text style={styles.text}>{item.text}</Text>
        </View>
      )
  }

  const goalsFooter = () => {
    return (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ACECC2', marginBottom: 10 }}>Goals for April</Text>
        <Text style={{ marginBottom: 10 }}>- {updateGoal1}</Text>
        <Text style={{ marginBottom: 10 }}>- {updateGoal2}</Text>
        <Text style={{ marginBottom: 10 }}>- {updateGoal3}</Text>
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
          <Text style={styles.title}>{name}'s {month}</Text>
        </View>
      { !isEnabled ?
        <SafeAreaView style={styles.contentWrapper}>
          <FlatList data={data} renderItem={renderImage} ListFooterComponent={goalsFooter} />
        </SafeAreaView> :
        <View style={{ display: 'flex', flexDirection: 'column', height: 650, width: 400 }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Image source={{ uri: image1 }} style={{ height: 325, width: 180, borderTopLeftRadius: 15 }} />
            <Image source={{ uri: image2 }} style={{ height: 325, width: 180, borderTopRightRadius: 15 }} />
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Image source={{ uri: image3 }} style={{ height: 325, width: 180, borderBottomLeftRadius: 15 }}/>
            <Image source={{ uri: image4 }} style={{ height: 325, width: 180, borderBottomRightRadius: 15 }} />
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
    height: 300,
    width: '100%',
    borderRadius: 8,
    marginBottom: '5%',
  },
  topicText:{
    fontSize: 20,
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
