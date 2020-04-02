import React from 'react'

//Library
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { headerStyle, headerTitleStyle, headerBgStyle } from './NavStyle'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { View, Image, TouchableOpacity } from 'react-native';
import Images from '../library/Images';

//Screen
import Splash from '../container/Splash'
import HomePage from '../container/HomePage'
import ListCategory from '../container/ListCategory'

const MainNavigator = createStackNavigator({
  Splash: { screen: Splash, navigationOptions: { headerShown: false }},
  HomePage: { screen: HomePage, navigationOptions: { headerShown: false }},
  ListCategory: { screen: ListCategory, navigationOptions: { title: 'List Category'}},
}, {
  headerMode: 'screen',
  initialRouteName: 'Splash',
  defaultNavigationOptions: {
    headerStyle,
    ...TransitionPresets.SlideFromRightIOS,
    headerTitleStyle,
    headerBackground: () => (<View style={headerBgStyle}/>),
    headerTintColor: 'white',
    headerBackImage: () => (
      <TouchableOpacity style={{ paddingLeft: 10 }} activeOpacity={.9}>
        <Ionicons name='ios-arrow-back' size={25} color={'#fff'} />
      </TouchableOpacity>
    )
  }
});

export default createAppContainer(MainNavigator);