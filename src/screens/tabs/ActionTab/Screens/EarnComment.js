import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl, Dimensions } from 'react-native'
import { FontFamilies, FontSizes, SVGs } from '../../../../constants'
import { SvgXml } from "react-native-svg"
import axios from 'axios';
import ImageSize from 'react-native-image-size'
import { WaveIndicator } from 'react-native-indicators';
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable';
import CoinView from '../../../../components/CoinView'

import { connect } from 'react-redux';
import { changeCurrentAccount } from '../../../../redux/actions/account';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export class EarnComment extends Component {
    constructor(props) {
        super(props);
        this.page = 1;
        this.postAspectRatio = 1;
        this.state = { 

            coinAmount: this.props.originalAccount.credit,

            loading: false,
            isRefreshing: false,
            error: null,
            data : []
        };
    }

    componentDidMount() {
        this.fetchUsers(this.page)
    }

    remove(index) {
        
        const newArray = [...this.state.data];
        newArray.splice(index, 1);
        
        this.setState({removeIndex:index, removeAnimation: true}, () => setTimeout(() => { this.updateCoinView(true); this.setState({removeIndex:null, removeAnimation: false, data: newArray})}, 500))

      }

    renderItem = ({ item, index }) => {
        return(
            <View style={{}}>
                <Animatable.View duration={300} animation={this.state.removeAnimation && this.state.removeIndex == index ? "lightSpeedOut" : undefined} style={{
                    flexDirection: 'column',
                    padding: 15,
                    marginHorizontal:10,
                    marginVertical:5,
                    alignItems: 'center',
                    justifyContent:'center',
                    shadowColor: this.props.themeColors.rowShadow,
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: .2,
                    shadowRadius: 5
                }}>
                <LinearGradient
                        // Background Linear Gradient
                        colors={[this.props.themeColors.linearGradientDark, this.props.themeColors.linearGradientLight]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            opacity:1,
                            position:'absolute',
                            top:0,
                            left:0,
                            bottom:0,
                            right:0,
                            borderRadius:10,

                        }}
                    />
                <View style={{width:'100%', flexDirection:'column'}}>
                    <View style={{width:'100%', justifyContent:'center', top:0}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:'12%', aspectRatio:1}}>
                                <Image source={{uri: item.picture.large}} style={{width:'100%', height:'100%', borderRadius:30, overflow:'hidden', borderWidth:1, borderColor:'white'}} />
                            </View>
                            {
                                item.dob.age < 60 ?
                                <View style={{flexGrow:1, flexDirection:'column', paddingLeft:8}}>
                                    <View style={{flex:1, justifyContent:'flex-end'}}>
                                        <Text style={{fontFamily:FontFamilies.name, fontSize:18, color:this.props.themeColors.earnCommentName}}>
                                            {item.name.first}
                                        </Text>
                                    </View>
                                    <Text style={{flex:1, fontFamily:FontFamilies.username, fontSize:15, color:this.props.themeColors.earnCommentUsername}}>
                                        {"@"+item.name.last}
                                    </Text>
                                </View>
                            :
                                <View style={{flexGrow:1, justifyContent:'center', flexDirection:'row', paddingLeft:4}}>
                                    <View style={{ width:35, left:-11, marginLeft:-30, justifyContent:'center', alignItems:'center'}}>
                                        <SvgXml width='25' height='25' fill={'rgba(0,0,0,0.7)'} xml={SVGs.lockColored}></SvgXml>
                                    </View>
                                    <View style={{ flexGrow:1, justifyContent:'center', alignItems:'flex-start',}}>
                                        <Text style={{fontFamily:FontFamilies.name, fontSize:17, color:this.props.themeColors.pink, textAlign:'left'}}>
                                            Gizli Hesap
                                        </Text>
                                    </View>
                                </View>
                            }
                            <View style={{justifyContent:'center', alignItems:'center'}}>
                                <TouchableOpacity disabled={this.state.removeAnimation} onPress={() => this.remove(index)} style={{paddingHorizontal:20, paddingVertical:8, borderWidth:2, borderRadius:10, backgroundColor:this.props.themeColors.earnCommentButtonBackground, borderColor:this.props.themeColors.earnCommentButtonBorder}}>
                                    <Text style={{fontFamily:FontFamilies.name, fontSize:16, color:this.props.themeColors.earnCommentButtonTitle}}>
                                        Yorum Yap
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingTop:15, flexDirection:'row', justifyContent:'center'}}>
                        <View style={{width:30, justifyContent:'center', alignItems:'center'}}>
                            <SvgXml width='20' height='20' fill={this.props.themeColors.earnCommentIconTint} xml={SVGs.commentUncolored}></SvgXml>
                        </View>
                        <View>
                            <Text style={{fontFamily:'gilroy-Medium', fontSize:16, color:this.props.themeColors.earnCommentText}}>
                                He likes to participate in class or help his peers with the work when he knows the answer.
                            </Text>
                        </View>
                    </View>
                </View>
                </Animatable.View>
                {
                    this.state.removeIndex == index && 
                    <Animatable.View duration={300} animation={this.state.removeAnimation ? "slideInLeft" : undefined} style={{position:'absolute', justifyContent:'center', width:50, height:'100%', left:40, backgroundColor:this.props.themeColors.screenBackground}}>
                        <CoinView price={100} plus={true} size={25} width={30} />
                    </Animatable.View>
                }
            </View>
        )
    }

    updateCoinView = (state) => {
        this.setState({coinAnimation:state}, () => setTimeout(() => {this.setState({coinAmount: this.state.coinAmount+100, coinAnimation: !state})}, 10))
    } 

    renderHeader = () => {
        return (
            <View style={{backgroundColor:this.props.themeColors.screenBackground, justifyContent:'center', alignItems:'center', padding:8, marginTop:16}}>           
                <Text style={{fontSize:25, fontFamily:FontFamilies.settingsRowContent, marginBottom:10, color:this.props.themeColors.headerTitle, textAlign:'center'}}>
                  Yorum Yap<Text style={{fontSize:27,  fontFamily: FontFamilies.settingsRowTitle, textTransform:'capitalize'}}> & Kazan</Text> 
                </Text>
                <Text style={{fontSize:15, paddingHorizontal:10, fontFamily:FontFamilies.historyTitle, color:this.props.themeColors.headerDesc, textAlign:'center'}}>
                    Gönderilere yorum yaparak, yorum başına <Text style={{color:this.props.themeColors.coinText, fontSize:17,  fontFamily: FontFamilies.settingsRowTitle, textTransform:'capitalize'}}> 100 Kredi</Text> kazanabilirsin.
                </Text>
            </View>
        );
    };
    

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View style={{
                width: '100%',
                height: 50, 
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:this.props.themeColors.screenBackground
              }}><WaveIndicator color={this.props.themeColors.loadingControl} size={48} /></View>
        );
    };

    handleLoadMore = () => {
        if (!this.state.loading) {
            this.page = this.page + 1;
            this.fetchUsers(this.page);
        }
    };

    fetchUsers(page) {
        //stackexchange User API url
            const url = 'https://randomuser.me/api/?page='+{page}+'&results=10';
            this.setState({ loading: true })
            axios.get(url)
            .then(res => {
                let listData = this.state.data;
                let data = listData.concat(res.data.results)
                this.setState({ loading: false, data: data, error: null })
            })
            .catch(error => {
                this.setState({ loading: false, error: 'Something just went wrong' })
            });
        }

    onRefresh() {
        this.setState({ isRefreshing: true });
        const url = 'https://randomuser.me/api/?page=1&results=10';
        axios.get(url)
            .then(res => {
            let data = res.data.results
            this.setState({ isRefreshing: false, data: data })
            })
            .catch(error => {
            this.setState({ isRefreshing: false, error: 'Something just went wrong' })
            });
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor:this.props.themeColors.screenBackground}}>
                {   this.state.loading &&
                        <View style={{
                            width: '100%',
                            height: windowHeight-160,
                            position:'absolute', 
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:this.props.themeColors.screenBackground
                        }}><WaveIndicator color={this.props.themeColors.loadingControl} size={60} /></View>
                }
                {   this.state.error &&
                        <Animatable.View animation={this.state.error ? "fadeInDown" : "fadeOutDown"} style={{
                            width: '100%',
                            height: windowHeight-100, 
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:this.props.themeColors.screenBackground,
                        }}>
                            <TouchableOpacity onPress={() => this.fetchUsers(this.page)} style={{ justifyContent:'center', alignItems:'center', flexDirection:'column' }}>
                                <SvgXml width='70' height='70' xml={SVGs.reload}></SvgXml>
                                <Text style={{color:this.props.themeColors.dataCantLoadDesc, fontSize:26, lineHeight:30, textAlign:'center', padding:20, fontFamily:FontFamilies.balooRegular}}>
                                    <Text style={{color:this.props.themeColors.dataCantLoadTitle, fontSize:30}}>Bildirimler Yüklenemedi</Text>{"\n"}<Text>Tekrar denemek için tıklayın!</Text>
                                </Text>
                            </TouchableOpacity>
                        </Animatable.View>
                }
                {   this.state.data.length > 3 &&
                    <FlatList
                        ref={(ref) => { this._flatList = ref; }}
                        scrollToOverflowEnabled={true}
                        ListHeaderComponent = { this.renderHeader }
                        contentContainerStyle={{
                            paddingBottom: 75,
                            backgroundColor:this.props.themeColors.screenBackground
                        }}
                        showsHorizontalScrollIndicator={false} 
                        showsVerticalScrollIndicator={false}
                        data = { this.state.data ? this.state.data : null }
                        refreshControl={
                            <RefreshControl
                                tintColor={this.props.themeColors.loadingControl}
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                        renderItem = {(item,index) => this.renderItem(item,index) }
                        keyExtractor={(item,index) => index.toString()}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        onEndReachedThreshold={0.5}
                        onEndReached={this.handleLoadMore.bind(this)}
                    /> 
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


export default connect(mapStateToProps, mapDispatchToProps)(EarnComment);

const styles = StyleSheet.create({
})
