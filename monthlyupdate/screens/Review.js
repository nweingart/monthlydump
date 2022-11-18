import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {useNavigation} from "@react-navigation/native";


const Review = () => {
  const navigation = useNavigation()
  const handleBackClick = () => {
    navigation.navigate("UpdateField5")
  }

  return (
    <View>
      <Text>Review</Text>
      <TouchableOpacity onPress={handleBackClick}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Review
