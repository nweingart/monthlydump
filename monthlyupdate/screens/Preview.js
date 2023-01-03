import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setUpdateSubmitted } from "../redux/redux";

const Preview = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const update1 = useSelector(state => state.update1)
  const image1 = useSelector(state => state.update1Image)
  const update2 = useSelector(state => state.update2)
  const image2 = useSelector(state => state.update2Image)
  const update3 = useSelector(state => state.update3)
  const image3 = useSelector(state => state.update3Image)
  const update4 = useSelector(state => state.update4)
  const image4 = useSelector(state => state.update4Image)
  const update5 = useSelector(state => state.update5)
  const image5 = useSelector(state => state.update5Image)
  const submitted = useSelector(state => state.updateSubmitted)

  const handleBack = () => {
    submitted ? navigation.navigate('Home') : navigation.goBack()
  }

  const handleConfirm = () => {
    dispatch(setUpdateSubmitted(true))
    navigation.navigate('Confirmation')
  }

  const data = [
    { id: 1, uri: image1, text: update1 },
    { id: 2, uri: image2, text: update2 },
    { id: 3, uri: image3, text: update3 },
    { id: 4, uri: image4, text: update4 },
    { id: 5, uri: image5, text: update5 },
  ]

  const renderImage = ({ item }) => {
      return (
        <View key={item.id}>
          <Image source={{ uri: item.uri }} style={styles.image} />
          <Text style={styles.text}>{item.text}</Text>
        </View>
      )
  }


  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back-outline" size='25' />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>Your Last Month</Text>
      </View>
      <SafeAreaView style={styles.contentWrapper}>
        <FlatList data={data} renderItem={renderImage} />
      </SafeAreaView>
      {
        !submitted ? (
          <View style={styles.nextButtonWrapper}>
            <TouchableOpacity style={styles.nextButton} onPress={handleConfirm}>
              <Text style={styles.nextButtonText}>Submit</Text>
              <Ionicons name="arrow-forward-outline" size='25' />
            </TouchableOpacity>
          </View>
        ) : null
      }
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
  },
  image: {
    height: 200,
    width: '100%',
    borderRadius: 8,
    marginBottom: '5%',
  },
  text: {
    marginBottom: '10%',
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
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    marginRight: 10,
    marginTop: 2.5,
  },
})

export default Preview
