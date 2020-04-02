/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import AppNavigation from './navigation/AppNavigation';
console.reportErrorsAsExceptions = false;
export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={'#664fc6'} translucent={false} barStyle={'light-content'}/>
        <AppNavigation/>
      </View>
    );
  }
}