import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView,
  LayoutAnimation,
  UIManager } from 'react-native';

import Carousel from 'react-native-snap-carousel';

export default class App extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              title:"Item 1",
              text: "Text 1",
          },
          {
              title:"Item 2",
              text: "Text 2",
          },
          {
              title:"Item 3",
              text: "Text 3",
          },
          {
              title:"Item 4",
              text: "Text 4",
          },
          {
              title:"Item 5",
              text: "Text 5",
          },
          {
              title:"Item 6",
              text: "Text 6",
          },
          {
              title:"Item 7",
              text: "Text 7",
          },
          {
              title:"Item 8",
              text: "Text 8",
          }
        ]
      }
    }

    loadOneMore = (index) => {
      const arrLength = this.state.carouselItems.length;
      if(arrLength - index < 4){
        const newIndex = arrLength+1;
        const header = 'Item ' + (newIndex);
        const text = 'Text ' + (newIndex);
        
        this.setState({
          carouselItems: this.state.carouselItems.concat([{title:header, text:text}])
        })
      }
    }

    _renderItem({item,index}){
        return (
          <View style={{
              backgroundColor:'floralwhite',
              borderRadius: 5,
              height: 400,
              padding: 50,
              marginLeft: 25,
              marginRight: 25, }}>
            <Text style={{fontSize: 30}}>{item.title}</Text>
            <Text>{item.text}</Text>
          </View>

        )
    }

    render() {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        return (
          <SafeAreaView style={{flex: 1, backgroundColor:'rebeccapurple', paddingTop: 50, }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"tinder"}
                  layoutCardOffset={50}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems ? this.state.carouselItems : null}
                  sliderWidth={300}
                  sliderHeight={1000}
                  itemWidth={370}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => {this.setState({activeIndex:index}); this.loadOneMore(index)} } />
            </View>
          </SafeAreaView>
        );
    }
}

