import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ImageBackground, TouchableOpacity, RefreshControl, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Array from '../library/Arrays';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Constant from '../library/Constants';

export default class ListCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listData: [],
        test: 0,
        isFetching: false,
        isLoading: false,
    };
  }

  componentDidMount() {
    this.onRefresh()
  }

  onRefresh() {
    this.getDataStorage()
  }

  async getDataStorage() {
    this.setState({isLoading: this.state.test == 0? true: false})
    var dataLike = await AsyncStorage.getItem(Constant.Love)
    var dataBook = await AsyncStorage.getItem(Constant.Book)
    var listData = Array.ListData.map((item, index) => {
        item.booked = dataBook == null? false : (JSON.parse(dataBook).includes(item.id)? true : false)
        item.loved =  dataLike == null? false : (JSON.parse(dataLike).includes(item.id)? true : false)
        return item
    })
    this.setState({listData}, () => {
        setTimeout(() => {this.setState({isLoading: false, isFetching: false, test: 1})},500)
    })
  }

  handlePercen(totalBook, totalTrans) {
    var value = Number(totalTrans/totalBook*100).toFixed(0) + '%'
    return value
  }

  handleColor(category) {
    var color = ''
    if (category == 'Sport') {
        color = 'green'
    } else if (category == 'Travel') {
        color = 'pink'
    } else if (category == 'Restaurant') {
        color = 'red'
    } else {
        color = 'blue'
    }
    return color
  }

  handleLiked(id) {
    var indexId = this.state.listData.findIndex((item) => item.id == id)
    var listDataCopy = Object.assign([], this.state.listData)
    listDataCopy[indexId].loved = !listDataCopy[indexId].loved
    this.setState({listData: listDataCopy}, () => {
        this.setDataStorage(id, 'liked')
    })
  }

  async setDataStorage(id, type) {
    var dataLoved = await AsyncStorage.getItem(type == 'liked'? Constant.Love : Constant.Book)
    var newData = []
    if (dataLoved == null) {
        newData.push(id)
        AsyncStorage.setItem(type == 'liked'? Constant.Love : Constant.Book, JSON.stringify(newData))
    } else {
        var dataLoved2 = JSON.parse(dataLoved)
        dataLoved2.map((item, index) => {
            newData.push(item)
        })
        setTimeout(()=>{
            var indexDelete = newData.findIndex((val) => val == id)
            if (indexDelete != -1) {
                newData.splice(indexDelete,1)
            } else {
                newData.push(id)
            }
            AsyncStorage.setItem(type == 'liked'? Constant.Love : Constant.Book, JSON.stringify(newData))
        },300)
    }
  }

  handleBooked(id) {
    var indexId = this.state.listData.findIndex((item) => item.id == id)
    var listDataCopy = Object.assign([], this.state.listData)
    listDataCopy[indexId].booked = !listDataCopy[indexId].booked
    this.setState({listData: listDataCopy}, () => {
        this.setDataStorage(id, 'booked')
    })
  }

  handleBallSize(totalBook, totalTrans) {
    var size = 5
    var total = Number(totalTrans/totalBook*100).toFixed(0)
    if (total <= 15) {
        size = 10
    } else if (total <= 25) {
        size = 15
    } else if (total <= 50) {
        size = 20
    } else if (total > 50) {
        size = 25
    } else {
        size
    }
    return size
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor:'white'}}>
        {this.state.isLoading? 
        <View style={{height: '100%', alignItems:'center', justifyContent: 'center',}}>
            <ActivityIndicator size="large" color="purple" />
            <Text style={{fontStyle:'italic', marginTop: 5}}>No data found..</Text>
        </View>
        :
        <ScrollView 
          showsVerticalScrollIndicator={false}
          ref={(scrollView) => { this.scrollView2 = scrollView; }}
          refreshControl={
            <RefreshControl
                onRefresh={() => this.setState({isFetching: true}, () => this.onRefresh())}
                refreshing={this.state.isFetching}
            />
          }
          >
            {this.state.listData.map((item,index) => {
              return (
                <View key={index} style={{width: "100%", marginTop: index == 0? 0 : 20, marginBottom: index == 3? 25: 0, backgroundColor:'white'}}>
                    <View style={{backgroundColor:'white', margin: 10, elevation: 3.5, borderRadius: 10}}>
                        <ImageBackground source={item.image} style={{width:'100%', height: 250, justifyContent:'space-between'}} imageStyle={{borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
                            <View style={{width: '100%', flexDirection: 'row', justifyContent:'space-between', padding: 10}}>
                                <View style={{flexDirection:'row', backgroundColor:'green', alignSelf:'center', alignItems:'center', paddingVertical: 2, paddingHorizontal: 10, borderRadius: 25}}>
                                    <Ionicons name={'ios-star'} size={13} color={'#fff'}/>
                                    <Text style={{marginLeft: 5, color: '#fff'}}>{item.rating}</Text> 
                                </View>
                                <TouchableOpacity onPress={() => this.handleLiked(item.id)}>
                                    <Ionicons name={item.loved? 'ios-heart' : 'ios-heart-empty'} size={30} color={item.loved? 'red' : '#fff'}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection:'row', width: '100%', backgroundColor:'transparent'}}>
                                <View style={{backgroundColor: this.handleColor(item.category), paddingHorizontal: 5, borderTopRightRadius: 25,}}>
                                    <Text style={{fontStyle:'italic', color:'#fff', marginLeft: 5, fontWeight:'bold', marginRight: 10}}>{item.category}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                        <View style={{paddingVertical: 10, width:'100%', paddingLeft: 15, borderRadius: -20, backgroundColor:'white', height: 100}}>
                            <Text style={{fontSize: 16, fontWeight:'bold'}}>{item.name}</Text>
                            <Text style={{fontSize: 12, color:'gray', fontWeight:'bold', marginTop: 5}}>{item.address}</Text>
                            <Text style={{fontSize: 12, color:'gray', marginTop: 3}}>{item.type}</Text>
                        </View>
                        <View style={{width:'100%', paddingHorizontal: 10, paddingTop: 5, backgroundColor:'#fafafa', borderTopWidth: 0, borderTopColor: '#e3e3e3', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                            <View style={{width:'100%', flexDirection:'row', justifyContent: 'space-around'}}>
                                {item.behavior.map((items,indexs) => {
                                    return (
                                        <View style={{alignItems:'center', justifyContent: 'flex-end', padding: 5}} key={indexs}>
                                            <View style={{alignItems:'center'}}>
                                                <Text style={{fontSize: 12, fontStyle:'italic', color: 'purple'}}>{this.handlePercen(item.totalBook,items.transaction)}</Text>
                                                <View style={{width: this.handleBallSize(item.totalBook,items.transaction), height: this.handleBallSize(item.totalBook,items.transaction), borderRadius: this.handleBallSize(item.totalBook,items.transaction), backgroundColor: 'purple'}}/>
                                            </View>
                                            <Text style={{fontSize: 10, fontStyle:'italic', marginTop: 5}}>{items.hour}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                            <Text style={{alignSelf:'center', marginTop: 5, marginBottom: 5, fontStyle:'italic', fontSize: 14}}>Booked {<Text style={{fontWeight:'bold'}}>{item.totalBook}</Text>} times</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.handleBooked(item.id)} activeOpacity={.5} style={{backgroundColor:'white', alignItems:'center', padding: 10, justifyContent:'center', borderTopWidth: .5, borderTopColor: '#e3e3e3', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                            <Text style={{fontSize: 16, color: 'orange', fontWeight:'bold'}}>{item.booked? 'BOOKED' : 'BOOK NOW'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
              )
            })}
        </ScrollView>}
      </View>
    );
  }
}
