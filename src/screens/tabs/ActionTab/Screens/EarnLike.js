import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Dimensions, Button, Image, TouchableOpacity, Platform } from 'react-native'
import { FontFamilies, FontSizes, SVGs } from '../../../../constants'
import { SvgXml } from "react-native-svg"
import axios from 'axios';
import { WaveIndicator } from 'react-native-indicators';
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable';
import CoinView from '../../../../components/CoinView'
import Swiper from 'react-native-deck-swiper'
import { isEqual } from 'lodash';

import { connect } from 'react-redux';
import { changeCurrentAccount } from '../../../../redux/actions/account';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function * range (start, end) {
    for (let i = start; i <= end; i++) {
        yield i
    }
}

class TinderScreen extends Component{
    constructor(props) {
        super(props);
        
        this.state = { 
            cards: props.cards,
            swipedAllCards: false,
            isSwipingBack: false,
            cardIndex: 0,
        };
    }


    renderCard = (card) => {
        const index = card.registered.age
        return (
            <View style={styles.card}>
                <Image
                    thumbnailSource={{uri: 'https://source.unsplash.com/collection/'+index+'/100x100'}}
                    source={{uri : 'https://source.unsplash.com/collection/'+index+'/500x500'}}  resizeMode={'cover'} width={'3%'} height={'3%'}
                        style={{
                        height: '100%',
                        width: '100%',
                        }} />
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.6)','rgba(0,0,0,0.4)','rgba(0,0,0,0.3)','rgba(0,0,0,0)']}
                    start={{ x: 0.5, y: 0 }}
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
                <View style={{width:'100%', height:70, padding:10, justifyContent:'center', position:'absolute', top:0, flexDirection:'row'}}>
                    <View style={{flexDirection:'row', flex:2}}>
                        <View style={{width:'22%', aspectRatio:1}}>
                            <Image source={{uri: card.picture.thumbnail}} style={{width:'100%', height:'100%', borderRadius:50, overflow:'hidden', borderWidth:1, borderColor:'white'}} />
                        </View>
                        <View style={{flexGrow:1, flexDirection:'column', paddingLeft:7}}>
                            <View style={{flex:1, justifyContent:'flex-end'}}>
                                <Text style={{fontFamily:FontFamilies.name, fontSize:16, color:this.props.themeColors.white}}>
                                    {card.name.first}
                                </Text>
                            </View>
                            <Text style={{flex:1, fontFamily:FontFamilies.username, fontSize:14, color:this.props.themeColors.white}}>
                                {"@"+card.name.last}
                            </Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end', alignItems:'center', marginRight:10}}>
                        <View>
                            <Text style={{fontFamily:FontFamilies.name, fontSize:18, color:this.props.themeColors.white, marginRight:5}}>
                                {card.dob.age}.{card.registered.age}K
                            </Text>
                        </View>
                        <View style={{ justifyContent:'center', alignItems:'center' }}>
                            <SvgXml width='25' height='25' fill={this.props.themeColors.white} xml={SVGs.likeUncolored}></SvgXml>
                        </View>
                    </View>
                </View>
                <View style={{position:'absolute', width:'100%', flexDirection:'row', bottom:30}}>
                    <View style={{flex:1, alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={() => this.swiper.swipeLeft()} style={{padding:30, borderRadius:50, backgroundColor:this.props.themeColors.white, 
                            shadowColor: this.props.themeColors.rowShadow,
                            shadowOffset: {
                            width: 0,
                            height: 0,
                            },
                            shadowOpacity: 0.35,
                            shadowRadius: 8.84,
                            elevation: 2}}>
                            <SvgXml width='35' height='35' fill={this.props.themeColors.red} xml={SVGs.tinderCancel}></SvgXml>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:.3}}/>
                    <View style={{flex:1, alignItems:'flex-start'}}>
                        <TouchableOpacity onPress={() => this.swiper.swipeRight()} style={{padding:25, borderRadius:50, backgroundColor:this.props.themeColors.white, 
                            shadowColor: this.props.themeColors.rowShadow,
                            shadowOffset: {
                            width: 0,
                            height: 0,
                            },
                            shadowOpacity: 0.35,
                            shadowRadius: 8.84,
                            elevation: 2}}>
                            <SvgXml width='45' height='45' fill={this.props.themeColors.likeMain} xml={SVGs.likeUncolored}></SvgXml>
                        </TouchableOpacity>
                    </View>
                </View>
              </View>
        )
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(!isEqual(this.props.cards, prevProps.cards)) {
            this.setState({
                swipedAllCards: false,
                cardIndex: this.props.cardIndex,
                swiperKey: this.props.cards.length
            });
        }
    }

    onSwipedAllCards = () => {
        this.setState({
            swipedAllCards: true
        })
    };

    render() {
        return (
            <Swiper
                key={this.state.swiperKey}
                ref={swiper => {
                    this.swiper = swiper
                }}
                onSwipedLeft={(cardIndex) => this.props.onSwiped(cardIndex, 'left')}
                onSwipedRight={(cardIndex) => this.props.onSwiped(cardIndex, 'right')}
                containerStyle={{marginTop:110}}
                onTapCard={this.swipeLeft}
                verticalSwipe={false}
                cards={this.props.cards}
                cardIndex={this.state.cardIndex}
                cardVerticalMargin={0}
                cardHorizontalMargin={10}
                renderCard={this.renderCard}
                onSwipedAll={this.onSwipedAllCards}
                backgroundColor={this.props.themeColors.screenBackground}
                stackSize={5}
                stackSeparation={20}
                overlayLabels={{
                    left: {
                    title: 'NOPE',
                    style: {
                        label: {
                            fontFamily:FontFamilies.balooRegular,
                            backgroundColor: 'white',
                            borderColor: 'white',
                            color: this.props.themeColors.pink,
                            padding:0,
                            paddingHorizontal:10,
                        },
                        wrapper: {
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                        marginTop: 30,
                        marginLeft: -30
                        }
                    }
                    },
                    right: {
                    title: 'LIKE',
                    style: {
                        label: {
                            fontFamily:FontFamilies.balooRegular,
                            backgroundColor: 'white',
                            borderColor: 'white',
                            color: this.props.themeColors.pink,
                            padding:0,
                            paddingHorizontal:10,
                        },
                        wrapper: {
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            marginTop: 10,
                            marginLeft: 5,
                            paddingHorizontal:20,
                        }
                    }
                    },
                }}
                animateOverlayLabelsOpacity
                animateCardOpacity
                swipeBackCard
                >
            </Swiper>   
        )
    }
}

export class EarnLike extends Component {
    constructor(props) {
        super(props);
        this.page = 1;
        this.postAspectRatio = 1;
        
        this.state = { 
            coinAmount: this.props.originalAccount.credit,
            
            cards: [],
            swipedAllCards: false,
            swipeDirection: '',
            cardIndex: 0,

            totalRated : 0
        };
    }

    updateCoinView = (state) => {
        this.setState({coinAnimation:state}, () => setTimeout(() => {this.setState({coinAmount: this.state.coinAmount+50, coinAnimation: !state})}, 100))
    } 

    renderHeader = () => {
        return (
            <View style={{backgroundColor:this.props.themeColors.screenBackground, justifyContent:'center', alignItems:'center', padding:8}}>           
                <Text style={{fontSize:25, fontFamily:FontFamilies.settingsRowContent, marginBottom:10, color:this.props.themeColors.headerTitle, textAlign:'center'}}>
                  Beğen<Text style={{fontSize:27,  fontFamily: FontFamilies.settingsRowTitle, textTransform:'capitalize'}}> & Kazan</Text> 
                </Text>
                <Text style={{fontSize:15, paddingHorizontal:10, fontFamily:FontFamilies.historyTitle, color:this.props.themeColors.headerDesc, textAlign:'center'}}>
                    Gönderileri beğenerek, beğeni başına <Text style={{color:this.props.themeColors.coinText, fontSize:17,  fontFamily: FontFamilies.settingsRowTitle, textTransform:'capitalize'}}> 30 Kredi</Text> kazanabilirsin.
                </Text>
            </View>
        );
    };

    componentDidMount() {
        this.fetchPosts(this.page)
    }

    fetchPosts(cardIndex) {
        const url = 'https://randomuser.me/api/?page='+{cardIndex}+'&results=20';
        this.setState({ loading: true })
        axios.get(url)
        .then(res => {
            this.page += 1
            let cards = this.state.cards;
            let data = cards.concat(res.data.results)
            this.setState({ loading: false, cards: data, error: null })
        })
        .catch(error => {
            this.setState({ loading: false, error: 'Something just went wrong' })
        });
    }

    onSwiped = (cardIndex, direction) => {
        const {cards} = this.state
        const newCardNumber = cards[cards.length - 1] + 1
        const nextIndex = cardIndex+1
        
        if(direction == "right") this.updateCoinView(true)

        if(cards.length - cardIndex == 3){
            this.fetchPosts(cardIndex)
            this.setState({cardIndex: nextIndex})
        }
      }

    render() {
        return (
            <View style={[styles.container,{backgroundColor:this.props.themeColors.screenBackground}]}>
                {this.renderHeader()}

                {   this.state.loading &&
                        <View style={{
                            width: '100%',
                            height: windowHeight-160, 
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:this.props.themeColors.screenBackground
                        }}><WaveIndicator color={this.props.themeColors.loadingControl} size={60} /></View>
                }
                {   this.state.error &&
                        <Animatable.View animation={this.state.error ? "fadeInDown" : "fadeOutDown"} style={{
                            width: '100%',
                            height: windowHeight-200, 
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:this.props.themeColors.screenBackground,
                        }}>
                            <TouchableOpacity onPress={() => this.fetchPosts(this.page)} style={{ justifyContent:'center', alignItems:'center', flexDirection:'column' }}>
                                <SvgXml width='70' height='70' xml={SVGs.reload}></SvgXml>
                                <Text style={{color:this.props.themeColors.dataCantLoadDesc, fontSize:26, lineHeight:30, textAlign:'center', padding:20, fontFamily:FontFamilies.balooRegular}}>
                                    <Text style={{color:this.props.themeColors.dataCantLoadTitle, fontSize:30}}>Gönderiler Yüklenemedi</Text>{"\n"}<Text>Tekrar denemek için tıklayın!</Text>
                                </Text>
                            </TouchableOpacity>
                        </Animatable.View>
                }
                {   this.state.cards.length > 3 &&
                        <TinderScreen themeColors={this.props.themeColors} cards={this.state.cards} cardIndex={this.state.cardIndex} onSwiped={this.onSwiped}/>
                }
            </View>
        )
    }

    componentDidUpdate(prevProps) {
        this.props.navigation.setOptions({
            headerTitle: () => (
                <View style={{flexDirection:'row'}}>
                    <Animatable.View duration={150} animation={this.state.accAnimation ? "fadeOutUp" : "fadeInDown"}  style={{ width:50, aspectRatio:1, top:5, borderRadius:25, overflow:'hidden'}}>
                        <Image source={{uri : this.props.currentAccount.imageLink}} style={{width:'100%', height:'100%'}} />
                    </Animatable.View>
                    <TouchableOpacity activeOpacity={.7} onPress={() => {this.updateActiveAcc(!this.state.accAnimation)} } style={{width:30, height:30, borderWidth:1, borderColor:this.props.themeColors.navbarTintTheme, borderRadius:15, overflow:'hidden', top:15, zIndex:2, left:40, position:'absolute', backgroundColor:this.props.themeColors.navbarTintAntiTheme, justifyContent:'center', alignItems:'center'}}>
                        <SvgXml width='13' height='13' fill={this.props.themeColors.navbarTintTheme} xml={SVGs.navChangeAccount}></SvgXml>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <Animatable.View animation={this.state.coinAnimation ? "flipOutX" : "flipInX"} duration={100} style={{marginRight:20, flexDirection:'row'}}>
                    <CoinView size={21} wid th={26} iconSide={'right'} price={this.state.coinAmount}/>
                </Animatable.View>
            ),
        });
    }

    updateActiveAcc = (state) => {
        this.setState({accAnimation:state}, () => setTimeout(() => {this.setState({accAnimation: !state})}, 200))
        if(this.props.backupAccount){
            this.props.currentAccount == this.props.backupAccount ? 
            this.props.changeCurrentAccount(this.props.originalAccount) :
            this.props.changeCurrentAccount(this.props.backupAccount)
        }else{
            this.props.navigation.navigate('BackupAccount')
        }
    }
}

const mapStateToProps = (state) => {
    return {
        themeColors: state.colorReducer.themeColors,
        currentAccount: state.accountReducer.currentAccount,
        originalAccount: state.accountReducer.originalAccount,
        backupAccount: state.accountReducer.backupAccount,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentAccount: (account) => dispatch(changeCurrentAccount(account))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EarnLike);

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: Platform.OS == "ios" ? 20 : 0
    },
    card: {
      width:'100%',
      height: windowHeight-250,
      borderRadius: 20,
      borderWidth: 0,
      borderColor: 'rgba(255,255,255,1)',
      justifyContent: 'center',
      backgroundColor: 'white',
      overflow:'hidden'
    }
})
