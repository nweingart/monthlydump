import React from 'react'
import {Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native'
import { auth } from '../Firebase'
import {useNavigation} from "@react-navigation/native";
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const navigation = useNavigation()

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })
    return unsubscribe
  }, [])

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user
        console.log(`logged in with email ${user.email}`)
      })
      .catch(error => alert(error.message))
  }

  const handleRegister = () => {
    navigation.replace("Register")
  }

  return (
    <KeyboardAvoidingView
      platform="ios"
      style={styles.container}
      behavior="padding"
    >
      <View>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#ACECC2', marginBottom: 25 }}>Monthly Dump</Text>
      </View>
      <View>
        <Image source={require('../assets/logo.png')} style={{ height: 100, width: 100, marginBottom: 50 }}/>
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.register}>
        <Text style={styles.bottomText} onPress={handleRegister}>
          New to Monthly Dump? Tap here to sign up
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
    borderRadius: 10,
    marginTop: 5,
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

export default Login
