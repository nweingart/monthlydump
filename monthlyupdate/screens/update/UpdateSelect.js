import React, {useEffect, useState} from 'react'

// component imports
import {Text, TouchableOpacity, View, StyleSheet, FlatList, SafeAreaView, Alert} from 'react-native'

// logic imports
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

// redux imports
import { setUpdateField1, setUpdateField2, setUpdateField3, setUpdateField4 } from '../../redux/redux'
import Ionicons from "@expo/vector-icons/Ionicons";


const OPTIONS = [
  {
    label: 'Friends',
    id: 'FRI',
  },
  {
    label: 'Travel',
    id: 'TRV',
  },
  {
    label: 'Career',
    id: 'CAR',
  },
  {
    label: 'Fitness',
    id: 'FIT',
  },
  {
    label: 'Family',
    id: 'FAM',
  },
  {
    label: 'Hobbies',
    id: 'HOB',
  },
  {
    label: 'Relationship',
    id: 'REL',
  },
  {
    label: 'Other',
    id: 'OTH',
  },
]

const UpdateSelect = () => {
  const [selectedItem1, setSelectedItem1] = useState(null)
  const [selectedItem2, setSelectedItem2] = useState(null)
  const [selectedItem3, setSelectedItem3] = useState(null)
  const [selectedItem4, setSelectedItem4] = useState(null)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const backAlert = () => {
    return Alert.alert('Are you sure you want to exit?', 'You will hve to start your update from scratch!', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => navigation.goBack()}
    ]);
  }

  const disabled = !selectedItem1 || !selectedItem2 || !selectedItem3 || !selectedItem4

  const handleBack = () => {
    backAlert()
  }


  const handleNext = () => {
    dispatch(setUpdateField1(selectedItem1.label))
    dispatch(setUpdateField2(selectedItem2.label))
    dispatch(setUpdateField3(selectedItem3.label))
    dispatch(setUpdateField4(selectedItem4.label))
    navigation.navigate('UpdateField1')
  }

  const handleClick = (item) => {
    if (!selectedItem1) {
      setSelectedItem1(item)
    } else if (selectedItem1.id === item.id) {
      setSelectedItem1(null)
    } else if (!selectedItem2) {
      setSelectedItem2(item)
    } else if (selectedItem2.id === item.id) {
      setSelectedItem2(null)
    } else if (!selectedItem3) {
      setSelectedItem3(item)
    } else if (selectedItem3.id === item.id) {
      setSelectedItem3(null)
    } else if (!selectedItem4) {
      setSelectedItem4(item)
    } else if (selectedItem4.id === item.id) {
      setSelectedItem4(null)
    }
  }

  const renderImage = ({ item }) => {
    return (
      <View key={item.id}>
        <TouchableOpacity style={styles.topicButton} onPress={() => handleClick(item)}>
          <Text>{item.label}</Text>
          {selectedItem1 && selectedItem1.id === item.id ? <Text style={[styles.topicButtonText, styles.topicButton1]}>1</Text> : null}
          {selectedItem2 && selectedItem2.id === item.id ? <Text style={[styles.topicButtonText, styles.topicButton2]}>2</Text> : null}
          {selectedItem3 && selectedItem3.id === item.id ? <Text style={[styles.topicButtonText, styles.topicButton3]}>3</Text> : null}
          {selectedItem4 && selectedItem4.id === item.id ? <Text style={[styles.topicButtonText, styles.topicButton4]}>4</Text> : null}
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back-outline" size='25' color={'#ACECC2'} />
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.buttonContainer}>
        <Text style={styles.pageTitle}>Select 4 Topics</Text>
        <FlatList data={OPTIONS} renderItem={renderImage} />
      </SafeAreaView>
      <View style={styles.nextButtonWrapper}>
        {
          !selectedItem1 || !selectedItem2 || !selectedItem3 || !selectedItem4 ? null :
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextText}>Next</Text>
              <Ionicons name="arrow-forward-outline" size='25' color={'#ACECC2'} />
            </TouchableOpacity>
        }
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    opacity: 0.9,
  },
  backButtonWrapper: {
    marginTop: 75,
    marginLeft: 25,
  },
  pageTitle: {
    fontSize: 30,
    marginBottom: '5%',
    color: '#ACECC2',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 250,
    fontFamily: 'Avenir',
  },
  topicButton1: {
    color: '#F16A6F',
  },
  topicButton2: {
    color: '#FEA889'
  },
  topicButton3: {
    color: '#205566',
  },
  topicButton4: {
    color: '#69587B',
  },

  topicButtonText: {
    position: 'absolute',
    right: 10,
    top: '50%',
    fontWeight: 'bold',
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
  nextText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    marginRight: 10,
    marginTop: 2.5,
    color: '#ACECC2',
  },
})

export default UpdateSelect
