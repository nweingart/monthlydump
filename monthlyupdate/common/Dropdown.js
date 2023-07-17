import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const Dropdown = ({ number, option1, option2, option3, option4 }) => {
  const options = [option1, option2, option3, option4];
  const [selectedOption, setSelectedOption] = useState(options[number]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setSelectedOption(options[number]);
  }, [number]);


  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedOption(item);
        setModalVisible(false);
        console.log(item, index + 1)
        navigation.navigate(`Update${index + 1}`);
      }}>
      <Text style={styles.modalText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.text}>{selectedOption}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.modalContainer}>
          <FlatList
            data={options}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  dropdown: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 10
  },
  item: {
    backgroundColor: '#ACECC2',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ACECC2',
  },
  modalText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    marginTop: 200,
    backgroundColor: '#fff',
  },
});

export default Dropdown
