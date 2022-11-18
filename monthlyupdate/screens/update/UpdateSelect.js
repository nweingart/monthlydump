import React, { useState } from 'react'

// component imports
import {Text, TouchableOpacity, View} from 'react-native'
import SelectBox from 'react-native-multi-selectbox'

// logic imports
import { xorBy } from 'lodash'
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

// redux imports
import { setUpdateField1, setUpdateField2, setUpdateField3, setUpdateField4, setUpdateField5 } from '../../redux/redux'


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
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select Updates</Text>
      <SelectBox
        multiOptionContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
        multiOptionsLabelStyle={{ color: 'black', padding: 10 }}
        label="Select multiple"
        options={OPTIONS}
        selectedValues={selectedItems}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      />
      <Text>You have {selectedItems.length} / out of 5 items selected!</Text>
      <Text style={{ color: 'red'}}>{ selectedItems.length > 5 ? 'You may only select 5 items per update!' : null}</Text>
      <TouchableOpacity disabled={selectedItems.length !== 5} style={{ backgroundColor: 'black'}} onPress={handleNext}>
        <Text style={{ color: 'white'}}>Next</Text>
      </TouchableOpacity>
    </View>
  )

  function onMultiChange() {
    return (item) => setSelectedItems(xorBy(selectedItems, [item], 'id'))
  }

}

export default UpdateSelect
