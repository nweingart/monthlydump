import React, { useState, useEffect } from 'react'
import {Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import { auth, db, usersRef } from '../../Firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setFirstName } from "../../redux/redux";
import { setDoc, doc } from "firebase/firestore";


const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userFirstName, setUserFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const navigation = useNavigation()
  const dispatch = useDispatch()



  const handleRegister = () => {
    dispatch(setFirstName(userFirstName))
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user
        console.log(`logged in with email ${user.email}`)
        setDoc(doc(db, "users", email), {
          email: email,
          firstName: userFirstName,
          lastName: lastName,
        })
      }).then(() => {
        setDoc(doc(db, "mailingLists", email), {
          mailingList: [email]
        })
    })
      .catch(error => alert(error.message))
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })
    return unsubscribe
  }, [])

  const handleLogin = () => {
    navigation.replace("Login")
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#ACECC2', marginBottom: 25 }}>Monthly Dump</Text>
      </View>
      <View>
        <Image source={require('../../assets/logo.png')} style={{ height: 100, width: 100, marginBottom: 50 }}/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="first name"
          value={userFirstName}
          onChangeText={text => setUserFirstName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="last name"
          value={lastName}
          onChangeText={text => setLastName(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleRegister}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.register}>
        <Text style={styles.bottomText} onPress={handleLogin}>
          Already have an account? Login here
        </Text>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logoWrapper: {
    position: 'absolute',
    top: '20%',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ACECC2',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  register: {
    marginTop: 50,
  },
  bottomText: {
    fontWeight: '700',
    fontSize: 14
  }
})

export default Register
