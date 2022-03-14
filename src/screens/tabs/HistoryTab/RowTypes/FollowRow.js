import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { SVGs, FontFamilies, FontSizes } from '../../../../constants'
import CoinView from '../../../../components/CoinView'
import { SvgXml } from "react-native-svg"
import { ProgressBar } from 'react-native-paper';
import Swipeout from 'react-native-swipeout';
import { LinearGradient } from 'expo-linear-gradient'

import { connect } from 'react-redux';

export class FollowRow extends Component {
    constructor(props) {
        super(props);
    }

    convertNumber = (number) => {
        return <Text>{this.convertNumberF(number)}</Text>;
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

    renderRowContent = (item, isDone) => {
        return (
            <View style={{flex:1, flexDirection:'row', backgroundColor:this.props.themeColors.screenBackground}}>
                <View style={{flex:1, right:0, justifyContent:'center', opacity:0.3,  alignItems:'center'}}>
                    <SvgXml width='20' height='20' fill={this.props.themeColors.historyTypeIconTint} xml={SVGs.followUncolored}></SvgXml>
                </View>
                <View style={[styles.rowContainer,{flex:11, opacity: isDone ? 1 : 1, backgroundColor:this.props.themeColors.screenBackground,
                            shadowColor: this.props.themeColors.rowShadow,
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            shadowOpacity: .2,
                            shadowRadius: 5}]}>
                    <View style={{flex:8, flexDirection:'column', paddingHorizontal:15, paddingVertical:10, borderRadius:10, overflow:'hidden'}}>
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
                            <Text style={{lineHeight:35, fontFamily:'gilroy-Black', bottom:-5, fontSize:25, color: isDone ? this.props.themeColors.historyRowComplete : this.props.themeColors.historyRowUncomplete}}>{ this.convertOneDigitDecimal((100*item.done) / item.total) }<Text style={{fontSize:17}}> %</Text></Text>
                        </View>
                        <View style={{right:10}}>
                                <CoinView iconSide={'right'} size={19} price={-item.total*15} background={false}/>
                        </View>  
                        </View>
                        <View style={{flex:1, paddingVertical:8, flexDirection:'row'}}>
                        {isDone ? 
                        <View style={{flex:0.1, justifyContent:'center', alignItems:'flex-end', right:5}}>
                            <Text style={{fontFamily:'gilroy-Black', bottom:-5, fontSize:16, color: isDone ? this.props.themeColors.historyRowComplete : "transparent"}}>✓</Text>
                        </View> : null}
                        <View style={{flex:1.3, justifyContent:'flex-end', aalignItems:'flex-start'}}>
                            <Text style={{fontFamily:'gilroy-Black', bottom:-5, fontSize:16, color: isDone ? this.props.themeColors.historyRowComplete : this.props.themeColors.historyRowUncomplete}}>{isDone ? "Tamamlandı" : "Devam Ediyor.."}</Text>
                        </View>
                        <View style={{flex:1, justifyContent:'flex-end', alignItems:'flex-end', right:5}}>
                            <Text style={{fontFamily:'gilroy-Black', bottom:-5, fontSize:16, color: isDone ? this.props.themeColors.historyRowComplete : this.props.themeColors.historyRowUncomplete}}>{this.convertNumber(item.done)}/{this.convertNumber(item.total)}</Text>
                        </View>
                        </View>
                        <View style={{flex:1, padding:2}}>
                        <View style={{flex:1, justifyContent:'flex-start'}}>
                            <ProgressBar progress={item.done/item.total} color={isDone ? this.props.themeColors.historyRowComplete : this.props.themeColors.historyRowUncomplete} style={{top:3, borderRadius:25, height:10}} />
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
  
export default connect(mapStateToProps)(FollowRow);

const styles = StyleSheet.create({
    rowContainer: {
        flex:10, flexDirection:'row',
        marginVertical:7.5,
        marginRight:12,
        borderRadius:10,
      },
})