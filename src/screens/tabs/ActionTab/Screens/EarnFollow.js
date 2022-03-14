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

export class EarnFollow extends Component {
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
                    paddingVertical: 4,
                    marginHorizontal:10,
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
                <View style={{width:'100%', height:65}}>
                    <View style={{width:'100%', height:65, justifyContent:'center', position:'absolute', paddingRight:10, borderRadius:10, overflow:'hidden'}}>
                        <LinearGradient
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
                        <View style={{flexDirection:'row'}}>
                            <View style={{height:'100%', aspectRatio:1}}>
                                <Image source={{uri: item.picture.large}} style={{width:'100%', height:'100%'}} />
                            </View>
                            {
                                item.dob.age < 60 ?
                                    <View style={{flexGrow:1, flexDirection:'column', paddingLeft:8}}>
                                        <View style={{flex:1, justifyContent:'flex-end'}}>
                                            <Text style={{fontFamily:FontFamilies.name, fontSize:18, color:this.props.themeColors.earnFollowName}}>
                                                {item.name.first}
                                            </Text>
                                        </View>
                                        <Text style={{flex:1, fontFamily:FontFamilies.username, fontSize:15, color:this.props.themeColors.earnFollowUsername}}>
                                            {"@"+item.name.last}
                                        </Text>
                                    </View>
                                :
                                    <View style={{flexGrow:1, justifyContent:'center', flexDirection:'row', paddingLeft:4}}>
                                        <View style={{ height:65, width:65, marginLeft:-69, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,.6)'}}>
                                            <SvgXml width='35' height='35' fill={'rgba(255,255,255,0.7)'} xml={SVGs.lockColored}></SvgXml>
                                        </View>
                                        <View style={{ flexGrow:1, justifyContent:'center', alignItems:'flex-start', paddingLeft:8}}>
                                            <Text style={{fontFamily:FontFamilies.name, fontSize:18, color:this.props.themeColors.pink, textAlign:'left'}}>
                                                Gizli Hesap
                                            </Text>
                                        </View>
                                    </View>
                            }
                            <View style={{justifyContent:'center', alignItems:'center'}}>
                                <TouchableOpacity disabled={this.state.removeAnimation} onPress={() => this.remove(index)} style={{paddingHorizontal:20, paddingVertical:8, borderWidth:2, borderRadius:10, borderColor:this.props.themeColors.earnFollowButtonBorder, backgroundColor:this.props.themeColors.earnFollowButtonBackground}}>
                                    <Text style={{fontFamily:FontFamilies.name, fontSize:16, color:this.props.themeColors.earnFollowButtonTitle}}>
                                        Takip Et
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                </Animatable.View>
                {
                    this.state.removeIndex == index && 
                    <Animatable.View duration={300} animation={this.state.removeAnimation ? "slideInLeft" : undefined} style={{position:'absolute', justifyContent:'center', width:50, height:'100%', left:40}}>
                        <CoinView price={50} plus={true} size={25} width={30} />
                    </Animatable.View>
                }
            </View>
        )
    }

    updateCoinView = (state) => {
        this.setState({coinAnimation:state}, () => setTimeout(() => {this.setState({coinAmount: this.state.coinAmount+50, coinAnimation: !state})}, 10))
    } 

    renderHeader = () => {
        return (
            <View style={{backgroundColor:this.props.themeColors.screenBackground, justifyContent:'center', alignItems:'center', padding:8, marginTop:16}}>           
                <Text style={{fontSize:25, fontFamily:FontFamilies.settingsRowContent, marginBottom:10, color:this.props.themeColors.headerTitle, textAlign:'center'}}>
                  Takip Et<Text style={{fontSize:27,  fontFamily: FontFamilies.settingsRowTitle, textTransform:'capitalize'}}> & Kazan</Text> 
                </Text>
                <Text style={{fontSize:15, paddingHorizontal:10, fontFamily:FontFamilies.historyTitle, color:this.props.themeColors.headerDesc, textAlign:'center'}}>
                    Kullanıcıları takip ederek, takip başına <Text style={{color:this.props.themeColors.coinText, fontSize:17,  fontFamily: FontFamilies.settingsRowTitle, textTransform:'capitalize'}}> 50 Kredi</Text> kazanabilirsin.
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
                                    <Text style={{color:this.props.themeColors.dataCantLoadTitle, fontSize:30}}>Veriler Yüklenemedi</Text>{"\n"}<Text>Tekrar denemek için tıklayın!</Text>
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



export default connect(mapStateToProps, mapDispatchToProps)(EarnFollow);

const styles = StyleSheet.create({
})
