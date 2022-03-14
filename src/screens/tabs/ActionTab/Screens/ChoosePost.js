import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl, Dimensions } from 'react-native'
import { FontFamilies, FontSizes } from '../../../../constants'
import { SvgXml } from "react-native-svg"
import axios from 'axios';
import { WaveIndicator } from 'react-native-indicators';
import * as Animatable from 'react-native-animatable';

import CoinView from '../../../../components/CoinView'
import Modal from 'react-native-modal';

import { connect } from 'react-redux';
import { changeCurrentAccount } from '../../../../redux/actions/account';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export class ChoosePost extends Component {
    constructor(props) {
        super(props);
        this.page = 1;
        this.postAspectRatio = 1;
        this.state = { 
            
            loading: false, // user list loading
            isRefreshing: false, //for pull to refresh
            error: null,
            data : [],

            backupAccountData : {
                name: "Ali Veli",
                username:  "@aliveli16",
                imageLink: require('../../../../../assets/ProfileImage1.jpg')
            },
            originalAccountData : {
                name: "Erkam D.",
                username:  "@erkamdemirci",
                imageLink: require('../../../../../assets/ProfileImage2.jpg')
            },
            isBackupAccount : false
        };
    }

    componentDidMount() {
        this.fetchUsers(this.page)
    }

    renderItem = ({ item, index }) => {
        return(
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate(this.props.route.params.secondScreen, {
                imageLink : item.picture.large }) }
                key = {index.toString()}
                style = {styles.postItem}
                >
                <View style={{position:"absolute", left:0, top:0, right:0, bottom:0, zIndex:2, alignItems:"flex-end", padding:5}}>       
                {
                    index % 5 == 0 
                    ? 
                    <View style={{position:'absolute', flex:1, zIndex:2, left:5, bottom:5, justifyContent:'flex-start', alignItems:'flex-end',
                    shadowColor: this.props.themeColors.rowShadow,
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: 0.92,
                    shadowRadius: 2.84,
                    elevation: 2}}>
                        <SvgXml width='25' height='25' style={{}} fill={this.props.themeColors.white} xml={'<svg height="472pt" viewBox="0 -87 472 472" width="472pt" xmlns="http://www.w3.org/2000/svg"><path d="m467.101562 26.527344c-3.039062-1.800782-6.796874-1.871094-9.898437-.179688l-108.296875 59.132813v-35.480469c-.03125-27.601562-22.398438-49.96875-50-50h-248.90625c-27.601562.03125-49.96875 22.398438-50 50v197.421875c.03125 27.601563 22.398438 49.96875 50 50h248.90625c27.601562-.03125 49.96875-22.398437 50-50v-34.835937l108.300781 59.132812c3.097657 1.691406 6.859375 1.625 9.894531-.175781 3.039063-1.804688 4.898438-5.074219 4.898438-8.601563v-227.816406c0-3.53125-1.863281-6.796875-4.898438-8.597656zm-138.203124 220.898437c-.015626 16.5625-13.4375 29.980469-30 30h-248.898438c-16.5625-.019531-29.980469-13.4375-30-30v-197.425781c.019531-16.558594 13.4375-29.980469 30-30h248.90625c16.558594.019531 29.980469 13.441406 30 30zm123.101562-1.335937-103.09375-56.289063v-81.535156l103.09375-56.285156zm0 0"/></svg>'}></SvgXml>
                    </View>
                    : null 
                }
                </View>
                <Image
                style = {{flex: 1}}
                source={{
                    //uri: item.item.src,
                    uri: item.picture.large
                }}
                />
            </TouchableOpacity>
        )
    } 

    renderHeader = () => {
        return (
            <View style={{backgroundColor:this.props.themeColors.screenBackground, justifyContent:'center', alignItems:'center', padding:8, marginVertical:12}}>           
                <Text style={{fontSize:25, fontFamily:FontFamilies.settingsRowContent, marginBottom:10, color:this.props.themeColors.headerTitle, textAlign:'center'}}>
                  Gönderi<Text style={{fontSize:27,  fontFamily: FontFamilies.settingsRowTitle, textTransform:'capitalize'}}> Seç</Text> 
                </Text>
                <Text style={{fontSize:15, paddingHorizontal:10, fontFamily:FontFamilies.historyTitle, color:this.props.themeColors.headerDesc, textAlign:'center'}}>
                    {this.props.route.params.type} almak istediğiniz gönderiyi seçiniz.
                </Text>
            </View>
            
        );
    };
    

    renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
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
            this.page = this.page + 1; // increase page by 1
            this.fetchUsers(this.page); // method for API call 
        }
    };

    fetchUsers(page) {
        //stackexchange User API url
            const url = 'https://randomuser.me/api/?page='+{page}+'&results=30';
            this.setState({ loading: true })
            axios.get(url)
            .then(res => {
                let listData = this.state.data;
                let data = listData.concat(res.data.results) //concate list with response
                this.setState({ loading: false, data: data, error: null })
            })
            .catch(error => {
                this.setState({ loading: false, error: 'Something just went wrong' })
            });
        }

    onRefresh() {
        this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
        const url = 'https://randomuser.me/api/?page=1&results=30';
        axios.get(url)
            .then(res => {
            let data = res.data.results
            this.setState({ isRefreshing: false, data: data }) // false isRefreshing flag for disable pull to refresh indicator, and clear all data and store only first page data
            })
            .catch(error => {
            this.setState({ isRefreshing: false, error: 'Something just went wrong' }) // false isRefreshing flag for disable pull to refresh
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
                        }}><WaveIndicator color={'#fff'} size={60} /></View>
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
                                <SvgXml width='70' height='70' xml={'<svg id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><g><g><g><path d="m378.588 133.412-.593.593c-13.486 13.486-15.666 34.403-5.667 50.644 12.789 20.774 20.171 45.217 20.171 71.351 0 75.266-61.233 136.499-136.499 136.499v82.414c120.903 0 218.913-98.011 218.913-218.913 0-42.269-11.98-81.74-32.729-115.203-13.876-22.379-44.976-26.005-63.596-7.385z" fill="#92dd7a"/></g></g></g><g><g><g><path d="m410.795 410.795c-16.092 16.092-42.183 16.092-58.276 0-16.092-16.093-16.092-42.183 0-58.276l-.031-.059c-24.718 24.725-58.848 40.039-96.488 40.039v82.414c60.451 0 115.18-24.502 154.795-64.118z" fill="#7ec66a"/></g></g></g><g><g><g><path d="m134.005 377.995c13.486-13.486 15.666-34.403 5.667-50.644-12.789-20.774-20.171-45.217-20.171-71.351 0-75.266 61.233-136.499 136.499-136.499v-82.414c-120.903 0-218.913 98.01-218.913 218.913 0 42.269 11.98 81.74 32.729 115.203 13.877 22.38 44.977 26.005 63.597 7.385z" fill="#92dd7a"/></g></g></g><g><g><g><path d="m101.205 101.205c16.092-16.092 42.183-16.092 58.276 0 16.092 16.093 16.092 42.183 0 58.276l.054.037c24.716-24.711 58.837-40.016 96.466-40.016v-82.415c-60.452 0-115.181 24.502-154.796 64.118z" fill="#7ec66a"/></g></g></g><g><g><g><path d="m256.769 4.235 78.783 58.205c11.147 8.236 11.147 24.907 0 33.143l-78.783 58.205c-13.601 10.048-32.847.338-32.847-16.572v-116.409c.001-16.91 19.246-26.62 32.847-16.572z" fill="#b1ef97"/></g></g></g><g><g><g><path d="m335.552 62.274-78.783-58.205c-13.601-10.048-32.847-.338-32.847 16.572v102.669c.001-59.932 72.558-89.902 111.63-61.036z" fill="#92dd7a"/></g></g></g><g><g><g><path d="m255.231 507.765-78.783-58.205c-11.147-8.236-11.147-24.907 0-33.143l78.783-58.205c13.601-10.048 32.847-.338 32.847 16.572v116.409c-.001 16.91-19.246 26.62-32.847 16.572z" fill="#b1ef97"/></g></g></g><g><g><g><path d="m176.448 449.726 78.783 58.205c13.601 10.048 32.847.338 32.847-16.572v-102.669c-.001 59.931-72.558 89.902-111.63 61.036z" fill="#92dd7a"/></g></g></g></g></svg>'}></SvgXml>
                                <Text style={{color:this.props.themeColors.dataCantLoadDesc, fontSize:26, lineHeight:30, textAlign:'center', padding:20, fontFamily:FontFamilies.balooRegular}}>
                                    <Text style={{color:this.props.themeColors.dataCantLoadTitle, fontSize:30}}>Gönderilerin Yüklenemedi</Text>{"\n"}<Text>Tekrar denemek için tıkla!</Text>
                                </Text>
                            </TouchableOpacity>
                        </Animatable.View>
                }
                {   this.state.data.length >= 1 &&
                    <FlatList
                        ref={(ref) => { this._flatList = ref; }}
                        scrollToOverflowEnabled={true}
                        ListHeaderComponent = { this.renderHeader }
                        numColumns={3}
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
                        <SvgXml width='13' height='13' fill={this.props.themeColors.navbarTintTheme} xml={'<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m366.996094 512c-11.046875 0-20-8.953125-20-20v-316.007812h-85.992188c-15.777344 0-29.894531-9.433594-35.96875-24.035157-6.097656-14.660156-2.8125-31.398437 8.367188-42.648437l91.09375-91.632813c11.332031-11.398437 26.425781-17.675781 42.5-17.675781 16.074218 0 31.167968 6.277344 42.5 17.675781l91.09375 91.632813c11.183594 11.246094 14.46875 27.988281 8.371094 42.648437-6.074219 14.601563-20.195313 24.035157-35.972657 24.035157h-21.988281c-11.046875 0-20-8.953126-20-20 0-11.046876 8.953125-20 20-20h19.710938l-89.582032-90.113282c-3.769531-3.789062-8.785156-5.878906-14.132812-5.878906-5.34375 0-10.363282 2.089844-14.132813 5.878906l-89.582031 90.113282h83.714844c22.058594 0 40 17.945312 40 40v316.007812c0 11.042969-8.953125 20-20 20zm0 0"/><path d="m144.988281 512c-16.074219 0-31.167969-6.277344-42.5-17.675781l-91.09375-91.632813c-11.183593-11.25-14.46875-27.988281-8.367187-42.648437 6.070312-14.601563 20.191406-24.039063 35.96875-24.039063h85.992187v-316.003906c0-11.046875 8.953125-20 20-20s20 8.953125 20 20v316.007812c0 22.054688-17.945312 40-40 40h-83.714843l89.582031 90.113282c3.769531 3.789062 8.789062 5.878906 14.132812 5.878906s10.363281-2.089844 14.132813-5.878906l89.582031-90.113282h-19.710937c-11.046876 0-20-8.953124-20-20 0-11.046874 8.953124-20 20-20h21.988281c15.777343 0 29.894531 9.433594 35.96875 24.035157 6.097656 14.660156 2.816406 31.402343-8.367188 42.648437l-91.09375 91.632813c-11.332031 11.398437-26.425781 17.675781-42.5 17.675781zm0 0"/></svg>'}></SvgXml>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <Animatable.View animation={this.state.coinAnimation ? "flipOutX" : "flipInX"} duration={100} style={{marginRight:20, flexDirection:'row'}}>
                    <CoinView size={21} wid th={26} iconSide={'right'} price={this.state.coinAmount}/>
                </Animatable.View>
            ),
        });

        if(prevProps.currentAccount != this.props.currentAccount){ 
            this.onRefresh()
        }
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
        changeCurrentAccount: (currentAccount) => dispatch(changeCurrentAccount(currentAccount))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChoosePost);

const styles = StyleSheet.create({
    postItem: {
      width: (Dimensions.get('screen').width-20) / 3,
      aspectRatio:1,
      margin:2,
      borderRadius:5,
      overflow:'hidden'
    },
})
