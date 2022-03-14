import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Dimensions,
  Animated
} from "react-native";

import Carousel from "react-native-snap-carousel";

const { width } = Dimensions.get("window");
const images = [
  {
    uri:
      "https://images.unsplash.com/photo-1573914801487-b7f3ac3ded18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=882&q=80"
  },
  {
    uri:
      "https://images.unsplash.com/photo-1573914801487-b7f3ac3ded18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=882&q=80"
  },
  {
    uri:
      "https://images.unsplash.com/photo-1573914801487-b7f3ac3ded18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=882&q=80"
  }
];


export class Tab4 extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.carouselContainer}>
        <View style={[styles.carouselDisplay, { opacity: 1 }]}>
            <Carousel
              ref={c => (this[`hi`] = c)}
              data={images}
              slideStyle={styles.carousel}
              sliderWidth={width}
              itemWidth={width / 2}
              firstItem={1}
              inactiveSlideOpacity={0.75}
              inactiveSlideScale={0.9}
              renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={1} onPress={() => {alert(1)}}>
                  <Image style={styles.carouselImage} source={item} />
                </TouchableOpacity>
              )}
            />
        </View>
    </View>
    )
  }
}

export default Tab4

const styles = StyleSheet.create({
  carouselContainer: {
    paddingVertical: 12,
    width: "100%"
  },
  carouselDisplay: {
    alignItems: "center"
  },
  carousel: {
    borderRadius: 10,
    overflow: "hidden"
  },
  carouselImage: {
    borderRadius: 10,
    height: 200,
    width: '100%'
  }
});