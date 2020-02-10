import React from 'react';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import LoginComponent from './Components/LoginComponent'
import TermsAndConditionComponent from './Components/TermsAndConditionComponent'
import ListingComponent from './Components/ListingComponent'
import SettingComponent from './Components/SettingComponent'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'

const HomeStack = createBottomTabNavigator(
  {
      Listing: ListingComponent,
      setting: SettingComponent
  },
  {
    initialRouteName: 'Listing',
    }
);

const LoginStack = createSwitchNavigator(
  {
    Login: LoginComponent,
    TandC: TermsAndConditionComponent
  },
  {
    navigationOptions: {
      headerShown: false
    },
  }
);
export default createAppContainer (
  createStackNavigator (
    {
      LoginSwitch: LoginStack,
      home: HomeStack
    },
    {
      initialRouteName: 'LoginSwitch',
      mode: 'card'
   }
  )
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
});
