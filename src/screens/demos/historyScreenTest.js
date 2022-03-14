import React, { Component } from 'react'
import { View, Text, StatusBar, FlatList, ActivityIndicator, SafeAreaView, StyleSheet, TouchableOpacity,Switch, Image, Dimensions } from "react-native";
import { Colors , FontFamilies, FontSizes } from '../../constants'
import { SvgXml } from "react-native-svg"
import { ProgressBar } from 'react-native-paper';
import CoinView from '../../components/CoinView'

import {renderLikeRow, renderCommentRow, renderCollectionRow, renderFollowRow} from './RowTypes'
import {likeData, commentData, collectionData, followData} from './data'
import Swipeout from 'react-native-swipeout';
import Modal from 'react-native-modal';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export class HistoryScreen extends Component {
    
    renderHeader = ({ }) => (
          this.props.route.params.type || this.props.type 
          ?
          <View style={{backgroundColor:'transparent', justifyContent:'center', alignItems:'center', padding:8}}>
            <Text style={{fontSize:25, fontFamily:FontFamilies.settingsRowTitle, color:Colors.themeMiddle, textAlign:'center'}}>
                <Text style={{color:Colors.themeDark, fontSize:27,  fontFamily: 'Baloo-Regular', fontWeight:'bold', textTransform:'capitalize'}}>{this.props.route.params.type ? this.props.route.params.type : null}</Text> Geçmişi
            </Text>
            <Text style={{fontSize:15, paddingHorizontal:10, fontFamily:FontFamilies.settingsRowTitle, color:Colors.themeDark, textAlign:'center'}}>
                Uygulamayı açık tutmanız devam eden işlemlerin daha çabuk sonuçlanmasını sağlar!
            </Text>
          </View>
          :
          null
    );

    constructor(props) {
        super(props);
        this.openRowRef = React.createRef();

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
      return (this.sessionActionButtons = [
        {
          component: 
          <View style={{flex:1, backgroundColor:Colors.screenBackground, justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity onPress={(button)=> {this.toggleModal('open', this.props.route.name, item)}}  style={{width:'70%', left:-10, aspectRatio:1, justifyContent:'center', alignItems:'center', borderRadius:50, borderLeftColor:Colors.customGray, borderLeftWidth:2, borderRadius:20,}}>
              <View>
                <SvgXml width='40' height='40' xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><ellipse style="fill:#E04F5F;" cx="256" cy="256" rx="256" ry="255.832"/><g transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 77.26 32)">	<rect x="3.98" y="-427.615" style="fill:#FFFFFF;" width="55.992" height="285.672"/>	<rect x="-110.828" y="-312.815" style="fill:#FFFFFF;" width="285.672" height="55.992"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'} />
              </View>
            </TouchableOpacity>
          </View>
        }
      ])
    }

    conTwoDecDigit = (digit) => {
      return digit%10 == 0 ? digit : digit.toFixed(1)
    }
    
    calculatePrice = (price) => {
        if (price >= 1000 || price <= -1000) return <Text>{price/1000}K</Text>;
        return <Text>{price}</Text>;
    }
    
    renderItem = (item) => {
      const type = this.props.route.name
      const isDone = item.done/item.total == 1 ? true : false
      switch(type) {
        case 'Like':
          return (!isDone ? <Swipeout style={{backgroundColor:Colors.screenBackground}} right={this.setSessionCancelButton(item)}>{renderLikeRow(item, isDone)}</Swipeout> : renderLikeRow(item, isDone))
          break;
        case 'Comment':
          return (!isDone ? <Swipeout style={{backgroundColor:Colors.screenBackground}} right={this.setSessionCancelButton(item)}>{renderCommentRow(item, isDone)}</Swipeout> : renderCommentRow(item, isDone))
          break;
        case 'Collection':
          return (!isDone ? <Swipeout style={{backgroundColor:Colors.screenBackground}} right={this.setSessionCancelButton(item)}>{renderCollectionRow(item, isDone)}</Swipeout> : renderCollectionRow(item, isDone))
          break;
        case 'Follow':
          return (!isDone ? <Swipeout style={{backgroundColor:Colors.screenBackground}} right={this.setSessionCancelButton(item)}>{renderFollowRow(item, isDone)}</Swipeout> : renderFollowRow(item, isDone))
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
            <SafeAreaView style={styles.container}>
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
                <Modal isVisible={this.state.isModalVisible} style={{justifyContent:'center', alignItems:'center'}}>
                  <View style={{padding:10, zIndex:2, bottom:-20, backgroundColor:Colors.screenBackground,
                          borderRadius:20,
                          shadowColor: Colors.themeDark,
                          shadowOffset: {
                              width: 0,
                              height: 0,
                          },
                          shadowOpacity: 0.32,
                          shadowRadius: 4.84,
                          elevation: 2}}>                                        
                      <SvgXml width='45' height='45' fill={Colors.pink} xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><ellipse style="fill:#E04F5F;" cx="256" cy="256" rx="256" ry="255.832"/><g transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 77.26 32)">	<rect x="3.98" y="-427.615" style="fill:#FFFFFF;" width="55.992" height="285.672"/>	<rect x="-110.828" y="-312.815" style="fill:#FFFFFF;" width="285.672" height="55.992"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'} />
                  </View>
                  <View style={styles.modalView}>
                    <View style={{width:'100%', alignSelf:'center', padding:10, flexDirection:'column'}}>
                      {
                        this.state.modalImageAspectRatio != null
                        ?
                          <View style={{justifyContent:'flex-start', borderRadius:10, paddingVertical:5, alignItems:'center', 
                            shadowColor: Colors.themeMiddle,
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            shadowOpacity: 0.72,
                            shadowRadius: 4.84,
                            elevation: 2}}>
                              <Image style={{ width:'100%',aspectRatio: this.state.modalImageAspectRatio ? this.state.modalImageAspectRatio : 1/3, borderRadius:10, overflow:'hidden'}} resizeMode={'contain'} source={{uri : this.state.modalItem ? this.state.modalItem.postUri : null}} />
                          </View>
                        :
                        null
                      }
                      <View style={{width:'100%'}}>
                          <View style={{alignSelf:'stretch', justifyContent:'flex-end'}}>
                            <Text style={{color:Colors.themeDark, fontSize:30, textAlign:'center', fontFamily: 'Baloo-Regular', fontWeight:'bold'}}>
                              {this.calculatePrice(this.state.modalTotalSessionCount)} 
                              {" "}
                              <Text style={{color:Colors.themeMiddle,  fontFamily: 'Baloo-Regular',  fontSize:28}}>
                                {this.props.route.params.type}
                              </Text> 
                            </Text>
                          </View>
                          <View style={{height:1, backgroundColor:Colors.lightGray, marginLeft:10}} />
                          <View style={{alignSelf:'stretch', justifyContent:'flex-start', paddingVertical:5}}>
                            <Text style={{color:Colors.black, lineHeight:25, fontFamily: 'gilroy-Bold',  fontSize:19, paddingHorizontal:15, paddingVertical:5, textAlign:'center'}}>
                              <Text style={{color:Colors.pink, fontFamily: 'gilroy-Black',  fontSize:20}}>{this.calculatePrice(this.state.modalTotalSessionCount-this.state.modalDoneSessionCount)} {this.props.route.params.type}</Text> iptal edilecek!
                            </Text> 
                          </View>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', height:50, width:'100%'}}>
                        <TouchableOpacity style={[styles.modalApproveBtn, {flex:1}]} onPress={this.toggleModal}><Text style={[styles.modalBtnText]}>İptal Et</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.modalCancelBtn, {flex:1}]} onPress={this.toggleModal}><Text style={[styles.modalBtnText]}>Kapat</Text></TouchableOpacity>
                    </View>
                  </View>
              </Modal>
            </SafeAreaView>
        )
    }
}

export default HistoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: Colors.screenBackground
    },
    modalView: {
      overflow:'hidden',
        width:'100%',
        maxHeight:windowHeight*0.8,
        backgroundColor: 'white',
        borderRadius: 12,
        borderColor: 'rgba(0, 0, 0, 0.1)',

    },
    modalBtn:{
        flex:1,
    },
    modalCancelBtn: {
        backgroundColor:Colors.pink,
        justifyContent: 'center',
        alignItems:'center'
    },
    modalApproveBtn: {
        backgroundColor:Colors.themeDark,
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