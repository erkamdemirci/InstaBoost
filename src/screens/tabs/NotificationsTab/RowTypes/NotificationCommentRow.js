import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { SVGs, FontFamilies, FontSizes } from '../../../../constants'
import { SvgXml } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux';

export class NotificationCommentRow extends Component {
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
                            <View style={{width:5, aspectRatio:1, backgroundColor:this.props.themeColors.commentMain, borderRadius:3}} />
                        </View>
                    }
                    <View style={{width:'100%', flexWrap:'wrap'}}>
                        <View style={{width:'100%', justifyContent:'center'}}>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                                <View style={{width:40, left:0, justifyContent:'center', opacity:.8, alignItems:'center'}}>
                                    <SvgXml width='22' height='22' fill={this.props.themeColors.commentMain} xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 18.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 1024.287 1024.287" style="enable-background:new 0 0 1024.287 1024.287;" xml:space="preserve"><g>	<path d="M832.519,132.576c-176.76-176.776-464.39-176.76-641.151,0c-176.768,176.768-176.768,464.39,0,641.15		c98.879,98.895,239.293,146.613,377.948,129.074l156.507,115.594c5.234,3.869,11.527,5.893,17.899,5.893		c2.676,0,5.359-0.353,7.988-1.075c8.914-2.456,16.212-8.859,19.79-17.381l44.641-106.208c6.45-15.341-0.761-33.004-16.102-39.454		c-15.349-6.435-33.02,0.761-39.454,16.102l-29.787,70.874L595.212,847.009c-6.466-4.779-14.611-6.819-22.529-5.532		c-123.809,19.217-250.365-22.019-338.706-110.36c-153.267-153.266-153.267-402.658,0-555.933		c153.259-153.259,402.643-153.274,555.933,0c97.404,97.42,136.38,235.699,104.255,369.897c-0.078,0.33-0.157,0.659-0.22,0.989		c-4.504,18.558-10.382,36.881-17.31,54.065L806.24,767.637c-6.45,15.341,0.761,33.004,16.102,39.454		c15.341,6.442,33.012-0.761,39.454-16.102l70.56-167.901c8.239-20.418,15.05-41.683,19.939-61.983		c0.447-1.42,0.785-2.849,1.02-4.285C989.364,402.801,944.307,244.364,832.519,132.576z"/>	<path d="M702.911,312.009h-362.96c-13.316,0-24.106,10.684-24.106,24s10.79,24,24.106,24h362.96c13.316,0,24.106-10.684,24.106-24		S716.228,312.009,702.911,312.009z"/>	<path d="M727.017,474.009c0-13.316-10.79-24-24.106-24h-362.96c-13.316,0-24.106,10.684-24.106,24c0,13.316,10.79,24,24.106,24		h362.96C716.228,498.009,727.017,487.325,727.017,474.009z"/>	<path d="M339.951,588.009c-13.316,0-24.106,10.684-24.106,24c0,13.316,10.79,24,24.106,24H547.44c13.316,0,24.106-10.684,24.106-24		c0-13.316-10.79-24-24.106-24H339.951z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'}></SvgXml>
                                </View>
                                <View style={{flex:14, flexDirection:'column', paddingHorizontal:5, paddingVertical:10}}>
                                    <View style={{paddingRight:10}}>
                                        <Text style={{fontFamily:FontFamilies.actionHeaderContent, fontSize:15, marginTop:6, color:this.props.themeColors.notificationsText, lineHeight:19}}>
                                            <Text style={{color:this.props.themeColors.commentMain, fontSize:17, fontFamily:FontFamilies.actionHeaderTitle,}}>{this.props.count} yorum</Text>
                                            {" "}alımı başarıyla tamamlandı. Aldığın yorumları görüntülemek için "History" sayfasına bakabilirsin!{" "}
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
  
export default connect(mapStateToProps)(NotificationCommentRow);
