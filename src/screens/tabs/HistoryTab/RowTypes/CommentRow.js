import React, { Component } from 'react'
import { Text, Button, View, StyleSheet, Image, TouchableOpacity, LayoutAnimation, Platform, UIManager, FlatList } from 'react-native'
import { FontFamilies, FontSizes, SVGs } from '../../../../constants'
import CoinView from '../../../../components/CoinView'
import { SvgXml } from "react-native-svg"
import { ProgressBar } from 'react-native-paper';
import Swipeout from 'react-native-swipeout';
import Modal from 'react-native-modal';
import { LinearGradient } from 'expo-linear-gradient'

import { connect } from 'react-redux';

class CommentRow extends Component{
    
    constructor(props) {
        super(props);
        this.state = { 
          comments: props.comments,
          expanded : false,
          isModalVisible: false,
          deleteCommentText: '',
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
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

    toggleModal = () => {
        this.setState({isModalVisible : !this.state.isModalVisible});
    };

    onClick=(index)=>{
        const temp = this.state.comments.slice()
        temp[index].value = !temp[index].value
        this.setState({comments: temp})
    }

    toggleExpand=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState({expanded : !this.state.expanded})
    }

    renderRowContent = (item, isDone, comments) => {
        return (
            <View>
                <TouchableOpacity onPress={()=>this.toggleExpand()} style={{flex:1, flexDirection:'row', backgroundColor:this.props.themeColors.screenBackground}}>
                    <View style={{flex:1, right:0, justifyContent:'center', opacity:0.3,  alignItems:'center'}}>
                        <SvgXml width='20' height='20' fill={this.props.themeColors.historyTypeIconTint} xml={SVGs.commentUncolored}></SvgXml>
                    </View>
                    <View style={[styles.rowContainer,{flex:11, opacity: isDone ? 1 : 1, backgroundColor:this.props.themeColors.screenBackground, 
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
                                    <Text style={{lineHeight:35, fontFamily:'gilroy-Black', bottom:-5, fontSize:25, color: isDone ? this.props.themeColors.historyRowComplete : this.props.themeColors.historyRowUncomplete}}>{ this.convertOneDigitDecimal((100*item.done) / item.total) }<Text style={{fontSize:17}}> %</Text></Text>
                                </View>
                                <View style={{right:10}}>
                                        <CoinView iconSide={'right'} size={19} price={-item.total*30} background={false}/>
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
                                    <ProgressBar progress={item.done/item.total} color={isDone ? this.props.themeColors.historyRowComplete : this.props.themeColors.historyRowUncomplete} style={{top:3, borderRadius:20, height:10}} />
                                </View>
                                </View>
                            </View>
                            <View style={{flex:3, justifyContent:'center', alignItems:'center'}}>
                                <View style={{alignItems:'center', justifyContent:'center', height:'100%', aspectRatio:1}}>
                                    <View style={{height:'100%', aspectRatio:1}}>
                                        {
                                            item.postType == "video" 
                                            ?
                                            <View style={{position:'absolute', flex:1, zIndex:2, left:5, bottom:5, justifyContent:'flex-start', alignItems:'flex-end',
                                            shadowColor: this.props.themeColors.black,
                                            shadowOffset: {
                                                width: 0,
                                                height: 0,
                                            },
                                            shadowOpacity: 0.92,
                                            shadowRadius: 2.84,
                                            elevation: 2}}>
                                                <SvgXml width='25' height='25' style={{}} fill={this.props.themeColors.white} xml={'<svg height="472pt" viewBox="0 -87 472 472" width="472pt" xmlns="http://www.w3.org/2000/svg"><path d="m467.101562 26.527344c-3.039062-1.800782-6.796874-1.871094-9.898437-.179688l-108.296875 59.132813v-35.480469c-.03125-27.601562-22.398438-49.96875-50-50h-248.90625c-27.601562.03125-49.96875 22.398438-50 50v197.421875c.03125 27.601563 22.398438 49.96875 50 50h248.90625c27.601562-.03125 49.96875-22.398437 50-50v-34.835937l108.300781 59.132812c3.097657 1.691406 6.859375 1.625 9.894531-.175781 3.039063-1.804688 4.898438-5.074219 4.898438-8.601563v-227.816406c0-3.53125-1.863281-6.796875-4.898438-8.597656zm-138.203124 220.898437c-.015626 16.5625-13.4375 29.980469-30 30h-248.898438c-16.5625-.019531-29.980469-13.4375-30-30v-197.425781c.019531-16.558594 13.4375-29.980469 30-30h248.90625c16.558594.019531 29.980469 13.441406 30 30zm123.101562-1.335937-103.09375-56.289063v-81.535156l103.09375-56.285156zm0 0"/></svg>'}></SvgXml>
                                            </View>
                                            :
                                            null
                                        }
                                        <Image style={{ width:'100%', height:'100%'}} resizeMode={'cover'} source={{uri : item.postUri}} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    this.state.expanded &&
                    <View style={{}}>
                        <FlatList
                        data={this.state.comments}
                        numColumns={1}
                        keyExtractor={item => item.key.toString()}
                        scrollEnabled={false}
                        renderItem={({item, index}) => 
                            <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{flex:1.5, justifyContent:'flex-start', top:12.5, alignItems:'center'}}>
                                    <Text style={{fontSize:20, fontFamily:'gilroy-Black', color:item.isDone ? this.props.themeColors.historyRowComplete : this.props.themeColors.historyRowUncomplete}}>{item.key}</Text>
                                </View>
                                <TouchableOpacity style={[styles.childRow,{flex:10, flexDirection:'column'}]} activeOpacity={1} onPress={()=>this.onClick(index)}>
                                    <Text style={{color:item.isDone ? this.props.themeColors.historyRowComplete : this.props.themeColors.historyRowUncomplete,  fontFamily:'gilroy-Black', paddingBottom:3}}>{item.isDone ? "Tamamlandı" : "Bekleniyor.."}</Text>
                                    <Text style={{flex:1, fontFamily:'gilroy-Medium', color: item.done ? this.props.themeColors.themeMiddle : this.props.themeColors.historyRowUncomplete}} >{item.comment}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> {this.toggleModal(); this.setState({deleteCommentText:item.comment})}} disabled={item.isDone ? true : false} style={{flex:1.5, justifyContent:'center', alignItems:'flex-start', left:3}}>
                                    <SvgXml width='25' height='25' fill={item.isDone ? this.props.themeColors.historyRowComplete : this.props.themeColors.red} xml={item.isDone ? '<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="45.701px" height="45.7px" viewBox="0 0 45.701 45.7" style="enable-background:new 0 0 45.701 45.7;" xml:space="preserve"	><g>	<g>		<path d="M20.687,38.332c-2.072,2.072-5.434,2.072-7.505,0L1.554,26.704c-2.072-2.071-2.072-5.433,0-7.504			c2.071-2.072,5.433-2.072,7.505,0l6.928,6.927c0.523,0.522,1.372,0.522,1.896,0L36.642,7.368c2.071-2.072,5.433-2.072,7.505,0			c0.995,0.995,1.554,2.345,1.554,3.752c0,1.407-0.559,2.757-1.554,3.752L20.687,38.332z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>' : '<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g>	<g>		<g>			<path d="M472,83H351V60c0-33.084-26.916-60-60-60h-70c-33.084,0-60,26.916-60,60v23H40c-11.046,0-20,8.954-20,20s8.954,20,20,20				h20.712l24.374,315.987c0.007,0.092,0.015,0.185,0.023,0.278c1.816,19.924,10.954,38.326,25.73,51.816				C125.615,504.571,144.771,512,164.778,512h182.444c41.667,0,75.917-31.032,79.669-72.183				c1.003-11.001-7.101-20.731-18.101-21.734c-11.011-1.003-20.731,7.101-21.734,18.101C385.195,456.603,368.07,472,347.222,472				H164.778c-20.777,0-37.875-15.571-39.823-36.242L100.831,123h310.338l-17.082,221.462c-0.849,11.013,7.39,20.629,18.403,21.479				c0.524,0.04,1.043,0.06,1.56,0.06c10.347,0,19.11-7.974,19.919-18.463L451.288,123H472c11.046,0,20-8.954,20-20				S483.046,83,472,83z M311,83H201V60c0-11.028,8.972-20,20-20h70c11.028,0,20,8.972,20,20V83z"/>			<path d="M165.127,163.019c-11.035,0.482-19.59,9.818-19.108,20.854l10,228.933c0.469,10.738,9.322,19.128,19.966,19.128				c0.294,0,0.591-0.006,0.888-0.02c11.035-0.482,19.59-9.818,19.108-20.854l-10-228.934				C185.499,171.092,176.145,162.523,165.127,163.019z"/>			<path d="M326.019,182.127l-10,228.934c-0.482,11.035,8.073,20.372,19.108,20.854c0.297,0.013,0.593,0.02,0.888,0.02				c10.643,0,19.497-8.39,19.966-19.128l10-228.933c0.482-11.035-8.073-20.372-19.108-20.854				C335.856,162.527,326.501,171.092,326.019,182.127z"/>			<path d="M236,183v228.933c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V183c0-11.046-8.954-20-20-20S236,171.954,236,183z"/>		</g>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'} />
                                </TouchableOpacity>
                                <Modal isVisible={this.state.isModalVisible} style={{justifyContent:'center', alignItems:'center'}}>
                                    <View style={{padding:20, zIndex:2, bottom:-20, backgroundColor:this.props.themeColors.screenBackground,
                                            borderRadius:50,
                                            shadowColor: this.props.themeColors.historyRowUncomplete,
                                            shadowOffset: {
                                                width: 0,
                                                height: 0,
                                            },
                                            shadowOpacity: 0.32,
                                            shadowRadius: 4.84,
                                            elevation: 2}}>                                        
                                        <SvgXml width='35' height='35' fill={this.props.themeColors.pink} xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g>	<g>		<g>			<path d="M472,83H351V60c0-33.084-26.916-60-60-60h-70c-33.084,0-60,26.916-60,60v23H40c-11.046,0-20,8.954-20,20s8.954,20,20,20				h20.712l24.374,315.987c0.007,0.092,0.015,0.185,0.023,0.278c1.816,19.924,10.954,38.326,25.73,51.816				C125.615,504.571,144.771,512,164.778,512h182.444c41.667,0,75.917-31.032,79.669-72.183				c1.003-11.001-7.101-20.731-18.101-21.734c-11.011-1.003-20.731,7.101-21.734,18.101C385.195,456.603,368.07,472,347.222,472				H164.778c-20.777,0-37.875-15.571-39.823-36.242L100.831,123h310.338l-17.082,221.462c-0.849,11.013,7.39,20.629,18.403,21.479				c0.524,0.04,1.043,0.06,1.56,0.06c10.347,0,19.11-7.974,19.919-18.463L451.288,123H472c11.046,0,20-8.954,20-20				S483.046,83,472,83z M311,83H201V60c0-11.028,8.972-20,20-20h70c11.028,0,20,8.972,20,20V83z"/>			<path d="M165.127,163.019c-11.035,0.482-19.59,9.818-19.108,20.854l10,228.933c0.469,10.738,9.322,19.128,19.966,19.128				c0.294,0,0.591-0.006,0.888-0.02c11.035-0.482,19.59-9.818,19.108-20.854l-10-228.934				C185.499,171.092,176.145,162.523,165.127,163.019z"/>			<path d="M326.019,182.127l-10,228.934c-0.482,11.035,8.073,20.372,19.108,20.854c0.297,0.013,0.593,0.02,0.888,0.02				c10.643,0,19.497-8.39,19.966-19.128l10-228.933c0.482-11.035-8.073-20.372-19.108-20.854				C335.856,162.527,326.501,171.092,326.019,182.127z"/>			<path d="M236,183v228.933c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V183c0-11.046-8.954-20-20-20S236,171.954,236,183z"/>		</g>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'} />
                                    </View>
                                    <View style={styles.modalView}>
                                        <Text style={[styles.modalCommentText, {color:this.props.themeColors.black}]}>{this.state.deleteCommentText}</Text>
                                        <View style={{flexDirection:'row', height:50, width:'100%'}}>
                                            <TouchableOpacity style={[styles.modalApproveBtn, {flex:1, backgroundColor:this.props.themeColors.historyRowUncomplete}]} onPress={this.toggleModal}><Text style={[styles.modalBtnText]}>Yorumu Sil</Text></TouchableOpacity>
                                            <TouchableOpacity style={[styles.modalCancelBtn, {flex:1, backgroundColor:this.props.themeColors.pink}]} onPress={this.toggleModal}><Text style={[styles.modalBtnText]}>Vazgeç</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        }/>
                    </View>
                }
            </View>
        )
    }

    render() {        
        return this.renderRowContent(this.props.item, this.props.isDone,this.props.item.comments)

    }
}

const mapStateToProps = (state) => {
    return {
      themeColors: state.colorReducer.themeColors
    }
  }
  
export default connect(mapStateToProps)(CommentRow);

const styles = StyleSheet.create({
 
    childRow:{
        flexDirection:'row',
        backgroundColor:'transparent',
        marginTop:15,
        paddingBottom:5,
        paddingRight:10,
        borderRadius:10,
    },
    rowContainer: {
        flex:10, flexDirection:'row',
        marginVertical:7.5,
        marginRight:12,
        borderRadius:10
      },
    modalView: {
        backgroundColor: 'white',
        paddingTop: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        overflow:'hidden',

    },
    modalCommentText: {
        fontSize: 18,
        fontFamily:'gilroy-Medium',
        textAlign:'center',
        padding:20
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
        color:'white',
    }
    
});