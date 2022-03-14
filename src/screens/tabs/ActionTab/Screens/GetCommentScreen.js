import React, { Component } from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet,Animated, TouchableOpacity, ScrollView, Dimensions, Image, Platform, LayoutAnimation, UIManager } from "react-native";
import { FontFamilies, FontSizes, SVGs } from '../../../../constants'
import { SvgXml } from "react-native-svg"

import CommentRow from '../../../tabs/HistoryTab/RowTypes/CommentRow'
import {commentData} from '../../../tabs/HistoryTab/data'

import { Isao } from 'react-native-textinput-effects'
import CoinView from '../../../../components/CoinView'
import { LinearGradient } from 'expo-linear-gradient'
import ImageSize from 'react-native-image-size'

import Modal from 'react-native-modal';
import { connect } from 'react-redux';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

class Item extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);

    this.state={
      tmpComment : "",
    }

    if( Platform.OS === 'android' ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.item.id !== this.props.item.id) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    Animated.timing(
      this.animatedValue,
      {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true
      }
    ).start(() => {
      this.props.afterAnimationComplete();
    });
  }

  removeItem = () => {
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }
    ).start(() => {
      this.props.removeItem(this.props.item.id);
    });
  }

  inputOnEndEditing(id) {
    this.props.updateCommentObject(id,this.state.tmpComment);
    this.setState({tmpComment:""})
  }
  
  render() {
    const translateAnimation = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-windowWidth, 0, windowWidth]
    });

    const opacityAnimation = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    });

    return (
      <Animated.View style={[
        styles.viewHolder, {
          transform: [{ translateX: translateAnimation}],
          opacity: opacityAnimation,
          borderRadius:10, 
          overflow:'hidden',
          borderWidth:1,
          borderColor:'rgba(255,255,255,.1)'
        }]}
      >
      
        <View>
            <Isao
                onChangeText={ (text) => { text == "" ? this.props.commentInputEmpty(true, this.props.item.id) : this.props.commentInputEmpty(false); text != "" ? this.setState({tmpComment:text}) : null } }
                onEndEditing={() => this.inputOnEndEditing(this.props.item.id)}
                keyboardType={'default'}
                label={'Bir Yorum Giriniz'}
                borderHeight={2}
                inputPadding={8}
                labelHeight={25}
                contentContainerStyle={{}}
                multiline={true}
                activeColor={this.props.themeColors.spendInputActive}
                passiveColor={this.props.themeColors.spendInputPassive}
                style={{marginRight:50}}
                inputStyle={{fontSize:16, paddingBottom:15, fontFamily:FontFamilies.getComment, color:this.props.themeColors.spendInputTitleLabel,}}
                labelStyle={{fontSize:15, paddingTop:6, paddingLeft:5}}
                />
        </View>
        <TouchableOpacity
          style={[styles.removeBtn]}
          onPress={this.removeItem}
        >
          <Image
            source={require('../../../../../assets/PlusIcon.png')}
            style={[styles.removeIcon,{tintColor:this.props.themeColors.red}]}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}


class GetCommentScreen extends Component {
  constructor(props) {
    super(props);
    
    this.addNewEle = false;
    this.index = 0;

    this.state = { 
        data : null,
        commentCount: 0,
        emptyComment: true,

        postImageLink : '',
        postImageWidth: 0,
        postImageHeight: 0,
        postImageAspectRatio: 1/3,
        data : commentData.data ? commentData.data : null,
        commentArray: [], addCommentBtnDisabled: false,

        isModalVisible : false,
      };
  }

  componentDidMount() {
    this.addMore();
    this.props.route.params.imageLink ?
        ImageSize.getSize(this.props.route.params.imageLink).then(size => {
            this.setState({ postImageLink: this.props.route.params.imageLink, postImageAspectRatio:size.width/size.height, postImageWidth : size.width, postImageHeight : size.height})
        })
    :
        null            
  }

  updateCommentObject = (id, text) => {
    let commentArray = [...this.state.commentArray];
    let index = commentArray.findIndex(el => el.id === id);
    if(this.state.commentArray){
      commentArray[index] = {...commentArray[index], text: text};
      this.setState({ commentArray });
    }
    
  }

  afterAnimationComplete = () => {
    this.index += 1;
    this.setState({ addCommentBtnDisabled: false });
  }

  confirmBuying = () =>  {
    this.toggleModal()
  }

  commentInputEmpty = (bool, id) => {
    id ? this.remove(id) : this.setState({emptyComment: bool}) 
  }

  addMore = () => {
    this.addNewEle = true;
    const newlyAddedValue = { index: this.index, id: "id_" + this.index, text:""};
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
        addCommentBtnDisabled: true,
        commentArray: [...this.state.commentArray, newlyAddedValue]
    }, () => {
        this.setState({commentCount: this.state.commentArray.length});
        this.commentInputEmpty(true)
    });
  }

  remove(id) {
    this.addNewEle = false;
    const newArray = [...this.state.commentArray];
    newArray.splice(newArray.findIndex(ele => ele.id === id), 1);

    this.setState(() => {
      return {
        commentArray: newArray
      }
    }, () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({commentCount: this.state.commentArray.length}, () => {
        this.state.commentCount == 0 ? this.addMore() : null
      });
    });
  }

  renderHeader = () => (
    <View>
        <View style={{backgroundColor:this.props.themeColors.screenBackground, justifyContent:'center', alignItems:'center', padding:8}}>           
            <Text style={{fontSize:25, fontFamily:FontFamilies.settingsRowContent, marginBottom:10, color:this.props.themeColors.headerTitle, textAlign:'center'}}>
              Yorum<Text style={{fontSize:27,  fontFamily: FontFamilies.settingsRowTitle, textTransform:'capitalize'}}> Al</Text> 
            </Text>
            <Text style={{fontSize:15, paddingHorizontal:10, fontFamily:FontFamilies.historyTitle, color:this.props.themeColors.headerDesc, textAlign:'center', lineHeight:23}}>
                İstediğin yorumları girerek seçtiğin gönderiye yorum alabilirsin, yorum başına <Text style={{color:this.props.themeColors.coinText, fontSize:17,  fontFamily: FontFamilies.settingsRowTitle, textTransform:'capitalize'}}> 200 Kredi</Text> ödersin.
            </Text>
        </View>
        <View style={{backgroundColor:this.props.themeColors.spendHeaderBackground, borderRadius:16, marginTop:12, marginHorizontal:12, 
                      shadowColor: this.props.themeColors.rowShadow,
                      shadowOffset: {
                          width: 0,
                          height: 0,
                      },
                      shadowOpacity: .2,
                      shadowRadius: 5}}>
          <View collapsable={false} ref={(ref) => { this._postRef = ref; }}  style={{opacity:this.state.postImageLink ? 1 : 0}}>
              <View style={{width:'100%', maxHeight:windowHeight*0.85, alignSelf:'center', aspectRatio: this.state.postImageAspectRatio ? this.state.postImageAspectRatio : 1/3, borderTopLeftRadius:16, borderTopRightRadius:16, overflow:'hidden', justifyContent:'flex-start', alignItems:'center'}}>
                  <Image withIndicator style={{ width:'100%', height:'100%' }} resizeMode={'contain'} source={{uri:this.state.postImageLink ? this.state.postImageLink : null }} />
                  <LinearGradient
                      // Background Linear Gradient
                      colors={['rgba(0,0,0,1)','rgba(0,0,0,0.6)','rgba(0,0,0,0.4)','rgba(0,0,0,0)']}
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
                  <View style={{flexDirection:'row', marginTop:-45, width:'90%', height:40, backgroundColor:'transparent', borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:2, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                                <View>
                                    <SvgXml width='20' height='20' fill={this.props.themeColors.white} xml={SVGs.likeUncolored}></SvgXml>
                                </View>
                            </View>
                            <View style={{flex:1.3, paddingLeft:10, justifyContent:'center', alignItems:'flex-start'}}>
                                <Text style={{fontFamily:FontFamilies.modalBold, fontSize:20, color:this.props.themeColors.white}}>1.2K</Text>
                            </View>
                        </View>
                        <View style={{flex:3, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                                <View>
                                    <SvgXml width='20' height='20' fill={this.props.themeColors.white} xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 18.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 1024.287 1024.287" style="enable-background:new 0 0 1024.287 1024.287;" xml:space="preserve"><g>	<path d="M832.519,132.576c-176.76-176.776-464.39-176.76-641.151,0c-176.768,176.768-176.768,464.39,0,641.15		c98.879,98.895,239.293,146.613,377.948,129.074l156.507,115.594c5.234,3.869,11.527,5.893,17.899,5.893		c2.676,0,5.359-0.353,7.988-1.075c8.914-2.456,16.212-8.859,19.79-17.381l44.641-106.208c6.45-15.341-0.761-33.004-16.102-39.454		c-15.349-6.435-33.02,0.761-39.454,16.102l-29.787,70.874L595.212,847.009c-6.466-4.779-14.611-6.819-22.529-5.532		c-123.809,19.217-250.365-22.019-338.706-110.36c-153.267-153.266-153.267-402.658,0-555.933		c153.259-153.259,402.643-153.274,555.933,0c97.404,97.42,136.38,235.699,104.255,369.897c-0.078,0.33-0.157,0.659-0.22,0.989		c-4.504,18.558-10.382,36.881-17.31,54.065L806.24,767.637c-6.45,15.341,0.761,33.004,16.102,39.454		c15.341,6.442,33.012-0.761,39.454-16.102l70.56-167.901c8.239-20.418,15.05-41.683,19.939-61.983		c0.447-1.42,0.785-2.849,1.02-4.285C989.364,402.801,944.307,244.364,832.519,132.576z"/>	<path d="M702.911,312.009h-362.96c-13.316,0-24.106,10.684-24.106,24s10.79,24,24.106,24h362.96c13.316,0,24.106-10.684,24.106-24		S716.228,312.009,702.911,312.009z"/>	<path d="M727.017,474.009c0-13.316-10.79-24-24.106-24h-362.96c-13.316,0-24.106,10.684-24.106,24c0,13.316,10.79,24,24.106,24		h362.96C716.228,498.009,727.017,487.325,727.017,474.009z"/>	<path d="M339.951,588.009c-13.316,0-24.106,10.684-24.106,24c0,13.316,10.79,24,24.106,24H547.44c13.316,0,24.106-10.684,24.106-24		c0-13.316-10.79-24-24.106-24H339.951z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'}></SvgXml>
                                </View>
                            </View>
                            <View style={{flex:1.3, paddingLeft:5, justifyContent:'center', alignItems:'flex-start'}}>
                                <Text style={{fontFamily:FontFamilies.modalBold, fontSize:20, color:this.props.themeColors.white}}>125</Text>
                            </View>
                        </View>
                        <View style={{flex:2, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                                <View>
                                    <SvgXml width='20' height='20' fill={this.props.themeColors.white} xml={SVGs.collectionUncolored}></SvgXml>
                                </View>
                            </View>
                            <View style={{flex:1.3, paddingLeft:5, justifyContent:'center', alignItems:'flex-start'}}>
                                <Text style={{fontFamily:FontFamilies.modalBold, fontSize:20, color:this.props.themeColors.white}}>500</Text>
                            </View>
                        </View>
                    </View>
                </View>
              </View>
          </View>
          <View style={styles.buyFieldView}>        
            <View style={{width:'100%', alignContent:'center', marginTop:10, borderWidth:0}}>
                <Animated.View style={styles.getCommentContainer}>
                    <ScrollView
                    ref={scrollView => this.scrollView = scrollView}
                    onContentSizeChange={()=> {        
                        this.addNewEle && this.scrollView.scrollToEnd();
                    }}
                    >
                    <View style={{ flex: 1, padding: 4 }}>
                        {this.state.commentArray.map(ele => {
                        return (
                            <Item
                                themeColors={this.props.themeColors}
                                updateCommentObject={this.updateCommentObject}
                                commentInputEmpty={this.commentInputEmpty}
                                key={ele.id}
                                item={ele}
                                removeItem={(id) => this.remove(id)}
                                afterAnimationComplete={this.afterAnimationComplete}
                            />
                        )
                        })}
                    </View>
                    </ScrollView>

                    <TouchableOpacity
                        style={[{height:40, width:'100%', zIndex:2, alignItems:'center', flex:1, marginVertical:5,}]}
                        disabled={this.state.addCommentBtnDisabled || this.state.emptyComment}
                        onPress={this.addMore}
                        >
                        <View style={{alignItems:'center', justifyContent:'center', flexWrap:'wrap',}}>
                          <View style={{paddingVertical:6}}>
                            <Image source = { require('../../../../../assets/PlusIcon.png') } style = {{resizeMode: 'contain', height: '100%', aspectRatio:1, tintColor: this.state.emptyComment ? this.props.themeColors.spendInputPassive :this.props.themeColors.spendInputTitleLabel}}/>
                          </View>
                          <View style={{}}>
                            <Text style={{ color:this.state.emptyComment ? this.props.themeColors.spendInputPassive : this.props.themeColors.spendInputTitleLabel, fontFamily:FontFamilies.historyTitle, fontSize:17, paddingLeft:10}}>Yorum Ekle</Text>
                          </View>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
            
            <View style={{marginVertical:10, alignItems:'center'}}>
                <CoinView width={22} size={26} color={'#FDA401'} price={-Number(this.state.commentCount)*200}/>
            </View>
            <TouchableOpacity onPress={this.confirmBuying} disabled={this.state.commentCount == "0 " || this.state.emptyComment} style={{marginTop:10, opacity:this.state.commentCount == "0" || this.state.emptyComment ? 0.5 : 1, width:"100%", flexDirection:"row"}} >
              <View style={{height:60, flex:1, textAlign:'center', backgroundColor:this.props.themeColors.spendButtonBackground, borderBottomLeftRadius:16, borderBottomRightRadius:16, alignContent:'center', justifyContent:'center'}}>
                <Text style={{textAlign:'center', fontFamily:FontFamilies.globalButton, color:this.props.themeColors.spendButtonTitle, fontSize:FontSizes.globalButton}}>{" YORUM SATIN AL"}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {
            <View style={{backgroundColor:this.props.themeColors.screenBackground, justifyContent:'center', alignItems:'center', padding:8, marginTop:24, paddingTop:20}}>           
                <View style={{marginBottom:10}}>
                    <SvgXml width='40' height='40' fill={this.props.themeColors.headerTitle} xml={'<svg id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m487.509 148.958-27.223 12.607c14.408 31.111 21.714 62.884 21.714 94.435 0 124.617-101.383 226-226 226-45.471 0-89.303-14-127.548-40.596 5.926-15.989 2.489-34.692-10.338-47.519-17.545-17.545-46.095-17.544-63.64 0-17.546 17.545-17.546 46.094 0 63.64 14.757 14.758 37.36 17.137 54.648 6.965 43.801 31.118 94.333 47.51 146.878 47.51 140.959 0 256-115.049 256-256 0-35.937-8.24-71.951-24.491-107.042zm-390.608 287.355c-5.849 5.849-15.363 5.85-21.214 0-5.849-5.849-5.849-15.365 0-21.213 5.847-5.848 15.364-5.85 21.214 0 5.849 5.847 5.849 15.364 0 21.213z"/><path d="m331 196v-45h30v-30h-210v30h30v45c0 24.508 11.818 46.305 30.052 60-18.234 13.695-30.052 35.492-30.052 60v45h-30v30h210v-30h-30v-45c0-24.508-11.818-46.305-30.052-60 18.234-13.695 30.052-35.492 30.052-60zm-30 120v45h-90v-45c0-24.813 20.187-45 45-45s45 20.187 45 45zm0-120c0 24.813-20.187 45-45 45s-45-20.187-45-45v-45h90z"/><path d="m393.886 118.115c17.544 17.544 46.094 17.545 63.64 0s17.546-46.095 0-63.64c-14.791-14.791-37.402-17.113-54.648-6.965-43.801-31.118-94.333-47.51-146.878-47.51-140.959 0-256 115.049-256 256 0 35.937 8.24 71.951 24.491 107.042l27.223-12.607c-14.408-31.111-21.714-62.884-21.714-94.435 0-124.617 101.383-226 226-226 45.471 0 89.303 14 127.548 40.596-5.926 15.989-2.489 34.692 10.338 47.519zm21.213-42.427c5.849-5.848 15.364-5.849 21.214 0 5.849 5.849 5.849 15.365 0 21.213-5.849 5.849-15.365 5.85-21.214 0-5.849-5.848-5.849-15.365 0-21.213z"/></g></svg>' }></SvgXml>
                </View>
                <Text style={{fontSize:25, fontFamily:FontFamilies.settingsRowContent, marginBottom:10, color:this.props.themeColors.headerTitle, textAlign:'center'}}>
                  <Text style={{fontSize:27,  fontFamily: FontFamilies.settingsRowTitle, textTransform:'capitalize'}}>Yorum</Text> Hareketleri
                </Text>
                <Text style={{fontSize:15, paddingHorizontal:10, fontFamily:FontFamilies.historyTitle, color:this.props.themeColors.headerDesc, textAlign:'center'}}>
                    Aktif hareketlerle ilgili değişiklik yapmak için "Hareketler" sekmesine gidebilirsiniz.
                </Text>
            </View>
        }
    </View>
    );

    toggleModal = () => {
        this.setState({isModalVisible : !this.state.isModalVisible});
    };
  render() {
    return (
        <SafeAreaView style={{backgroundColor:this.props.themeColors.screenBackground}}>
            <FlatList 
                ref={(ref) => { this._flatList = ref; }}
                data={this.state.data}
                onScrollBeginDrag={this.onScroll}
                style={{}}
                renderItem={({ item }) => <CommentRow item={item} isDone={item.done/item.total == 1} />}
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
          <Modal isVisible={this.state.isModalVisible} style={{justifyContent:'center', alignItems:'center'}}>
                <View style={{padding:15, zIndex:2, bottom:-15, backgroundColor:this.props.themeColors.historyModalTitleBackground,
                        borderRadius:50}}>                                        
                    <SvgXml width='30' height='30' fill={this.props.themeColors.historyModalTitleIconTint} xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 18.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 1024.287 1024.287" style="enable-background:new 0 0 1024.287 1024.287;" xml:space="preserve"><g>	<path d="M832.519,132.576c-176.76-176.776-464.39-176.76-641.151,0c-176.768,176.768-176.768,464.39,0,641.15		c98.879,98.895,239.293,146.613,377.948,129.074l156.507,115.594c5.234,3.869,11.527,5.893,17.899,5.893		c2.676,0,5.359-0.353,7.988-1.075c8.914-2.456,16.212-8.859,19.79-17.381l44.641-106.208c6.45-15.341-0.761-33.004-16.102-39.454		c-15.349-6.435-33.02,0.761-39.454,16.102l-29.787,70.874L595.212,847.009c-6.466-4.779-14.611-6.819-22.529-5.532		c-123.809,19.217-250.365-22.019-338.706-110.36c-153.267-153.266-153.267-402.658,0-555.933		c153.259-153.259,402.643-153.274,555.933,0c97.404,97.42,136.38,235.699,104.255,369.897c-0.078,0.33-0.157,0.659-0.22,0.989		c-4.504,18.558-10.382,36.881-17.31,54.065L806.24,767.637c-6.45,15.341,0.761,33.004,16.102,39.454		c15.341,6.442,33.012-0.761,39.454-16.102l70.56-167.901c8.239-20.418,15.05-41.683,19.939-61.983		c0.447-1.42,0.785-2.849,1.02-4.285C989.364,402.801,944.307,244.364,832.519,132.576z"/>	<path d="M702.911,312.009h-362.96c-13.316,0-24.106,10.684-24.106,24s10.79,24,24.106,24h362.96c13.316,0,24.106-10.684,24.106-24		S716.228,312.009,702.911,312.009z"/>	<path d="M727.017,474.009c0-13.316-10.79-24-24.106-24h-362.96c-13.316,0-24.106,10.684-24.106,24c0,13.316,10.79,24,24.106,24		h362.96C716.228,498.009,727.017,487.325,727.017,474.009z"/>	<path d="M339.951,588.009c-13.316,0-24.106,10.684-24.106,24c0,13.316,10.79,24,24.106,24H547.44c13.316,0,24.106-10.684,24.106-24		c0-13.316-10.79-24-24.106-24H339.951z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'} />
                </View>
                <View style={[styles.modalView,{backgroundColor: this.props.themeColors.screenBackground}]}>
                    <View style={{flexDirection:'row', width:'100%', justifyContent:'center', marginTop:10, paddingVertical:20}}>
                        <Text style={{fontSize:24, justifyContent:'center', fontFamily:FontFamilies.historyContent, color:this.props.themeColors.historyModalText, width:'100%', textAlign:'center', color:'white'}}>
                            <Text style={{fontSize:35, fontFamily:FontFamilies.historyTitle, color:this.props.themeColors.historyModalText}}>{this.state.commentArray.length}</Text> yorum alınacak!
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', height:50, width:'100%'}}>
                        <TouchableOpacity style={[styles.modalApproveBtn, {flex:1, backgroundColor:this.props.themeColors.historyModalConfirmButton}]} onPress={this.toggleModal}><Text style={[styles.modalBtnText,{color:this.props.themeColors.historyModalConfirmButton}]}>ONAYLA</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.modalCancelBtn, {flex:1, backgroundColor:this.props.themeColors.historyModalCancelButtonBackground}]} onPress={this.toggleModal}><Text style={[styles.modalBtnText,{color:this.props.themeColors.historyModalCancelButton}]}>VAZGEÇ</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeColors: state.colorReducer.themeColors
  }
}
export default connect(mapStateToProps)(GetCommentScreen);

const styles = StyleSheet.create({
    buyFieldView: {
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
    },

    btn: {
      position: 'absolute',
      bottom:-45,
      left:5,
      zIndex: 2,
      elevation:2,
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5
    },
    removeBtn: {
      position: 'absolute',
      right: 13,
      top:45,
      width: 25,
      height: 25,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      zIndex: 999,
    },
  
    removeIcon: {
      width: '100%',
      transform: [{ rotate: '45deg' }],
      resizeMode: 'contain'
    },
        text: {
        color: 'white',
        fontSize: 25,
        paddingRight: 17
    },
    modalView: {
        maxHeight:windowHeight*.8,
        borderRadius: 16,
        borderWidth:1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        overflow:'hidden',
    },
    getCommentContainer: {
        minHeight:80,
        justifyContent: 'center',
    },
    viewHolder: {
        paddingVertical: 10,
        backgroundColor:'rgba(255,255,255,.1)',
        justifyContent: 'center',
        margin: 4,
        borderRadius: 10
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
    }
})