import React, { useState } from 'react'

// component imports
import {Text, TouchableOpacity, View} from 'react-native'
import SelectBox from 'react-native-multi-selectbox'

// logic imports
import { xorBy } from 'lodash'
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";


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

const onFinish = () => {

}

const UpdateSelect = () => {
  const [selectedTeams, setSelectedTeams] = useState([])
  const dispatch = useDispatch()
  const navigation = useNavigation()
  return (
    <View style={{ padding: 25, backgroundColor: '#ACECC2', height: '100%', width: '100%' }}>
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select Updates</Text>
      <SelectBox
        multiOptionContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
        multiOptionsLabelStyle={{ color: 'black', padding: 10 }}
        label="Select multiple"
        options={OPTIONS}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      />
      <Text>You have {selectedTeams.length} / out of 5 items selected!</Text>
      <Text style={{ color: 'red'}}>{ selectedTeams.length > 5 ? 'You may only select 5 items per update!' : null}</Text>
      <TouchableOpacity disabled={selectedTeams.length > 5} style={{ backgroundColor: 'black'}}>
        <Text style={{ color: 'white'}}>Next</Text>
      </TouchableOpacity>
    </View>
  )

  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
  }

}

export default UpdateSelect
