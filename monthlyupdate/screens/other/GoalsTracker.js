import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../Firebase';

const GoalsTracker = () => {// assuming these params are passed from the previous screen
  const [goals, setGoals] = useState([]);
  const navigation = useNavigation();
  const email = auth.currentUser.email
  const currentPeriod = new Date().toLocaleString('default', { month: 'long', year: 'numeric' }).split(" ").join("");

  useEffect(() => {
    const fetchGoals = async () => {
      const docRef = doc(db, 'goals', `${email}-${currentPeriod}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setGoals([data.goal1, data.goal2, data.goal3]);
      }
    };

    fetchGoals();
  }, [email, currentPeriod]);

  const handleBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={handleBack}>
          <Text>Back</Text>
        </TouchableOpacity>
        <FlatList
          data={goals}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles= StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 100,
    },
})


export default GoalsTracker
