import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, StatusBar, Dimensions } from 'react-native'
import Modal from 'react-native-modal';
import { SVGs, FontFamilies, FontSizes } from '../../../constants'
import CoinView from '../../../components/CoinView'
import { LinearGradient } from 'expo-linear-gradient'
import { SvgXml } from "react-native-svg"

import ActionIcons from '../../../../assets/ActionIcons'
import Carousel from "react-native-snap-carousel";
import { connect } from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

class ActionTypesModal extends Component {
    
    constructor(props) {
      super(props);
      this.state = { 
        isDescExist: true,
        carouselHeight: 135,

        carouselItems : [
          {
            title:'Koleksiyon Al',
            type:'collection',
            svgUri: SVGs.collectionUncolored,
            price: 30,
          },
          {
            title:'Beğeni Al',
            type:'like',
            svgUri: SVGs.likeUncolored,
            price: 20,
            },
          {
            title:'Yorum Al',
            type:'comment',
            svgUri: SVGs.commentUncolored,
            price: 100,
          }
        ]
      };
    }

    _renderActionTypeModalContent = () => (
        <View style={styles.modalContent}>
        <View style={{ flex: 1, backgroundColor:'black' }} activeOpacity={1} >
          <TouchableOpacity onPress={() => { this.props.modalToggle(); this.setState({actionType:null}) }} style={{position:'absolute', zIndex:2, right:10, top:10, width:40, height:40, padding:13, borderRadius:20, backgroundColor:'rgba(0,0,0,0.4)'}}>
            <SvgXml width='100%' height='100%' fill={this.props.themeColors.white} xml={SVGs.tinderCancel} />
          </TouchableOpacity>
          <View style={{position:'absolute', left:0, top:0, right:0,bottom:0, backgroundColor:'black'}} />
          <View style={[styles.container]}>
            <View style={[{backgroundColor:'transparent', borderRadius:20, margin:5, overflow:'hidden'}]}>
              <Image withIndicator source={{uri: this.props.imageLink}} style={{width:'100%', height:windowHeight-this.state.carouselHeight-140, resizeMode: 'cover', width:'100%', borderRadius:20}} />
              <LinearGradient
                // Background Linear Gradient
                colors={['rgba(0,0,0,0.8)','rgba(0,0,0,0.7)','rgba(0,0,0,0.3)','rgba(0,0,0,0.1)']}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0.5 }}
                style={{
                    opacity:1,
                    position:'absolute',
                    top:0,
                    left:0,
                    width:windowWidth-10,
                    height:windowHeight-this.state.carouselHeight-30,
                    borderRadius:20,
                    overflow:'hidden'
                }}
            />
            </View>
              <View style={{flex:1, height:windowHeight-this.state.carouselHeight, paddingHorizontal:5, justifyContent:'flex-end'}}>
                <View style={{flexDirection:'row', width:'100%', left:-20, marginBottom:10, height:30, backgroundColor:this.props.themeColors.black, borderRadius:25, 
                    shadowColor: 'black',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 0.35,
                    shadowRadius: 5.84,
                    elevation: 2}}>
                      <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:1}} />
                        
                        <View style={{flex:2, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                          <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                            <View>
                              <SvgXml width='20' height='20' fill={this.props.themeColors.white} xml={SVGs.likeUncolored}></SvgXml>
                            </View>
                          </View>
                          <View style={{flex:1.3, paddingLeft:5, justifyContent:'center', alignItems:'flex-start'}}>
                            <Text style={{fontFamily:FontFamilies.modalBold, fontSize:18, color:this.props.themeColors.white}}>1.2K</Text>
                          </View>
                        </View>
                        <View style={{flex:3, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                          <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                            <View>
                              <SvgXml width='20' height='20' fill={this.props.themeColors.white} xml={SVGs.commentUncolored}></SvgXml>
                            </View>
                          </View>
                          <View style={{flex:1.3, paddingLeft:5, justifyContent:'center', alignItems:'flex-start'}}>
                            <Text style={{fontFamily:FontFamilies.modalBold, fontSize:18, color:this.props.themeColors.white}}>125</Text>
                          </View>
                        </View>
                        <View style={{flex:2, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                          <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                            <View>
                              <SvgXml width='20' height='20' fill={this.props.themeColors.white} xml={SVGs.collectionUncolored}></SvgXml>
                            </View>
                          </View>
                          <View style={{flex:1.3, paddingLeft:5, justifyContent:'center', alignItems:'flex-start'}}>
                            <Text style={{fontFamily:FontFamilies.modalBold, fontSize:18, color:this.props.themeColors.white}}>500</Text>
                          </View>
                        </View>
                        <View style={{flex:1}} />
                      </View>
                  </View>
                  {!this.state.isDescExist ? <View style={{flex:0.1}}/> : 
                    <View style={{ flexDirection:'row', flexWrap:'wrap-reverse', marginBottom:-5}}>
                      <View style={{ paddingHorizontal:15, justifyContent:'center',alignItems:'flex-end'}}>
                        <SvgXml width='20' height='20' fill={this.props.themeColors.white} xml={SVGs.hashtag}></SvgXml>
                      </View>
                      <View style={{flex:10, justifyContent:'center', alignItems:'flex-start'}}>
                        <Text style={{fontSize:14, paddingBottom:8, paddingRight:8, width:'100%', fontFamily:FontFamilies.modalBold, color:'white', lineHeight:18}}>Dreamland Out on Digital and Demand Now • @finn_cole @milesjorispeyrafitte • Link in Bio ✨ #MargotRobbie #tbt #poppy #AllTimeStars</Text>
                      </View>
                    </View>
                }
                
              </View>
            </View>
          </View>
          <View style={styles.carouselContainer}>
              <View style={[styles.carouselDisplay, { opacity: 1 }]}>
                  <Carousel
                    data={this.state.carouselItems}
                    slideStyle={styles.carousel}
                    sliderWidth={windowWidth}
                    itemWidth={windowWidth / 1.5}
                    firstItem={1}
                    inactiveSlideOpacity={0.9}
                    inactiveSlideScale={0.9}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={ () => { this.setState({actionType:item.type}); this.props.modalToggle() } } style={[styles.carouselItem, {height:this.state.carouselHeight, backgroundColor:this.props.themeColors.profileModalCarouselBackground}]} activeOpacity={0.9}>
                        <View style={{flex:1}}>
                          <View style={{alignItems:'flex-start'}}>
                            <Text style={{textAlign:'left', fontFamily:FontFamilies.modalBold, fontSize:FontSizes.modalCarouselTitle, color:this.props.themeColors.profileModalCarouselTitle, marginBottom:10}}> {item.title} </Text>  
                          </View>
                          <View style={{alignSelf:'flex-start', backgroundColor:this.props.themeColors.profileModalCarouselCoinBackground, paddingVertical:2, paddingHorizontal:16,  borderRadius:40,
                            shadowColor: this.props.themeColors.rowShadow,
                            shadowOffset: {
                            width: 0,
                            height: 0,
                            },
                            shadowOpacity: .15,
                            shadowRadius: 4,
                            elevation: 2}}>
                            <CoinView size={22} minus={true} price={item.price}/>
                          </View>
                          <View style={{position:'absolute', height:'100%', width:'100%', alignItems:'flex-end', right:'-15%', backgroundColor:'fff'}}>
                            <SvgXml width='50%' height='50%' style={{opacity:0.35}} fill={item.textColor} xml={item.svgUri}></SvgXml>
                          </View>
                          <View style={{position:'absolute', right:3, bottom:3, backgroundColor:this.props.themeColors.profileModalCarouselBackground}}>
                              <SvgXml width='30' height='30' style={{opacity:.6}} fill={this.props.themeColors.green} xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 447.976 447.976" style="enable-background:new 0 0 447.976 447.976;" xml:space="preserve"><g>	<path style="fill:#000;" d="M433.936,190.044l-128-128c-18.752-18.752-49.12-18.752-67.872,0		c-18.752,18.72-18.752,49.152,0,67.872l94.048,94.08l-94.048,94.048c-18.752,18.752-18.752,49.12,0,67.872		c9.344,9.408,21.632,14.08,33.92,14.08s24.576-4.672,33.952-14.048l128-128C452.656,239.196,452.656,208.796,433.936,190.044z"/>	<path style="fill:#8E8E93;" d="M209.936,190.044l-128-128c-18.752-18.752-49.12-18.752-67.872,0		c-18.752,18.72-18.752,49.152,0,67.872l94.048,94.08l-94.048,94.048c-18.752,18.752-18.752,49.12,0,67.872		c9.344,9.408,21.632,14.08,33.92,14.08s24.576-4.672,33.952-14.048l128-128C228.656,239.196,228.656,208.796,209.936,190.044z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'}></SvgXml>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
              </View>
          </View>
        </View>
      );


    render() {
        return (
            <View style={styles.container}>
                <Modal isVisible={this.props.shouldModalOpen} 
                        animationOutTiming={200}
                        backdropOpacity={1}
                        useNativeDriver={false}
                        style={styles.bottomModal}
                        onModalHide={() => {StatusBar.setHidden(false); this.props.navigateToAction(this.state.actionType, this.props.imageLink)}}
                        onModalShow={() => {StatusBar.setHidden(true)}}
                        onModalWillHide={() => {StatusBar.setHidden(false)}}
                        children={this._renderActionTypeModalContent()} />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    themeColors: state.colorReducer.themeColors
  }
}


export default connect(mapStateToProps)(ActionTypesModal);

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    absolute: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    modalContent: {
      flex:1,
      backgroundColor: 'transparent',
      borderRadius: 18,
    },
    carouselContainer: {
      width: "100%"
    },
    carouselDisplay: {
      alignItems: "center"
    },
    carousel: {
      borderRadius: 10,
      marginVertical:15
    },
    carouselItem: {
      padding:15,
      borderRadius: 10,
      width: '100%'
    }
  })