import React, { useState } from 'react'

// component imports
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native'
import SelectBox from 'react-native-multi-selectbox'

// logic imports
import { xorBy } from 'lodash'
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

// redux imports
import { setUpdateField1, setUpdateField2, setUpdateField3, setUpdateField4, setUpdateField5 } from '../../redux/redux'
import Ionicons from "@expo/vector-icons/Ionicons";


const OPTIONS = [
  {
    item: 'Family',
    id: 'FAM',
  },
  {
    item: 'Friends',
    id: 'FRI',
  },
  {
    item: 'Relationship',
    id: 'REL',
  },
  {
    item: 'Fitness',
    id: 'FIT',
  },
  {
    item: 'Health',
    id: 'HEA',
  },
  {
    item: 'Career',
    id: 'CAR',
  },
  {
    item: 'Hobbies',
    id: 'HOB',
  },
  {
    item: 'Travel',
    id: 'TRV',
  },
]

const UpdateSelect = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }


  const handleNext = () => {
    dispatch(setUpdateField1(selectedItems[0].item))
    dispatch(setUpdateField2(selectedItems[1].item))
    dispatch(setUpdateField3(selectedItems[2].item))
    dispatch(setUpdateField4(selectedItems[3].item))
    dispatch(setUpdateField5(selectedItems[4].item))
    navigation.navigate('UpdateField1')
  }

  console.log(selectedItems[0])

  return (
    <View style={{ padding: 25, backgroundColor: '#ACECC2', height: '100%', width: '100%' }}>
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back-outline" size='25' />
        </TouchableOpacity>
      </View>
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 20, paddingBottom: 10, marginTop: 50 }}>Select Updates</Text>
      <SelectBox
        optionContainerStyle={{ color: '#000' }}
        searchIconColor={'black'}
        toggleIconColor={'black'}
        arrowIconColor={'black'}
        multiOptionContainerStyle={{ backgroundColor: 'white', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10, margin: 5 }}
        multiOptionsLabelStyle={{ color: 'black' }}
        label=""
        options={OPTIONS}
        selectedValues={selectedItems}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      />
      <Text style={{ marginTop: 10 }}>You have {selectedItems.length} / out of 5 items selected!</Text>
      <Text style={{ color: 'red', marginTop: 10, marginBottom: 10 }}>{ selectedItems.length > 5 ? 'You may only select 5 items per update!' : null}</Text>
      <TouchableOpacity style={styles.button} disabled={selectedItems.length !== 5} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  )

  function onMultiChange() {
    return (item) => setSelectedItems(xorBy(selectedItems, [item], 'id'))
  }

}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 6,
    height: 40,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    marginLeft: '45%',
    marginTop: '2.5%',
    fontWeight: 'bold'
  },
  backButtonWrapper: {
    position: 'absolute',
    top: '7.5%',
    left: '7.5%',
  },
})

export default UpdateSelect
