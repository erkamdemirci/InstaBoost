import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { SVGs, FontFamilies, FontSizes } from '../../../../constants'
import { SvgXml } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux';

class NotificationLikeRow extends Component {
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
                <Animatable.View animation={this.props.unread ? "flash" : "fadeIn"} iterationCount={1} style={{flexDirection:'row', paddingHorizontal:10}}>
                    {
                        this.props.unread &&
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <View style={{width:5, aspectRatio:1, backgroundColor:this.props.themeColors.likeMain, borderRadius:3}} />
                        </View>
                    }
                    <View style={{width:'100%', flexWrap:'wrap'}}>
                        <View style={{width:'100%', justifyContent:'center'}}>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                                <View style={{width:40, left:0, justifyContent:'center', opacity:.8, alignItems:'center'}}>
                                    <SvgXml width='22' height='22' fill={this.props.themeColors.likeMain} xml={SVGs.likeUncolored}></SvgXml>
                                </View>
                                <View style={{flex:14, flexDirection:'column', paddingHorizontal:5, paddingVertical:10}}>
                                    <View style={{paddingRight:10}}>
                                        <Text style={{fontFamily:FontFamilies.actionHeaderContent, fontSize:15, marginTop:6, color:this.props.themeColors.notificationsText, lineHeight:19}}>
                                            <Text style={{color:this.props.themeColors.likeMain, fontSize:17, fontFamily:FontFamilies.actionHeaderTitle,}}>{this.props.count} beğeni</Text>
                                            {" "}alımı başarıyla tamamlandı{" "}
                                            <Text style={{color:this.props.themeColors.notificationsDate, fontSize:15, fontFamily:FontFamilies.actionHeaderContent,}}>2w</Text>
                                        </Text>
                                    </View>
                                </View>
                                <View style={{flex:3, justifyContent:'center', alignItems:'center'}}>
                                    <Image source={{uri: this.props.item.picture.large}} resizeMode={"cover"} style={{width:'100%', aspectRatio:1, borderRadius:5, overflow:'hidden'}} />
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
  
export default connect(mapStateToProps)(NotificationLikeRow);
