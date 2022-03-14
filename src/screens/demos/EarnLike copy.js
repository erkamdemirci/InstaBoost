import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, LayoutAnimation, Animated, ActivityIndicator, RefreshControl, UIManager } from 'react-native'
import { Colors , FontFamilies, FontSizes } from '../../constants'
import { LikeData } from '../tabs/ActionTab/Screens/data'
import { SvgXml } from "react-native-svg"
import axios from 'axios';
import ImageBlurLoading from 'react-native-image-blur-loading'
import ImageSize from 'react-native-image-size'
import { WaveIndicator } from 'react-native-indicators';
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable';

export class EarnLike extends Component {
    constructor(props) {
        super(props);
        this.page = 1;
        this.postAspectRatio = 1;
        this.state = { 

            loading: false, // user list loading
            isRefreshing: false, //for pull to refresh
            error: '',
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
        this.fetchUser(this.page)
    }

    remove(index) {
        const newArray = [...this.state.data];
        newArray.splice(index, 1);
    
        this.setState(() => {
          return {
            data: newArray
          }
        }, () => {
          
        });
      }

    renderItem = ({ item, index }) => {
        return(
            <TouchableOpacity onPress={() => this.remove(index)} style={{
                flexDirection: 'column',
                padding: 15,
                alignItems: 'center',
              }}>
              
              <View style={{width:'100%', height:300}}>
                <Image
                    source={{ uri: 'https://source.unsplash.com/random'}} 
                        style={{
                        height: '100%',
                        width: '100%',
                        borderRadius:20,
                        overflow:'hidden'
                        }} />
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.5)','rgba(0,0,0,0.3)','rgba(0,0,0,0.2)','rgba(0,0,0,0)']}
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
                <View style={{width:'100%', height:70, padding:10, justifyContent:'center', position:'absolute', top:0}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:'12%', aspectRatio:1}}>
                            <Image source={{uri: item.picture.large}} style={{width:'100%', height:'100%', borderRadius:50, overflow:'hidden', borderWidth:2, borderColor:'white'}} />
                        </View>
                        <View style={{flexGrow:1, flexDirection:'column', paddingLeft:7}}>
                            <View style={{flex:1, justifyContent:'flex-end'}}>
                                <Text style={{fontFamily:FontFamilies.name, fontSize:16, color:Colors.white}}>
                                    {item.name.first}
                                </Text>
                            </View>
                            <Text style={{flex:1, fontFamily:FontFamilies.username, fontSize:14, color:Colors.white}}>
                                {"@"+item.name.last}
                            </Text>
                        </View>
                    </View>
                </View>
              </View>
            </TouchableOpacity>
        )
    }

    renderHeader = () => {
        return (
            <Animatable.View delay={500} animation={"shake"} style={{height:100, paddingVertical:10, paddingHorizontal:20, width:'100%', backgroundColor:Colors.screenBackground}}>
                {
                    this.state.isBackupAccount ? 
                    <TouchableOpacity onPress={() => alert("x")} style={{width:30, height:30, borderWidth:2, borderColor:Colors.screenBackground, borderRadius:15, overflow:'hidden', top:15, zIndex:2, left:15, position:'absolute', backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                        <SvgXml width='15' height='15' fill={Colors.screenBackground} xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 469.333 469.333" style="enable-background:new 0 0 469.333 469.333;" xml:space="preserve"><g>	<g>		<rect x="21.333" y="426.667" width="426.667" height="42.667"/>	</g></g><g>	<g>		<path d="M327.253,0L64,263.253V384h120.747L448,120.747L327.253,0z M167.04,341.333h-60.373V280.96L327.253,60.373l60.373,60.373			L167.04,341.333z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'}></SvgXml>
                    </TouchableOpacity>
                    :
                    null
                }
                <View style={{flex:1, flexDirection:'row', borderRadius:50, overflow:'hidden', backgroundColor:'#25253E', borderWidth:2, borderColor:"#32324E"}}>
                    <View style={{flexGrow:0, width:70, padding:5, justifyContent:'center'}}>
                        <View style={{ borderWidth:2, borderColor:Colors.themeLight, width:'100%', aspectRatio:1, borderRadius:50, overflow:'hidden'}}>
                            <Image source={this.state.isBackupAccount ? this.state.backupAccountData.imageLink : this.state.originalAccountData.imageLink} style={{width:'100%', height:'100%'}} />
                        </View>
                    </View>
                    <View style={{flex:5, flexDirection:'column'}}>
                        <View style={{flex:2, justifyContent:'flex-end', padding:3}}>
                            <View style={{flexDirection:'column'}}>
                                <Text style={{fontFamily:FontFamilies.name, fontSize:FontSizes.name, color:Colors.white}}>{this.state.isBackupAccount ? this.state.backupAccountData.name : this.state.originalAccountData.name}</Text>
                                <View style={{justifyContent:'center', flexGrow:1}}>
                                    <Text style={{fontFamily:FontFamilies.username, fontSize:15, color:Colors.themeMiddle, letterSpacing:0.3}}>{this.state.isBackupAccount ? this.state.backupAccountData.username : this.state.originalAccountData.username}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:1, justifyContent:'flex-start', padding:3}}>
                            <Text style={{fontFamily:FontFamilies.name, fontSize:14, color:Colors.themeSide2Soft}}>{this.state.isBackupAccount ? " YEDEK HESAP KULLANILIYOR" : "ORIJINAL HESAP KULLANILIYOR"}</Text>  
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {this.setState({isBackupAccount: !this.state.isBackupAccount})} } style={{flex:1.5, justifyContent:'center', alignItems:'center'}}>
                        <SvgXml width='25' height='25' fill={Colors.white} xml={'<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m366.996094 512c-11.046875 0-20-8.953125-20-20v-316.007812h-85.992188c-15.777344 0-29.894531-9.433594-35.96875-24.035157-6.097656-14.660156-2.8125-31.398437 8.367188-42.648437l91.09375-91.632813c11.332031-11.398437 26.425781-17.675781 42.5-17.675781 16.074218 0 31.167968 6.277344 42.5 17.675781l91.09375 91.632813c11.183594 11.246094 14.46875 27.988281 8.371094 42.648437-6.074219 14.601563-20.195313 24.035157-35.972657 24.035157h-21.988281c-11.046875 0-20-8.953126-20-20 0-11.046876 8.953125-20 20-20h19.710938l-89.582032-90.113282c-3.769531-3.789062-8.785156-5.878906-14.132812-5.878906-5.34375 0-10.363282 2.089844-14.132813 5.878906l-89.582031 90.113282h83.714844c22.058594 0 40 17.945312 40 40v316.007812c0 11.042969-8.953125 20-20 20zm0 0"/><path d="m144.988281 512c-16.074219 0-31.167969-6.277344-42.5-17.675781l-91.09375-91.632813c-11.183593-11.25-14.46875-27.988281-8.367187-42.648437 6.070312-14.601563 20.191406-24.039063 35.96875-24.039063h85.992187v-316.003906c0-11.046875 8.953125-20 20-20s20 8.953125 20 20v316.007812c0 22.054688-17.945312 40-40 40h-83.714843l89.582031 90.113282c3.769531 3.789062 8.789062 5.878906 14.132812 5.878906s10.363281-2.089844 14.132813-5.878906l89.582031-90.113282h-19.710937c-11.046876 0-20-8.953124-20-20 0-11.046874 8.953124-20 20-20h21.988281c15.777343 0 29.894531 9.433594 35.96875 24.035157 6.097656 14.660156 2.816406 31.402343-8.367188 42.648437l-91.09375 91.632813c-11.332031 11.398437-26.425781 17.675781-42.5 17.675781zm0 0"/></svg>'}></SvgXml>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
            
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
                backgroundColor:Colors.screenBackground
              }}><WaveIndicator color={'#fff'} size={48} /></View>
        );
    };

    handleLoadMore = () => {
        if (!this.state.loading) {
            this.page = this.page + 1; // increase page by 1
            this.fetchUser(this.page); // method for API call 
        }
    };




    fetchUser(page) {
        //stackexchange User API url
            const url = 'https://randomuser.me/api/?page='+{page}+'&results=3';
            this.setState({ loading: true })
            axios.get(url)
            .then(res => {
                let listData = this.state.data;
                let data = listData.concat(res.data.results) //concate list with response
                this.setState({ loading: false, data: data })
            })
            .catch(error => {
                this.setState({ loading: false, error: 'Something just went wrong' })
            });
        }

    onRefresh() {
        this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
        const url = 'https://randomuser.me/api/?page=1&results=2';
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
        if (this.state.loading && this.page === 1) {
            return <View style={{
              width: '100%',
              height: '100%', 
              justifyContent:'center',
              alignItems:'center',
              backgroundColor:Colors.screenBackground
            }}><WaveIndicator color={'#fff'} size={100} /></View>;
          }
        return (
            <View style={styles.container}>
                <FlatList
                    ref={(ref) => { this._flatList = ref; }}
                    scrollToOverflowEnabled={true}
                    ListHeaderComponent = { this.renderHeader }
                    contentContainerStyle={{
                        paddingBottom: 75,
                        backgroundColor:Colors.screenBackground
                    }}
                    showsHorizontalScrollIndicator={false} 
                    showsVerticalScrollIndicator={false}
                    data = { this.state.data ? this.state.data : null }
                    refreshControl={
                        <RefreshControl
                            tintColor={'white'}
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
            </View>
        )
    }
}

export default EarnLike

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:Colors.screenBackground
    }
})
