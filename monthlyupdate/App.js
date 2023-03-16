import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { Provider } from "react-redux"
import { store } from './redux/redux'


// screens
import Home from './screens/Home'
import EmailList from "./screens/EmailList"
import UpdateSelect from "./screens/update/UpdateSelect"
import Login from './screens/Login'
import Register from './screens/Register'
import UpdateField1 from "./screens/update/UpdateField1"
import UpdateField2 from "./screens/update/UpdateField2"
import UpdateField3 from "./screens/update/UpdateField3"
import UpdateField4 from "./screens/update/UpdateField4"
import Goals from "./screens/update/Goals"
import Preview from "./screens/Preview"
import Confirmation from "./screens/Confirmation"

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Register"  component={Register} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
          <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
          <Stack.Screen options={{ headerShown: false }} name="EmailList" component={EmailList} />
          <Stack.Screen options={{ headerShown: false }} name="UpdateSelect" component={UpdateSelect} />
          <Stack.Screen options={{ headerShown: false }} name="UpdateField1" component={UpdateField1} />
          <Stack.Screen options={{ headerShown: false }} name="UpdateField2" component={UpdateField2} />
          <Stack.Screen options={{ headerShown: false }} name="UpdateField3" component={UpdateField3} />
          <Stack.Screen options={{ headerShown: false }} name="UpdateField4" component={UpdateField4} />
          <Stack.Screen options={{ headerShown: false }} name="Goals" component={Goals} />
          <Stack.Screen options={{ headerShown: false }} name="Preview" component={Preview} />
          <Stack.Screen options={{ headerShown: false }} name="Confirmation" component={Confirmation} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
