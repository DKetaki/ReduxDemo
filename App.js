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
import { createStore } from 'redux'
import { Provider } from 'react-redux'

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
export const initialState = { payload: [] }
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLUS':
      let addition = parseInt(action.json[action.index].counter)
      action.json[action.index].counter = '' + ++addition
      return { ...state, 
        payload: action.json }
    case 'MINUS':
      let subtract = parseInt(action.json[action.index].counter)
      action.json[action.index].counter = '' + --subtract
      return { payload: action.json }
    default: { payload: action.json }
  }
  return { payload: action.json }
}
const AppContainer = createAppContainer (
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
const store = createStore(reducer)
export default function App() {
  return <Provider store={store}>
    <AppContainer />
  </Provider>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
});
