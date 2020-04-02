import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Images from '../library/Images';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Splash extends Component {
  constructor(props) {
    super(props)
    this.state= {

    }
  }

  componentDidMount() {
    setTimeout(() => {
      const navigation = this.props.navigation;
      const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'HomePage' })],
      });
      navigation.dispatch(resetAction)
    },3000)
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#664fc6', alignItems:'center', justifyContent: 'center',}}>
        <View style={{borderWidth: 2, borderColor: '#fff', borderRadius: 100}}>
          <Image source={Images.Logo} style={{height: 150, width: 150}}/>
        </View>
      </View>
    );
  }
}
