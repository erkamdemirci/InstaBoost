import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { SVGs, FontFamilies, FontSizes } from '../../../../constants'
import CoinView from '../../../../components/CoinView'
import { SvgXml } from "react-native-svg"
import { ProgressBar } from 'react-native-paper';
import Swipeout from 'react-native-swipeout';
import { LinearGradient } from 'expo-linear-gradient'

import { connect } from 'react-redux';

export class LikeRow extends Component {
    constructor(props) {
        super(props);
    }

    convertNumberF = (number) => {
        const numberText = number.toString()
        return Math.abs(Number(numberText)) >= 1.0e+9
        ? Math.abs(Number(numberText)) / 1.0e+9 + "B"
        : Math.abs(Number(numberText)) >= 1.0e+6
        ? Math.abs(Number(numberText)) / 1.0e+6 + "M"
        : Math.abs(Number(numberText)) >= 1.0e+3
        ? Math.abs(Number(numberText)) / 1.0e+3 + "K"
        : Math.abs(Number(numberText));
    }
    
    convertOneDigitDecimal = (number) => {
        return number.toFixed(1)
    }
    
    convertNumber = (number) => {
        return <Text>{this.convertNumberF(number)}</Text>;
    }

    renderRowContent = (item, isDone) => {
        return (
            <View style={{flex:1, flexDirection:'row', backgroundColor: this.props.themeColors.screenBackground}}>
                <View style={{flex:1, right:0, justifyContent:'center', opacity:0.3,  alignItems:'center'}}>
                    <SvgXml width='20' height='20' fill={this.props.themeColors.historyTypeIconTint} xml={SVGs.likeUncolored}></SvgXml>
                </View>
                <View style={[styles.rowContainer,{flex:11, opacity: isDone ? 1 : 1, backgroundColor: this.props.themeColors.screenBackground,
                            shadowColor: this.props.themeColors.rowShadow,
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            shadowOpacity: .2,
                            shadowRadius: 5}]}>
                    
                    <View style={{flex:1, flexDirection:'row', borderRadius:10, overflow:'hidden'}}>
                        <View style={{flex:8, flexDirection:'column', paddingHorizontal:15, paddingVertical:10}}>
                            <LinearGradient
                                // Background Linear Gradient
                                colors={[this.props.themeColors.linearGradientDark, this.props.themeColors.linearGradientLight]}
                                start={{ x: 0, y: .5 }}
                                end={{ x: 1, y: .5 }}
                                style={{
                                    opacity:.85,
                                    position:'absolute',
                                    top:0,
                                    left:0,
                                    bottom:0,
                                    right:0
                                }}
                            />
                            <View style={{flex:1,flexDirection:'row'}}>
                                <View style={{flex:1, backgroundColor:'transparent', justifyContent:'center', alignItems:'flex-start'}}>
                                    <Text style={{lineHeight:35, fontFamily:FontFamilies.historyTitle, bottom:-5, fontSize:25, color: isDone ? this.props.themeColors.historyRowComplete : this.props.themeColors.historyRowUncomplete}}>{ this.convertOneDigitDecimal((100*item.done) / item.total) }<Text style={{fontSize:17}}> %</Text></Text>
                                </View>
                                <View style={{right:10}}>
                                        <CoinView iconSide={'right'} size={19} price={-item.total*10} background={false}/>
                                </View>  
                            </View>
                            <View style={{flex:1, paddingVertical:8, flexDirection:'row'}}>
                                {isDone ? 
                                <View style={{flex:0.1, justifyContent:'center', alignItems:'flex-end', right:5}}>
                                    <Text style={{fontFamily:FontFamilies.historyTitle, bottom:-5, fontSize:16, color: isDone ? this.props.themeColors.historyRowComplete : "transparent"}}>✓</Text>
                                </View> : null}
                                <View style={{flex:1.3, justifyContent:'flex-end', aalignItems:'flex-start'}}>
                                    <Text style={{fontFamily:FontFamilies.historyTitle, bottom:-5, fontSize:16, color: isDone ? this.props.themeColors.historyRowComplete : this.props.themeColors.historyRowUncomplete}}>{isDone ? "Tamamlandı" : "Devam Ediyor.."}</Text>
                                </View>
                                <View style={{flex:1, justifyContent:'flex-end', alignItems:'flex-end', right:5}}>
                                    <Text style={{fontFamily:FontFamilies.historyContent, bottom:-5, fontSize:16, color: isDone ? this.props.themeColors.historyRowComplete : this.props.themeColors.historyRowUncomplete}}>{this.convertNumber(item.done)}/{this.convertNumber(item.total)}</Text>
                                </View>
                            </View>
                            <View style={{flex:1, padding:2}}>
                                <View style={{flex:1, justifyContent:'flex-start'}}>
                                    <ProgressBar progress={item.done/item.total} color={isDone ? this.props.themeColors.historyRowComplete : this.props.themeColors.historyRowUncomplete} style={{top:3, borderRadius:20, height:10}} />
                                </View>
                            </View>
                        </View>
                        <View style={{flex:3, justifyContent:'center', alignItems:'center',}}>
                            <View style={{height:'100%', width:'100%', justifyContent:'center', overflow:'hidden', alignItems:'center'}}>
                            {
                                item.postType == "video" 
                                ?
                                <View style={{position:'absolute', flex:1, zIndex:2, left:5, bottom:5, justifyContent:'flex-start', alignItems:'flex-end'}}>
                                    <SvgXml width='25' height='25' style={{}} fill={this.props.themeColors.white} xml={'<svg height="472pt" viewBox="0 -87 472 472" width="472pt" xmlns="http://www.w3.org/2000/svg"><path d="m467.101562 26.527344c-3.039062-1.800782-6.796874-1.871094-9.898437-.179688l-108.296875 59.132813v-35.480469c-.03125-27.601562-22.398438-49.96875-50-50h-248.90625c-27.601562.03125-49.96875 22.398438-50 50v197.421875c.03125 27.601563 22.398438 49.96875 50 50h248.90625c27.601562-.03125 49.96875-22.398437 50-50v-34.835937l108.300781 59.132812c3.097657 1.691406 6.859375 1.625 9.894531-.175781 3.039063-1.804688 4.898438-5.074219 4.898438-8.601563v-227.816406c0-3.53125-1.863281-6.796875-4.898438-8.597656zm-138.203124 220.898437c-.015626 16.5625-13.4375 29.980469-30 30h-248.898438c-16.5625-.019531-29.980469-13.4375-30-30v-197.425781c.019531-16.558594 13.4375-29.980469 30-30h248.90625c16.558594.019531 29.980469 13.441406 30 30zm123.101562-1.335937-103.09375-56.289063v-81.535156l103.09375-56.285156zm0 0"/></svg>'}></SvgXml>
                                </View>
                                :
                                null
                            }
                                <Image style={{width:'100%', height:'100%'}} resizeMode={'cover'} source={{uri : item.postUri}} />
                            </View>
                        </View>
                    </View>
                </View>
        </View>
        )
    }

    render() {
        return this.renderRowContent(this.props.item, this.props.isDone)
    }
}

const mapStateToProps = (state) => {
    return {
      themeColors: state.colorReducer.themeColors
    }
  }
  
export default connect(mapStateToProps)(LikeRow);



const styles = StyleSheet.create({
    rowContainer: {
      flex:10, flexDirection:'row',
      marginVertical:7.5,
      marginRight:12,
      borderRadius:10
    },
})