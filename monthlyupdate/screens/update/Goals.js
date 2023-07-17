import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUpdateGoal1, setUpdateGoal2, setUpdateGoal3 } from '../../redux/redux'
import { db, auth } from '../../Firebase'
import { doc, setDoc } from 'firebase/firestore'

const Goals = () => {
  const [goal1, setGoal1] = React.useState('')
  const [goal2, setGoal2] = React.useState('')
  const [goal3, setGoal3] = React.useState('')

  const email = auth.currentUser.email
  const dispatch = useDispatch()
  const currentPeriod = new Date().toLocaleString('default', { month: 'long', year: 'numeric' }).split(" ").join("");


  const navigation = useNavigation()

  const uploadGoals = async (userId, currentPeriod, goal1, goal2, goal3) => {
    const docId = `${userId}-${currentPeriod}`;
    const docRef = doc(db, 'goals', docId);

    await setDoc(docRef, {
      goal1,
      goal2,
      goal3
    }, { merge: true });
  }

  const handleBack = () => {
    navigation.navigate('Update4')
  }

  const handleNext = () => {
    uploadGoals(email, currentPeriod, goal1, goal2, goal3)
    navigation.navigate('Preview')
    dispatch(setUpdateGoal1(goal1))
    dispatch(setUpdateGoal2(goal2))
    dispatch(setUpdateGoal3(goal3))
  }


  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back-outline" size='25' color={'#ACECC2'} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.pageTitle}>Goals</Text>
      </View>
        <View style={styles.textBoxWrapper}>
          <View style={{...styles.textBoxWrapper, marginBottom: 50}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <TextInput
                style={{...styles.textBox, height: 100}}
                multiline={true}
                placeholder="Exercise 5 times per week"
                value={goal1}
                onChangeText={text => setGoal1(text)}
                autoCapitalize="sentences"
              />
            </TouchableWithoutFeedback>
            <TouchableOpacity onPress={Keyboard.dismiss}>
              <Text style={{
                marginLeft: 275,
                marginTop: -85,
                color: '#ACECC2',
                fontWeight: 'bold',
              }}>Save</Text>
            </TouchableOpacity>
          </View>
          <View style={{...styles.textBoxWrapper, marginBottom: 50}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <TextInput
                style={{...styles.textBox, height: 100}}
                multiline={true}
                placeholder="Read for 15 minutes a day"
                value={goal2}
                onChangeText={text => setGoal2(text)}
                autoCapitalize="sentences"
              />
            </TouchableWithoutFeedback>
            <TouchableOpacity onPress={Keyboard.dismiss}>
              <Text style={{
                marginLeft: 275,
                marginTop: -85,
                color: '#ACECC2',
                fontWeight: 'bold',
              }}>Save</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textBoxWrapper}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <TextInput
                style={{...styles.textBox, height: 100}}
                multiline={true}
                placeholder="Wake up at 7am every week day"
                value={goal3}
                onChangeText={text => setGoal3(text)}
                autoCapitalize="sentences"
              />
            </TouchableWithoutFeedback>
            <TouchableOpacity onPress={Keyboard.dismiss}>
              <Text style={{
                marginLeft: 275,
                marginTop: -85,
                color: '#ACECC2',
                fontWeight: 'bold',
              }}>Save</Text>
            </TouchableOpacity>
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
  goalTextBox: {
    padding: 35,
    paddingRight: 50,
    marginTop: -20,
    paddingTop: 10,
    height: 150,
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

export default Goals
