import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export class ExploreOffersTab extends Component {

  _readFromJSOn = () => {
  }

  componentDidMount() {
    this._readFromJSOn()
  }

 

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={{width:200, height:100, backgroundColor:'red'}}>
          <Text>asdfadsf</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

export default ExploreOffersTab

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  }
})