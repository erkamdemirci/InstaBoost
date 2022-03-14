import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, ScrollView } from "react-native";
import { FontFamilies, FontSizes, SVGs } from '../../../constants'
import { SvgXml } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient'
import Modal from 'react-native-modal';
import { Isao } from 'react-native-textinput-effects';

import { connect } from 'react-redux';
import {loginBackupAccount} from '../../../redux/actions/account'

class BackupAccount extends Component {
  constructor(props) {
    super(props);
    
    this.themeChanging = false;
    this.state = {    
    };
  }

  componentDidUpdate(prevProps){
      if(prevProps.isDark !== this.props.isDark){ 
        this.setState({
          themeChanging: !this.state.themeChanging,
          themeSwitch: this.props.isDark
        });
       }
  }

  _renderActionTypeModalContent = () => (
      <View style={{position:'absolute', top:0, right:0, left:0, bottom:0, justifyContent:'center', alignItems:'center', backgroundColor:'transparent'}}>
        <View style={{width:'90%', borderRadius:15, padding:0, backgroundColor:'white', justifyContent:'center', alignItems:'center',
        shadowColor: this.props.themeColors.rowShadow,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: .35,
        shadowRadius: 8}}> 
          <Image source={{uri: 'https://webcomicms.net/sites/default/files/clipart/147280/cartoon-image-147280-218736.gif'}} style={{width:'130%', aspectRatio:1}} />
        </View>
      </View>
  )

  componentDidMount() {
    const jsonData = require('../../../jsonData/userData.json');
    this.setState({backupAccount: jsonData.backupAccount}) 
  }

  inputOnFocus() {
    this._loginRef.measure( (fx, fy, width, height, px, py) => {
      this._scrollViewRef.scrollTo({x: 0, y: py, animated: true})
    })      
  }

  inputOnBlur() {
    this._scrollViewRef.scrollTo({x: 0, y: 0, animated: true})     
  }

  render() {
    return (
      <View style={{flex:1}}>
          <ScrollView ref={(ref) => { this._scrollViewRef = ref; }} contentContainerStyle={{paddingBottom: 75, paddingTop:25}} style={{backgroundColor:this.props.themeColors.screenBackground, paddingHorizontal:5}}>         
            <View style={{justifyContent:'center', alignItems:'center', paddingVertical:15, paddingHorizontal:12,  margin:20, marginTop:12, borderRadius:15, backgroundColor:this.props.themeColors.backupAccountBackground, 
            shadowColor: this.props.themeColors.rowShadow,
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: .15,
            shadowRadius: 6}}>           
                <View style={{marginBottom:20, marginTop:-45, backgroundColor:this.props.themeColors.backupAccountBackground, padding:20, borderRadius:40,
                shadowColor: this.props.themeColors.rowShadow,
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: .15,
                shadowRadius: 6}}>
                    <SvgXml width='35' height='35' fill={this.props.themeColors.headerTitle} xml={'<svg height="512pt" viewBox="0 0 512 512.00006" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m261.039062 512c-1.695312 0-3.390624 0-5.097656-.007812-40.132812.097656-77.214844-.921876-113.277344-3.117188-33.0625-2.011719-63.242187-13.4375-87.28125-33.039062-23.195312-18.914063-39.035156-44.488282-47.078124-76.003907-7-27.4375-7.371094-54.371093-7.726563-80.421875-.257813-18.691406-.5234375-40.839844-.578125-63.363281.0546875-22.617187.320312-44.765625.578125-63.457031.355469-26.046875.726563-52.980469 7.726563-80.421875 8.042968-31.515625 23.882812-57.089844 47.078124-76.003907 24.039063-19.601562 54.21875-31.027343 87.285157-33.039062 36.0625-2.191406 73.152343-3.2148438 113.371093-3.1171875 40.144532-.0859375 77.214844.9257815 113.277344 3.1171875 33.0625 2.011719 63.242188 13.4375 87.28125 33.039062 23.199219 18.914063 39.035156 44.488282 47.078125 76.003907 7 27.4375 7.371094 54.375 7.726563 80.421875.257812 18.691406.527344 40.839844.578125 63.363281-.050781 22.617187-.320313 44.765625-.578125 63.457031-.148438 11.046875-9.273438 19.875-20.269532 19.726563-11.046874-.152344-19.875-9.230469-19.726562-20.273438.253906-18.582031.523438-40.585937.574219-62.910156-.050781-22.230469-.320313-44.234375-.574219-62.816406-.324219-23.714844-.660156-48.238281-6.488281-71.078125-5.878907-23.039063-17.183594-41.507813-33.597657-54.894532-17.753906-14.480468-39.433593-22.59375-64.433593-24.113281-35.214844-2.140625-71.464844-3.128906-110.847657-3.046875-39.476562-.09375-75.730468.90625-110.945312 3.046875-25 1.519531-46.675781 9.632813-64.433594 24.109375-16.414062 13.386719-27.71875 31.855469-33.597656 54.898438-5.828125 22.839844-6.164062 47.363281-6.488281 71.078125-.253907 18.582031-.519531 40.585937-.574219 62.910156.054688 22.230469.320312 44.234375.574219 62.816406.324219 23.714844.660156 48.238281 6.488281 71.078125 5.878906 23.039063 17.183594 41.507813 33.597656 54.894532 17.757813 14.480468 39.433594 22.59375 64.433594 24.113281 35.214844 2.140625 71.476562 3.140625 110.851562 3.042969 39.480469.09375 75.726563-.902344 110.941407-3.042969 25-1.519531 46.675781-9.632813 64.433593-24.113281 11.824219-9.644532 21.0625-22.019532 27.457032-36.785157 4.390625-10.132812 16.164062-14.792969 26.300781-10.402343 10.136719 4.390624 14.792969 16.164062 10.40625 26.300781-8.964844 20.699219-22.046875 38.15625-38.886719 51.886719-24.039062 19.605468-54.21875 31.027343-87.28125 33.039062-34.535156 2.101562-70.011718 3.125-108.277344 3.125zm118.949219-256c0-68.925781-56.074219-125-125-125-68.921875 0-125 56.074219-125 125s56.078125 125 125 125c68.925781 0 125-56.074219 125-125zm-40 0c0 46.867188-38.128906 85-85 85-46.867187 0-85-38.132812-85-85s38.132813-85 85-85c46.871094 0 85 38.132812 85 85zm54-165c-16.566406 0-30 13.429688-30 30s13.433594 30 30 30c16.570313 0 30-13.429688 30-30s-13.429687-30-30-30zm0 0"/></svg>' }></SvgXml>
                </View>
                <Text style={{fontSize:25, fontFamily:FontFamilies.settingsRowContent, marginBottom:10, color:this.props.themeColors.headerTitle, textAlign:'center'}}>
                    <Text style={{fontSize:27,  fontFamily: FontFamilies.settingsRowTitle, textTransform:'capitalize'}}>Hesap</Text> Bağla
                </Text>
                <Text style={{fontSize:17, paddingVertical:5, fontFamily:FontFamilies.historyTitle, color:this.props.themeColors.headerDesc, textAlign:'center'}}>
                    <Text style={{color:this.props.themeColors.coinText, fontSize:18,  fontFamily: FontFamilies.settingsRowTitle, textTransform:'capitalize'}}> “KAZAN”</Text> özelliklerinde bu hesap kullanılacaktır.
                </Text>

                <View  style={{paddingHorizontal:15, paddingTop:10,width:'100%', backgroundColor:this.props.themeColors.backupAccountBackground}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1,  justifyContent:'center', alignItems:'center', marginRight:10}}>
                            <SvgXml width='25' height='25' fill={this.props.themeColors.backupAccountInputPassive} xml={SVGs.atIcon}></SvgXml>
                        </View>
                        <View collapsable={false} ref={(ref) => { this._loginRef = ref; }} style={{flex:8}}>
                            <Isao
                                label={'Kullanıcı Adı'}
                                borderColor={this.props.themeColors.spendInputPassive}
                                inputPadding={16}
                                borderHeight={2}
                                labelHeight={36}
                                activeColor={this.props.themeColors.backupAccountInputActive}
                                passiveColor={this.props.themeColors.backupAccountInputPassive}
                                inputStyle={{ padding:8, color: this.props.themeColors.backupAccountInputText, fontSize:22, fontFamily:'gilroy-Regular' }}
                                labelStyle={{fontSize:20, lineHeight:30, fontFamily:'gilroy-Black', color:this.props.themeColors.spendInputPassive}}
                                onFocus={ () => this.inputOnFocus() }
                                onBlur={ () => this.inputOnBlur() }
                            />
                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1,  justifyContent:'center', alignItems:'center', marginRight:10}}>
                            <SvgXml width='30' height='30' fill={this.props.themeColors.backupAccountInputPassive} xml={SVGs.lockUncolored}></SvgXml>
                        </View>
                        <View style={{flex:8}}>
                            <Isao
                                label={'Şifre'}
                                // this is used as active and passive border color
                                borderColor={this.props.themeColors.spendInputPassive}
                                inputPadding={16}
                                borderHeight={2}
                                labelHeight={36}
                                secureTextEntry={true}
                                activeColor={this.props.themeColors.backupAccountInputActive}
                                passiveColor={this.props.themeColors.backupAccountInputPassive}
                                inputStyle={{ padding:8, color: this.props.themeColors.backupAccountInputText, fontSize:22, fontFamily:'gilroy-Regular' }}
                                labelStyle={{fontSize:20, lineHeight:30, fontFamily:'gilroy-Black', color:this.props.themeColors.spendInputPassive}}
                                onFocus={ () => this.inputOnFocus() }
                                onBlur={ () => this.inputOnBlur() }
                            />
                        </View>
                    </View>
                </View>
                <View style={{width:'100%', marginTop:20}}>
                    <TouchableOpacity onPress={() => this.props.loginBackupAccount(this.state.backupAccount)} style={{backgroundColor:this.props.themeColors.backupAccountButtonBackground, width:'100%', height:60, borderRadius:15, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontFamily:'gilroy-Black', fontSize:23, color:this.props.themeColors.backupAccountButtonText}}>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{width:'100%'}}>
                <View style={{ justifyContent:'center', alignItems:'center', padding:4, paddingVertical:8}}>           
                    <Text style={{fontSize:25, fontFamily:FontFamilies.settingsRowContent, marginBottom:5, color:this.props.themeColors.headerTitle, textAlign:'center'}}>
                        Hesap<Text style={{fontSize:27,  fontFamily: FontFamilies.settingsRowTitle, textTransform:'capitalize'}}> Oluştur</Text> 
                    </Text>
                    <Text style={{fontSize:17, paddingHorizontal:10, paddingVertical:10, fontFamily:FontFamilies.historyTitle, color:this.props.themeColors.headerDesc, textAlign:'center', lineHeight:20}}>
                        Henüz bağlayabileceğin yedek bir hesabın yoksa, bir hesap açabilirsin.
                    </Text>
                </View>
            </View>

            <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://www.instagram.com/accounts/emailsignup/')}} style={{marginHorizontal:10, height:60, justifyContent:'center', flexDirection:'row', borderRadius:30,
                backgroundColor:this.props.themeColors.screenBackground,
                    shadowColor: this.props.themeColors.rowShadow,
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: .35,
                    shadowRadius: 6}}>
                    <LinearGradient
                    // Background Linear Gradient
                    colors={["#fdc35e", "#d72f81", "#803aab", "#9937bb"]}
                    start={{ x: 1, y: .5 }}
                    end={{ x: 0, y: .5 }}
                    style={{
                        opacity:.85,
                        position:'absolute',
                        top:0,
                        left:0,
                        bottom:0,
                        right:0,
                        borderRadius:30
                    }}
                />
                <View style={{flex:2.5, justifyContent:'center', alignItems:'center'}}>
                    <View style={{width:55, height:55, justifyContent:'center', alignItems:'center'}}>
                        <View>
                            <SvgXml width='30' height='30' fill={'white'} xml={SVGs.insta}></SvgXml>
                        </View>
                    </View>
                </View>
                <View style={{flex:8, padding:2, justifyContent:'center'}}>
                    <Text style={{fontFamily:FontFamilies.settingsRowTitle, color:this.props.themeColors.white, fontSize:FontSizes.settingsRowTitle}}>Yeni Hesap Oluştur</Text>
                </View>
                <View style={{flex:3, justifyContent:'center', alignItems:'center'}}>
                    <View style={{width:50, height:50, justifyContent:'center', alignItems:'center'}}>
                        <View>
                            <SvgXml width='25' height='25' fill={this.props.themeColors.white} xml={SVGs.rowNavigateArrow}></SvgXml>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeColors: state.colorReducer.themeColors,
    currentAccount: state.accountReducer.currentAccount,
    backupAccount: state.accountReducer.backupAccount,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginBackupAccount: (backupAccount) => dispatch(loginBackupAccount(backupAccount))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackupAccount);

const styles = StyleSheet.create({
})