import React, { Component } from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { FontFamilies, FontSizes, SVGs } from '../../../../constants'
import { SvgXml } from "react-native-svg"

import FollowRow from '../../../tabs/HistoryTab/RowTypes/FollowRow'
import {followData} from '../../../tabs/HistoryTab/data'

import { Isao } from 'react-native-textinput-effects'
import CoinView from '../../../../components/CoinView'
import { LinearGradient } from 'expo-linear-gradient'
import ImageSize from 'react-native-image-size'
import { connect } from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


class GetFollowerScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
        data : null,
        likeCount: 0,
        inputText: null,

        postImageLink : '',
        postImageWidth: 0,
        postImageHeight: 0,
        postImageAspectRatio: 1/3,
        data : followData.data ? followData.data : null,
      };
  }

  componentDidMount() {

        this.props.route.params.imageLink ?
            ImageSize.getSize(this.props.route.params.imageLink).then(size => {
                this.setState({ postImageLink: this.props.route.params.imageLink, postImageAspectRatio:size.width/size.height, postImageWidth : size.width, postImageHeight : size.height})
            })
        :
            null            
  }

  inputOnFocus() {
    this._postRef.measure( (fx, fy, width, height, px, py) => {
      this._flatList.scrollToOffset({
          offset: height,
          animated: true
      })
    })      
  }

  inputOnBlur() {
    this._flatList.scrollToOffset({
        offset: 0,
        animated: true
    })
  }

  renderHeader = () => (
    <View style={{
      backgroundColor:this.props.themeColors.screenBackground}}> 
        <View style={{backgroundColor:this.props.themeColors.spendHeaderBackground, borderRadius:16, marginTop:12, marginHorizontal:12,
          shadowColor: this.props.themeColors.rowShadow,
          shadowOffset: {
              width: 0,
              height: 0,
          },
          shadowOpacity: .2,
          shadowRadius: 8}}>
          <View style={{ justifyContent:'center', alignItems:'center', padding:8, paddingTop:25}}>           
              <Text style={{fontSize:25, fontFamily:FontFamilies.settingsRowContent, marginBottom:10, color:this.props.themeColors.headerTitle, textAlign:'center'}}>
                Takipçi<Text style={{fontSize:27,  fontFamily: FontFamilies.settingsRowTitle, textTransform:'capitalize'}}> Al</Text> 
              </Text>
              <Text style={{fontSize:15, paddingHorizontal:10, fontFamily:FontFamilies.historyTitle, color:this.props.themeColors.headerDesc, textAlign:'center', lineHeight:23}}>
                  İstediğin miktarı girerek seçtiğin gönderiye takipçi alabilirsin, takipçi başına <Text style={{color:this.props.themeColors.coinText, fontSize:17,  fontFamily: FontFamilies.settingsRowTitle, textTransform:'capitalize'}}> 150 Kredi</Text> ödersin.
              </Text>
          </View>
          <View  collapsable={false} ref={(ref) => { this._postRef = ref; }} />
          <View style={styles.buyFieldView}>        
            <View style={{width:'100%', alignContent:'center', paddingHorizontal:20, marginTop:10, borderWidth:0}}>
              <Isao
                onChangeText={ (text) => { this.setState({ likeCount: text ? text : 0}) }}
                keyboardType={'numeric'}
                label={'Takipçi Sayısı Giriniz'}
                borderHeight={3}
                inputPadding={16}
                labelHeight={40}
                activeColor={this.props.themeColors.spendInputActive}
                passiveColor={this.props.themeColors.spendInputPassive}
                onFocus={ () => this.inputOnFocus() }
                onBlur={ () => this.inputOnBlur() }
                inputStyle={{color:this.props.themeColors.spendInputTitleLabel, textAlign:'center', fontSize:30, fontFamily:FontFamilies.historyTitle}}
                labelStyle={{fontSize:18, paddingTop:10, textAlign:'center', marginLeft:-16}}
                />
            </View>
            
            <View style={{marginVertical:10, alignItems:'center'}}>
                <CoinView width={22} size={26} price={-Number(this.state.likeCount)*10}/>
            </View>
            <TouchableOpacity disabled={this.state.likeCount == "0 "} style={{marginTop:10, opacity:this.state.likeCount == "0" ? 0.5 : 1, width:"100%", flexDirection:"row"}} >
              <View style={{height:60, flex:1, textAlign:'center', backgroundColor:this.props.themeColors.spendButtonBackground, borderBottomLeftRadius:16, borderBottomRightRadius:16, alignContent:'center', justifyContent:'center'}}>
                <Text style={{textAlign:'center', fontFamily:FontFamilies.globalButton, color:this.props.themeColors.spendButtonTitle, fontSize:FontSizes.globalButton}}>{" TAKİPÇİ SATIN AL"}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {
            <View style={{justifyContent:'center', alignItems:'center', padding:8, marginTop:24, paddingTop:20, backgroundColor:this.props.themeColors.screenBackground}}>           
                <View style={{marginBottom:10}}>
                    <SvgXml width='40' height='40' fill={this.props.themeColors.headerTitle} xml={'<svg id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m487.509 148.958-27.223 12.607c14.408 31.111 21.714 62.884 21.714 94.435 0 124.617-101.383 226-226 226-45.471 0-89.303-14-127.548-40.596 5.926-15.989 2.489-34.692-10.338-47.519-17.545-17.545-46.095-17.544-63.64 0-17.546 17.545-17.546 46.094 0 63.64 14.757 14.758 37.36 17.137 54.648 6.965 43.801 31.118 94.333 47.51 146.878 47.51 140.959 0 256-115.049 256-256 0-35.937-8.24-71.951-24.491-107.042zm-390.608 287.355c-5.849 5.849-15.363 5.85-21.214 0-5.849-5.849-5.849-15.365 0-21.213 5.847-5.848 15.364-5.85 21.214 0 5.849 5.847 5.849 15.364 0 21.213z"/><path d="m331 196v-45h30v-30h-210v30h30v45c0 24.508 11.818 46.305 30.052 60-18.234 13.695-30.052 35.492-30.052 60v45h-30v30h210v-30h-30v-45c0-24.508-11.818-46.305-30.052-60 18.234-13.695 30.052-35.492 30.052-60zm-30 120v45h-90v-45c0-24.813 20.187-45 45-45s45 20.187 45 45zm0-120c0 24.813-20.187 45-45 45s-45-20.187-45-45v-45h90z"/><path d="m393.886 118.115c17.544 17.544 46.094 17.545 63.64 0s17.546-46.095 0-63.64c-14.791-14.791-37.402-17.113-54.648-6.965-43.801-31.118-94.333-47.51-146.878-47.51-140.959 0-256 115.049-256 256 0 35.937 8.24 71.951 24.491 107.042l27.223-12.607c-14.408-31.111-21.714-62.884-21.714-94.435 0-124.617 101.383-226 226-226 45.471 0 89.303 14 127.548 40.596-5.926 15.989-2.489 34.692 10.338 47.519zm21.213-42.427c5.849-5.848 15.364-5.849 21.214 0 5.849 5.849 5.849 15.365 0 21.213-5.849 5.849-15.365 5.85-21.214 0-5.849-5.848-5.849-15.365 0-21.213z"/></g></svg>' }></SvgXml>
                </View>
                <Text style={{fontSize:25, fontFamily:FontFamilies.settingsRowContent, marginBottom:10, color:this.props.themeColors.headerTitle, textAlign:'center'}}>
                  <Text style={{fontSize:27,  fontFamily: FontFamilies.settingsRowTitle, textTransform:'capitalize'}}>Takipçi</Text> Hareketleri
                </Text>
                <Text style={{fontSize:15, paddingHorizontal:10, fontFamily:FontFamilies.historyTitle, color:this.props.themeColors.headerDesc, textAlign:'center'}}>
                    Aktif hareketlerle ilgili değişiklik yapmak için "Hareketler" sekmesine gidebilirsiniz.
                </Text>
            </View>
        }
    </View>
    );

  render() {
    return (
        <SafeAreaView style={{backgroundColor:this.props.themeColors.screenBackground}}>
          <FlatList 
              ref={(ref) => { this._flatList = ref; }}
              data={this.state.data}
              onScrollBeginDrag={this.onScroll}
              style={{}}
              renderItem={({ item }) => <FollowRow item={item} isDone={item.done/item.total == 1} /> }
              keyExtractor={item => item.id.toString()}
              scrollToOverflowEnabled={true}
              ListHeaderComponent={this.renderHeader}
              contentContainerStyle={{
                  paddingBottom: 75,
              }}
              showsHorizontalScrollIndicator={false} 
              showsVerticalScrollIndicator={false}
              numColumns={1}
          />
        </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeColors: state.colorReducer.themeColors
  }
}
export default connect(mapStateToProps)(GetFollowerScreen);

const styles = StyleSheet.create({
    buyFieldView: {
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
    },
})