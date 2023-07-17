import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { Provider } from "react-redux"
import { store } from './redux/redux'


// screens
import Home from './screens/other/Home'
import EmailList from "./screens/email/EmailList"
import UpdateSelect from "./screens/update/UpdateSelect"
import Login from './screens/authentication/Login'
import Register from './screens/authentication/Register'
import Update1 from "./screens/update/Update1"
import Update2 from "./screens/update/Update2"
import Update3 from "./screens/update/Update3"
import Update4 from "./screens/update/Update4"
import Goals from "./screens/update/Goals"
import GoalsTracker from "./screens/other/GoalsTracker"
import Preview from "./screens/other/Preview"
import Confirmation from "./screens/other/Confirmation"

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
          <Stack.Screen options={{ headerShown: false }} name="Update1" component={Update1} />
          <Stack.Screen options={{ headerShown: false }} name="Update2" component={Update2} />
          <Stack.Screen options={{ headerShown: false }} name="Update3" component={Update3} />
          <Stack.Screen options={{ headerShown: false }} name="Update4" component={Update4} />
          <Stack.Screen options={{ headerShown: false }} name="Goals" component={Goals} />
          <Stack.Screen options={{ headerShown: false }} name="GoalsTracker" component={GoalsTracker} />
          <Stack.Screen options={{ headerShown: false }} name="Preview" component={Preview} />
          <Stack.Screen options={{ headerShown: false }} name="Confirmation" component={Confirmation} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
