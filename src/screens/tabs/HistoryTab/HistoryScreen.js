import React, { Component } from 'react'
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { SVGs, FontFamilies, FontSizes } from '../../../constants'
import { SvgXml } from "react-native-svg"

import LikeRow from './RowTypes/LikeRow'
import FollowRow from './RowTypes/FollowRow'
import CommentRow from './RowTypes/CommentRow'
import CollectionRow from './RowTypes/CollectionRow'

import {likeData, commentData, collectionData, followData} from './data'
import Swipeout from 'react-native-swipeout';
import Modal from 'react-native-modal';
import { SwipeRow } from 'react-native-swipe-list-view';
import { LinearGradient } from 'expo-linear-gradient'

import { connect } from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let openRowRefs = {
  "Like": [],
  "Comment": [],
  "Collection": [],
  "Follow": []
}
let openRowType = null
let openRowIndex = null

export class HistoryScreen extends Component {
    constructor(props) {
        super(props);

        this.state = { 
          data : null,
          isModalVisible: false,

          modalItem : null,
          modalTotalSessionCount : null,
          modalDoneSessionCount : null,
        };
        
        switch(this.props.route.name) {
          case 'Like':
            this.state = { 
              data : likeData.data ? likeData.data : null,
            };
            break;
          case 'Comment':
            this.state = { 
              data : commentData.data ? commentData.data : null,
            };
            break;
          case 'Collection':
            this.state = { 
              data : collectionData.data ? collectionData.data : null,
            };
            break;
          case 'Follow':
            this.state = { 
              data : followData.data ? followData.data : null,
            };
            break;
          default:
            return null
            break;
        }

    }

    setSessionCancelButton = (item) => {
      return (
        <View style={{width:75, alignSelf:'flex-end', height:'100%', backgroundColor:this.props.themeColors.screenBackground, justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity onPress={(button)=> {this.toggleModal('open', this.props.route.name, item)}}  style={{width:'70%', left:-5, aspectRatio:1, justifyContent:'center', alignItems:'center', borderRadius:50, borderRadius:20,}}>
            <View>
              <SvgXml width='40' height='40' xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><ellipse style="fill:#E04F5F;" cx="256" cy="256" rx="256" ry="255.832"/><g transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 77.26 32)">	<rect x="3.98" y="-427.615" style="fill:#FFFFFF;" width="55.992" height="285.672"/>	<rect x="-110.828" y="-312.815" style="fill:#FFFFFF;" width="285.672" height="55.992"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'} />
            </View>
          </TouchableOpacity>
        </View>
      )
    }

    conTwoDecDigit = (digit) => {
      return digit%10 == 0 ? digit : digit.toFixed(1)
    }
    
    calculatePrice = (price) => {
        if (price >= 1000 || price <= -1000) return <Text>{price/1000}K</Text>;
        return <Text>{price}</Text>;
    }

    renderHeader = ({ }) => (
      this.props.route.params.type || this.props.type 
        ?
        <View style={{backgroundColor:'transparent', justifyContent:'center', alignItems:'center', padding:8,}}>
          <Text style={{fontSize:25, fontFamily:FontFamilies.settingsRowContent, marginBottom:10, color:this.props.themeColors.headerTitle, textAlign:'center'}}>
              <Text style={{fontSize:27,  fontFamily: FontFamilies.settingsRowTitle, textTransform:'capitalize'}}>{this.props.route.params.type ? this.props.route.params.type : null}</Text> Hareketleri
          </Text>
          <Text style={{fontSize:15, paddingHorizontal:10, fontFamily:FontFamilies.settingsRowTitle, color:this.props.themeColors.headerDesc, textAlign:'center'}}>
              Uygulamayı açık tutmanız devam eden işlemlerin daha çabuk sonuçlanmasını sağlar!
          </Text>
        </View>
        :
        null
      );
    
    renderItem = (item) => {
      const type = this.props.route.name
      const isDone = item.done/item.total == 1 ? true : false
      switch(type) {
        case 'Like':
          return (!isDone ? 
            <SwipeRow friction={5} preview={false} preview={!openRowType && !openRowIndex && item.id == 1 ? true : false } swipeToOpenPercent={10} ref={ref => { openRowRefs[type][item.id] = ref; }} swipeGestureBegan={()=> {openRowType && openRowIndex && !(openRowIndex == item.id && openRowType == type) ? openRowRefs[openRowType][openRowIndex].closeRow() : null; openRowType = type; openRowIndex = item.id;}} closeOnRowPress={false} disableRightSwipe={true} previewOpenValue={-60} previewDuration={150} rightOpenValue={-75}>
                {this.setSessionCancelButton(item)}
              <View>
                <LikeRow item={item} isDone={isDone} />
              </View>
            </SwipeRow> : <LikeRow item={item} isDone={isDone} /> 
            )
          break;
        case 'Comment':
          return (!isDone ? 
            <SwipeRow friction={5} preview={false} preview={!openRowType && !openRowIndex && item.id == 1 ? true : false } swipeToOpenPercent={10} ref={ref => { openRowRefs[type][item.id] = ref; }} swipeGestureBegan={()=> {openRowType && openRowIndex && !(openRowIndex == item.id && openRowType == type) ? openRowRefs[openRowType][openRowIndex].closeRow() : null; openRowType = type; openRowIndex = item.id;}} closeOnRowPress={false} disableRightSwipe={true} previewOpenValue={-60} previewDuration={150} rightOpenValue={-75}>
                {this.setSessionCancelButton(item)}
              <View>
                <CommentRow item={item} isDone={isDone} comments={item.comments} />
              </View>
            </SwipeRow>: <CommentRow item={item} isDone={isDone} />
            )
          break;
        case 'Collection':
          return (!isDone ? 
            <SwipeRow friction={5} preview={false} preview={!openRowType && !openRowIndex && item.id == 1 ? true : false } swipeToOpenPercent={10} ref={ref => { openRowRefs[type][item.id] = ref; }} swipeGestureBegan={()=> {openRowType && openRowIndex && !(openRowIndex == item.id && openRowType == type) ? openRowRefs[openRowType][openRowIndex].closeRow() : null; openRowType = type; openRowIndex = item.id;}} closeOnRowPress={false} disableRightSwipe={true} previewOpenValue={-60} previewDuration={150} rightOpenValue={-75}>
                {this.setSessionCancelButton(item)}
              <View>
                <CollectionRow item={item} isDone={isDone} />
              </View>
            </SwipeRow> : <CollectionRow item={item} isDone={isDone} /> 
          )
          break;
        case 'Follow':
          return (!isDone ? 
            <SwipeRow friction={5} preview={false} preview={!openRowType && !openRowIndex && item.id == 1 ? true : false } swipeToOpenPercent={10} ref={ref => { openRowRefs[type][item.id] = ref; }} swipeGestureBegan={()=> {openRowType && openRowIndex && !(openRowIndex == item.id && openRowType == type) ? openRowRefs[openRowType][openRowIndex].closeRow() : null; openRowType = type; openRowIndex = item.id;}} closeOnRowPress={false} disableRightSwipe={true} previewOpenValue={-60} previewDuration={150} rightOpenValue={-75}>
                {this.setSessionCancelButton(item)}
              <View>
                <FollowRow item={item} isDone={isDone} />
              </View>
            </SwipeRow>: <FollowRow item={item} isDone={isDone} />
          )
          break;
        default:
          return null
          break;
      }
    };

    toggleModal = (action, type, item) => {
        
        if(action == 'open'){
          if(type != 'Follow'){
            Image.getSize(item.postUri, (width, height) => { this.setState({ modalImageAspectRatio : width/height}) } );
          }else{
            this.setState({
              modalImageAspectRatio : null,
            });
          }
          this.setState({
            modalItem : item,
            modalTotalSessionCount : item.total,
            modalDoneSessionCount : item.done,
          });
        }else{
          this.setState({
            modalItem : null,
            modalTotalSessionCount : null,
            modalDoneSessionCount : null,
            modalImageAspectRatio : null,
          });
          
        }
        this.setState({
          isModalVisible : !this.state.isModalVisible,
        });
        
    };

    render() {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: this.props.themeColors.screenBackground}]}>
                <FlatList 
                    data={this.state.data}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={item => item.id.toString()}
                    scrollToOverflowEnabled={true}
                    showsVerticalScrollIndicator ={false}
                    ListHeaderComponent={this.renderHeader}
                    contentContainerStyle={{
                      paddingBottom: 75 
                    }}
                    showsHorizontalScrollIndicator={false} 
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                />
                <Modal isVisible={this.state.isModalVisible} swipeDirection={['down']} swipeThreshold={50} onSwipeComplete={({swipingDirection}) => { this.props.modalActionCallback("close"); } } style={{justifyContent:'center', alignItems:'center'}}>
                {
                        this.state.modalImageAspectRatio != null
                        ?
                        <View style={{marginBottom:15}}>
                        
                          <View style={{width:'100%', maxHeight:windowHeight*0.5, alignSelf:'center', aspectRatio: this.state.modalImageAspectRatio ? this.state.modalImageAspectRatio : 1/3, overflow:'hidden', justifyContent:'flex-start', borderRadius:10, alignItems:'center'}}>
                              <Image style={{ width:'100%', height:'100%' }} resizeMode={'contain'} source={{uri : this.state.modalItem ? this.state.modalItem.postUri : null}} />
                            <LinearGradient
                              // Background Linear Gradient
                                colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.5)','rgba(0,0,0,0.3)','rgba(0,0,0,0.2)']}
                                start={{ x: 0.5, y: 1 }}
                                end={{ x: 0.5, y: 0.6 }}
                                style={{
                                    opacity:1,
                                    position:'absolute',
                                    top:0,
                                    left:0,
                                    bottom:0,
                                    right:0
                                }}
                            />
                          </View>
                          
                          <View style={{flexDirection:'row', marginTop:-45, width:'100%', height:40, backgroundColor:'transparent', borderBottomLeftRadius:10, borderBottomRightRadius:10, 
                            shadowColor: this.props.themeColors.rowShadow,
                            shadowOffset: {
                              width: 0,
                              height: 0,
                            },
                            shadowOpacity: 0.35,
                            shadowRadius: 3.84,
                            elevation: 2}}>
                              <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{flex:0.5}} />
                                <View style={{flex:2, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                  <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                                    <View>
                                      <SvgXml width='20' height='20' fill={this.props.themeColors.white} xml={SVGs.likeUncolored}></SvgXml>
                                    </View>
                                  </View>
                                  <View style={{flex:1.3, paddingLeft:10, justifyContent:'center', alignItems:'flex-start'}}>
                                    <Text style={{fontFamily:'gilroy-Black', fontSize:18, color:this.props.themeColors.white}}>1.2K</Text>
                                  </View>
                                </View>
                                <View style={{flex:3, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                  <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                                    <View>
                                      <SvgXml width='20' height='20' fill={this.props.themeColors.white} xml={SVGs.commentUncolored}></SvgXml>
                                    </View>
                                  </View>
                                  <View style={{flex:1.3, paddingLeft:5, justifyContent:'center', alignItems:'flex-start'}}>
                                    <Text style={{fontFamily:'gilroy-Black', fontSize:18, color:this.props.themeColors.white}}>125</Text>
                                  </View>
                                </View>
                                <View style={{flex:2, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                  <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                                    <View>
                                      <SvgXml width='20' height='20' fill={this.props.themeColors.white} xml={SVGs.collectionUncolored}></SvgXml>
                                    </View>
                                  </View>
                                  <View style={{flex:1.3, paddingLeft:5, justifyContent:'center', alignItems:'flex-start'}}>
                                    <Text style={{fontFamily:'gilroy-Black', fontSize:18, color:this.props.themeColors.white}}>500</Text>
                                  </View>
                                </View>
                                <View style={{flex:0.5}} />
                              </View>
                          </View>
                        </View>
                        :
                        null
                      }
                  <View style={styles.modalView}>
                    <View style={{width:'100%', alignSelf:'center', padding:5, flexDirection:'column'}}>
                      <View style={{width:'100%'}}>
                        <View style={{alignSelf:'stretch', justifyContent:'flex-start', paddingVertical:10}}>
                          <Text style={{color:this.props.themeColors.black, lineHeight:25, fontFamily: 'gilroy-Bold',  fontSize:19, paddingHorizontal:15, paddingVertical:5, textAlign:'center'}}>
                            Kalan <Text style={{color:this.props.themeColors.black, fontFamily: 'gilroy-Black', textDecorationStyle:'solid', textDecorationLine:'underline', textDecorationColor:this.props.themeColors.screenBackground, fontSize:20}}>{this.calculatePrice(this.state.modalTotalSessionCount-this.state.modalDoneSessionCount)} {this.props.route.params.type}</Text> talebi iptal edilecek!
                          </Text> 
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection:'row', height:50, width:'100%'}}>
                        <TouchableOpacity style={[styles.modalApproveBtn, {flex:1}]} onPress={this.toggleModal}><Text style={[styles.modalBtnText]}>ONAYLA</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.modalCancelBtn, {flex:1}]} onPress={this.toggleModal}><Text style={[styles.modalBtnText]}>KAPAT</Text></TouchableOpacity>
                    </View>
                  </View>
              </Modal>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    themeColors: state.colorReducer.themeColors
  }
}

export default connect(mapStateToProps)(HistoryScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalView: {
      overflow:'hidden',
        width:'100%',
        maxHeight:windowHeight*0.8,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',

    },
    modalBtn:{
        flex:1,
    },
    modalCancelBtn: {
        justifyContent: 'center',
        alignItems:'center'
    },
    modalApproveBtn: {
        justifyContent: 'center',
        alignItems:'center'
        
    },
    modalBtnText:{
        fontSize:20,
        fontFamily:'gilroy-Black',
        textAlign:'center',
        color:'white',
    }
})