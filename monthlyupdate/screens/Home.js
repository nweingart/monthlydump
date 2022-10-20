import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

// screens
import Friends from "./Friends"
import Profile from "./Profile"
import Settings from "./Settings"

const Tab = createBottomTabNavigator()

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{ headerShown: false }} name="Friends" component={Friends} />
      <Tab.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
      <Tab.Screen options={{ headerShown: false }} name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default Home
