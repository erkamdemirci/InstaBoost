import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { SVGs, FontSizes, FontFamilies } from '../constants'
import Svg, { Path, SvgProps, SvgXml } from "react-native-svg"
import { connect } from 'react-redux';

class CoinView extends Component {

    modifyNumber = (number) => {
        return number % 1 == 0 ? number : number.toFixed(2)
    }
    
    divideThousands = (number) => {
        const numberText = number.toString()
        return Math.abs(Number(numberText)) >= 1.0e+9
            ? this.modifyNumber(Math.abs(Number(numberText)) / 1.0e+9) + "B"
            : Math.abs(Number(numberText)) >= 1.0e+6
            ? this.modifyNumber(Math.abs(Number(numberText)) / 1.0e+6) + "M"
            : Math.abs(Number(numberText)) >= 1.0e+3
            ? this.modifyNumber(Math.abs(Number(numberText)) / 1.0e+3) + "K"
            : Math.abs(Number(numberText));
    }

    render() {
        return (
            <View style={{flexDirection: 'row', zIndex:10, justifyContent:'center', alignItems:'center', alignSelf: 'center'}}>
                {this.props.iconSide == 'left' || this.props.iconSide == null ? 
                <View style={{width:this.props.width ? this.props.width : 20, aspectRatio:1, marginRight:5, marginLeft:-5}}>
                    <SvgXml width='100%' height='100%' xml={SVGs.coin}></SvgXml>
                </View> : null}
                <View style={{alignItems:'center',  justifyContent:'center'}}>
                    <Text style={{paddingVertical:5, fontFamily:FontFamilies.coinText, bottom:-1, fontSize:this.props.size ? this.props.size : FontSizes.coinText, color: this.props.themeColors.coinText}}>{this.props.plus ? "+" : this.props.minus ? "-" : null}{this.props.price != null ? this.divideThousands(this.props.price) : "21.5K"}</Text>
                </View>
                {this.props.iconSide == 'right' ? 
                <View style={{width:this.props.width ? this.props.width : 20, aspectRatio:1, marginRight:-5, marginLeft:5}}>
                    <SvgXml width='100%' height='100%' xml={SVGs.coin}></SvgXml>
                </View> : null}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      themeColors: state.colorReducer.themeColors
    }
  }
  
  
export default connect(mapStateToProps)(CoinView);
