import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native';

export class GetLikeScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      data:[
        "Text 1",
        "Text 2",
        "Text 3",
        "Text 4",
        "Text 5",
        "Text 2",
        "Text 3",
        "Text 4",
        "Text 5",
        "Text 2",
        "Text 3",
      ]
    }
  }

  _onPress = (item) => {
    this._flatList.scrollToItem({
        animated:true, //can also be false
        item:item, 
        viewPosition:0 //this is the first position that is currently attached to the window
    })
  }

  render() {
    return (
      <FlatList
        ref={(ref) => { this._flatList = ref; }}
        data={this.state.data}
        renderItem={({ item }) => <TouchableOpacity onPress={() => this._onPress(item)} style={{height:100}}><Text>{item}</Text></TouchableOpacity>}
        keyExtractor={item => item}
        />
    )
  }
}

export default GetLikeScreen
