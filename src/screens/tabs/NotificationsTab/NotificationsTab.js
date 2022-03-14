import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Dimensions } from 'react-native'
import { SVGs, FontFamilies, FontSizes } from '../../../constants'
import { SvgXml } from "react-native-svg"
import axios from 'axios';
import { WaveIndicator } from 'react-native-indicators';
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable';

import NotificationFollowRow from './RowTypes/NotificationFollowRow';
import NotificationAdReward from './RowTypes/NotificationAdReward';
import NotificationCollectionRow from './RowTypes/NotificationCollectionRow';
import NotificationLikeRow from './RowTypes/NotificationLikeRow';
import NotificationCommentRow from './RowTypes/NotificationCommentRow';

import { connect } from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

class NotificationsTab extends Component {
    constructor(props) {
        super(props);
        this.page = 1;
        this.postAspectRatio = 1;
        this.state = { 

            typeArr: ["AdReward","Follow","Follow","Like","Collection","Comment","AdReward","Follow","Like","Collection","Comment","AdReward","Follow","Like","Collection","Comment","AdReward","Follow","Like","Collection","Comment","AdReward"],
            unreadAnimation: false,

            loading: false,
            isRefreshing: false,
            error: null,
            data: [],

        };
    }

    componentDidMount() {
        this.fetchUsers(this.page)
    }

    renderItem = ({ item, index }) => {
        const type = this.state.typeArr[index%5];
        switch(type) {
            case 'Like':
              return (
                <TouchableOpacity>
                    <NotificationLikeRow count={item.dob.age} unread={index < 5 ? this.state.unreadAnimation : false} item={item}/>
                </TouchableOpacity>
              )
              break;
            case 'Comment':
                return (
                    <TouchableOpacity>
                        <NotificationCommentRow count={item.dob.age} unread={index < 5 ? this.state.unreadAnimation : false} item={item}/>
                    </TouchableOpacity>
                )
              break;
            case 'Collection':
                return (
                    <TouchableOpacity>
                        <NotificationCollectionRow count={item.dob.age} unread={index < 5 ? this.state.unreadAnimation : false} item={item}/>
                    </TouchableOpacity>
                )
              break;
            case 'Follow':
                return (
                    <TouchableOpacity>
                        <NotificationFollowRow count={item.dob.age} unread={index < 5 ? this.state.unreadAnimation : false} item={item}/>
                    </TouchableOpacity>
                )
              break;
            case 'AdReward':
                return (
                    <TouchableOpacity>
                        <NotificationAdReward count={item.dob.age} unread={index < 5 ? this.state.unreadAnimation : false} item={item}/>
                    </TouchableOpacity>
                )
                break;
            default:
              return null
              break;
          }
    }

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
            const url = 'https://randomuser.me/api/?page='+{page}+'&results=40';
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
        const url = 'https://randomuser.me/api/?page=1&results=40';
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
                            height: windowHeight-200,
                            position:'absolute', 
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:this.props.themeColors.screenBackground
                        }}><WaveIndicator color={this.props.themeColors.loadingControl} size={60} /></View>
                }
                {   this.state.error && !this.state.loading &&
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
                        onEndReachedThreshold={0.2}
                        onEndReached={this.handleLoadMore.bind(this)}
                        onContentSizeChange={() => {        
                            this.setState({unreadAnimation:true})
                        }}
                    /> 
                }    
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      themeColors: state.colorReducer.themeColors
    }
  }
  
export default connect(mapStateToProps)(NotificationsTab);