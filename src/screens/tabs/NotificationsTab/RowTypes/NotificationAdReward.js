import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FontFamilies, FontSizes, SVGs } from '../../../../constants'
import { SvgXml } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable';
import CoinView from '../../../../components/CoinView'

import { connect } from 'react-redux';

class NotificationAdReward extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent:'center'
            }}>
                <Animatable.View animation={this.props.unread ? "flash" : "fadeIn"}  iterationCount={1} style={{flexDirection:'row', paddingHorizontal:10}}>
                    {
                        this.props.unread &&
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <View style={{width:5, aspectRatio:1, backgroundColor:this.props.themeColors.videoAdMain, borderRadius:3}} />
                        </View>
                    }
                    <View style={{width:'100%', flexWrap:'wrap'}}>
                        <View style={{width:'100%', justifyContent:'center'}}>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                                <View style={{width:40, left:0, justifyContent:'center', opacity:.8, alignItems:'center'}}>
                                    <SvgXml width='22' height='22' fill={this.props.themeColors.videoAdMain} xml={SVGs.videoIcon}></SvgXml>
                                </View>
                                <View style={{flex:14, flexDirection:'column', paddingHorizontal:5, paddingVertical:10}}>
                                    <View style={{paddingRight:10}}>
                                        <Text style={{fontFamily:FontFamilies.actionHeaderContent, fontSize:15, marginTop:6, color:this.props.themeColors.notificationsText, lineHeight:19}}>
                                            Reklam izlediniz ve 
                                            <View style={{marginBottom:-8, paddingLeft:10}}><CoinView price={300} size={18} plus={true} width={15} /></View>
                                            {" "}kredi kazandınız!{" "}
                                            <Text style={{color:this.props.themeColors.notificationsDate, fontSize:15, fontFamily:FontFamilies.actionHeaderContent}}>2w</Text>
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Animatable.View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      themeColors: state.colorReducer.themeColors
    }
  }
  
export default connect(mapStateToProps)(NotificationAdReward);
