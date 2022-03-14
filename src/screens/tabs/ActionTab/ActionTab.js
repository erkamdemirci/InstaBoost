import React, { Component } from "react";
import { View, Text, FlatList, SafeAreaView, Dimensions, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar, LogBox } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { SVGs, FontFamilies, FontSizes } from '../../../constants';
import { SvgXml } from "react-native-svg";
import { LinearGradient } from 'expo-linear-gradient';
import TabView from './ActionTabsView';
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const headerViewHeight = windowHeight-250;

class ActionTab extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      scrollViewRef: null,
      tabIndex: 0,
      protectPrivacy: true,
      hidePhotos: false,
      arrowDirectionUp: true,
      earnData: [
        {
          id: 0,
          color:this.props.themeColors.likeMain,
          price: 30,
          screen:'EarnLike',
          iconSVG: SVGs.likeUncolored,
          title: "Beğeni Yap",
          content: "Başkalarının gönderilerine beğeni yaparak, beğeni başına kredi kazanmak için tıkla!",
        },
        {
          id: 1,
          price: 100,
          screen:'EarnFollow',
          color:this.props.themeColors.followMain,
          iconSVG: SVGs.followUncolored,
          title: "Takip Et",
          content: "Başkalarını takip ederek, takip başına kredi kazanmak için tıkla!",
        },
        {
          id: 2,
          price: 50,
          screen:'EarnComment',
          color:this.props.themeColors.commentMain,
          iconSVG: SVGs.commentUncolored,
          title: "Yorum Yaz",
          content: "Başkalarının gönderilerine yorum yaparak, yorum başına kredi kazanmak için tıkla!",
        },
        {
          id: 3,
          price: 40,
          screen:'EarnCollection',
          color:this.props.themeColors.collectionMain,
          iconSVG: SVGs.collectionUncolored,
          title: "Koleksiyona Ekle",
          content: "Başkalarının gönderilerini koleksiyona ekleyerek, koleksiyon başına kredi kazanmak için tıkla!",
        },
        {
          id: 4,
          price: 300,
          screen:'EarnAd',
          color:this.props.themeColors.videoAdMain,
          iconSVG: '<svg height="472pt" viewBox="0 -87 472 472" width="472pt" xmlns="http://www.w3.org/2000/svg"><path d="m467.101562 26.527344c-3.039062-1.800782-6.796874-1.871094-9.898437-.179688l-108.296875 59.132813v-35.480469c-.03125-27.601562-22.398438-49.96875-50-50h-248.90625c-27.601562.03125-49.96875 22.398438-50 50v197.421875c.03125 27.601563 22.398438 49.96875 50 50h248.90625c27.601562-.03125 49.96875-22.398437 50-50v-34.835937l108.300781 59.132812c3.097657 1.691406 6.859375 1.625 9.894531-.175781 3.039063-1.804688 4.898438-5.074219 4.898438-8.601563v-227.816406c0-3.53125-1.863281-6.796875-4.898438-8.597656zm-138.203124 220.898437c-.015626 16.5625-13.4375 29.980469-30 30h-248.898438c-16.5625-.019531-29.980469-13.4375-30-30v-197.425781c.019531-16.558594 13.4375-29.980469 30-30h248.90625c16.558594.019531 29.980469 13.441406 30 30zm123.101562-1.335937-103.09375-56.289063v-81.535156l103.09375-56.285156zm0 0"/></svg>',
          title: "Video İzle",
          content: "Tanıtım videoları izleyerek kredi kazanmak için tıkla!",
        },
      ],

      spendData: [
        {
          id: 5,
          type: 'Like',
          screen:'ChoosePost',
          secondScreen: 'GetLikeScreen',
          color:this.props.themeColors.likeMain,
          price: 30,
          iconSVG: SVGs.likeUncolored,
          title: "Beğeni Al",
          content: "Başkalarının gönderilerine beğeni yaparak, beğeni başına kredi kazanmak için tıkla!",
        },
        {
          id: 6,
          type: 'Follower',
          price: 100,
          screen:'GetFollowerScreen',
          color:this.props.themeColors.followMain,
          iconSVG: SVGs.followUncolored,
          title: "Takipçi Al",
          content: "Başkalarını takip ederek, takip başına kredi kazanmak için tıkla!",
        },
        {
          id: 7,
          type: 'Comment',
          price: 50,
          screen:'ChoosePost',
          secondScreen: 'GetCommentScreen',
          color:this.props.themeColors.commentMain,
          iconSVG: SVGs.commentUncolored,
          title: "Yorum Al",
          content: "Başkalarının gönderilerine yorum yaparak, yorum başına kredi kazanmak için tıkla!",
        },
        {
          id: 8,
          type: 'Collection',
          price: 40,
          screen:'ChoosePost',
          secondScreen: 'GetCollectionScreen',
          color:this.props.themeColors.collectionMain,
          iconSVG: SVGs.collectionUncolored,
          title: "Koleksiyon Al",
          content: "Başkalarının gönderilerini koleksiyona ekleyerek, koleksiyon başına kredi kazanmak için tıkla!",
        }
      ],

      rainAnimation : false
    };
  }

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

  arrowDidTapped() {
    this.setState({
      arrowDirectionUp : !this.state.arrowDirectionUp}, 
      () => {
        this.state.scrollViewRef.scrollTo({x: 0, y: !this.state.arrowDirectionUp ? headerViewHeight-20 : 0, animated: true}
      )
    })
  }

  renderHeader = () => {
      return <View style={{justifyContent:'center', alignItems:'center', flex:1, height:60, justifyContent:'center', bottom:-12, backgroundColor:this.props.themeColors.actionTabBackground,
      borderTopLeftRadius:25,
      borderTopRightRadius:25,
      shadowColor: this.props.themeColors.rowShadow,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 6.84,
      elevation: 0}}>
          <TouchableOpacity activeOpacity={1} onPress={() => this.arrowDidTapped()} style={{top:-20,transform: [{ rotate: this.state.arrowDirectionUp ? '-90deg' : '+90deg'}], backgroundColor:this.props.themeColors.actionTabBackground, padding:15, borderRadius:50,
      shadowColor: this.props.themeColors.rowShadow,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 6.84,
      elevation: 0}}>
            <SvgXml style={{opacity:0.7}} width='30' height='30' xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 447.976 447.976" style="enable-background:new 0 0 447.976 447.976;" xml:space="preserve"><g>	<path style="fill:'+this.props.themeColors.themeBlue2+';" d="M433.936,190.044l-128-128c-18.752-18.752-49.12-18.752-67.872,0		c-18.752,18.72-18.752,49.152,0,67.872l94.048,94.08l-94.048,94.048c-18.752,18.752-18.752,49.12,0,67.872		c9.344,9.408,21.632,14.08,33.92,14.08s24.576-4.672,33.952-14.048l128-128C452.656,239.196,452.656,208.796,433.936,190.044z"/>	<path style="fill:'+this.props.themeColors.themeBlue+';" d="M209.936,190.044l-128-128c-18.752-18.752-49.12-18.752-67.872,0		c-18.752,18.72-18.752,49.152,0,67.872l94.048,94.08l-94.048,94.048c-18.752,18.752-18.752,49.12,0,67.872		c9.344,9.408,21.632,14.08,33.92,14.08s24.576-4.672,33.952-14.048l128-128C228.656,239.196,228.656,208.796,209.936,190.044z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'}></SvgXml>
          </TouchableOpacity>
      </View>;
  };

  tabChangeCallback = (index) => {
    this.setState({tabIndex:index})
    this.state.arrowDirectionUp &&
    this.setState({
      arrowDirectionUp : !this.state.arrowDirectionUp}, 
      ()=>{
        this.state.scrollViewRef.scrollTo({x: 0, y: !this.state.arrowDirectionUp ? headerViewHeight-20 : 0, animated: true}
      )
    })
  }

  makeCoinRain = (state) => {
    this.setState({rainAnimation:state}, () => setTimeout(() => {this.setState({rainAnimation: !state})}, 2000))
  }

  render() {
      const { isFocused } = this.props;
      
      return (
          <SafeAreaView style={{flex:1, backgroundColor:this.props.themeColors.actionTabBackground}}>
            {isFocused ? <StatusBar barStyle="light-content" /> : <StatusBar barStyle={this.props.themeColors.statusBar} />}
              <View style={{ backgroundColor:this.props.themeColors.actionTabBackground, width:windowWidth, height:windowHeight, position:'absolute'}}>
                <View style={{width:'100%', height:headerViewHeight, alignItems:'center'}}>
                  <View style={{position:'absolute', top:20, right:10, left:10, alignItems:'center',zIndex:2}}>
                    <Text style={{textShadowColor: this.props.themeColors.actionTabHeaderTextShadow,textShadowOffset: {width: 0, height: 3},textShadowRadius: 2, fontFamily:FontFamilies.actionHeaderTitle, fontSize:FontSizes.actionHeaderTitle, textAlign:'center', color:this.props.themeColors.actionTabTitle}}>Merhaba!</Text>
                    <Text style={{paddingVertical:3, paddingHorizontal:5, textShadowColor: this.props.themeColors.actionTabHeaderTextShadow, textShadowOffset: {width: 0, height: 2},textShadowRadius: 3, fontFamily:FontFamilies.actionHeaderContent, fontSize:FontSizes.actionHeaderContent, textAlign:'center', color:this.props.themeColors.actionTabDesc}}>Kredi kazanmak ya da mevcut kredilerin ile beğeni, takip, yorum ve koleksiyon almak için yukarı kaydır!</Text>
                  </View>
                  <View style={{position:'absolute', height:windowHeight*.2, top:0, left:'-30%', zIndex:0, opacity:.2}}>
                    <Image source={require('../../../../assets/rocket.png')} width={'100%'} height={'100%'} style={{tintColor:this.props.themeColors.screenBackground}} />
                  </View>
                  <Image source={require('../../../../assets/headerImage.png')} style={{ width:'95%', height:'200%', top:'-35%', opacity:1}} resizeMode={'contain'}  />
                  <Image source={require('../../../../assets/LiquidBG.png')} style={{position:'absolute', width:'101%', alignSelf:'center', height:headerViewHeight, top:0, zIndex:-1, opacity:1}} resizeMode={'stretch'}  />
                </View>
              </View>
             
              <ScrollView
                  nestedScrollEnabled
                  ref={ref => { this.setState({scrollViewRef:ref}) }}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                      paddingBottom: 75,
                      paddingTop:headerViewHeight,
                      paddingHorizontal:5,
                  }}>
                {this.renderHeader()}
                {<TabView navigation={this.props.navigation} makeCoinRain={this.makeCoinRain} data={this.state.tabIndex == 0 ? this.state.earnData : this.state.spendData} tabChangeCallback={this.tabChangeCallback}/>}
              </ScrollView>
              
          </SafeAreaView>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    themeColors: state.colorReducer.themeColors
  }
}

function ActionTabF(props) {
  const isFocused = useIsFocused();

  return <ActionTab {...props} isFocused={isFocused} />;
}
export default connect(mapStateToProps)(ActionTabF);

const styles = StyleSheet.create({
})