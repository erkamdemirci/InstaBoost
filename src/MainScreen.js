import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Platform, Text, Image } from 'react-native';
import { SVGs , FontFamilies, FontSizes } from './constants'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Button } from 'native-base'; 

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import { SvgXml } from "react-native-svg"

import ExploreOffersTab from './screens/tabs/ExploreOffersTab';
import { HistoryScreen } from './screens/tabs/HistoryTab';
import ProfileTab from './screens/tabs/ProfileTab/ProfileTab';
import NotificationsTab from './screens/tabs/NotificationsTab/NotificationsTab';
import ActionTab from './screens/tabs/ActionTab/ActionTab';

import SettingsScreen from './screens/tabs/ProfileTab/SettingsScreen';
import BackupAccount from './screens/tabs/ProfileTab/BackupAccount';

import GetLikeScreen from './screens/tabs/ActionTab/Screens/GetLikeScreen'
import GetCommentScreen from './screens/tabs/ActionTab/Screens/GetCommentScreen'
import GetCollectionScreen from './screens/tabs/ActionTab/Screens/GetCollectionScreen';
import GetFollowerScreen from './screens/tabs/ActionTab/Screens/GetFollowerScreen';
import ChoosePost from './screens/tabs/ActionTab/Screens/ChoosePost';
import EarnLike from './screens/tabs/ActionTab/Screens/EarnLike'
import EarnFollow from './screens/tabs/ActionTab/Screens/EarnFollow'
import EarnComment from './screens/tabs/ActionTab/Screens/EarnComment'
import EarnCollection from './screens/tabs/ActionTab/Screens/EarnCollection'

import CircleGradient from './components/CircleGradient'
import CoinView from './components/CoinView'

import { connect } from 'react-redux';
import { updateColorTheme } from './redux/actions/color';
import { setOriginalAccount } from './redux/actions/account';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEqual } from 'lodash';

const Stack = createStackNavigator();
const MainBottomTab = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();

const LogoTitle = (align) => (
  <View style={{top:Platform.OS === 'ios' ? 0 : getStatusBarHeight()-25, alignItems:'center', width:'100%', height:40}}>
    <SvgXml  width='38' height='38' xml={'<svg id="Layer_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m450.725 190.92c-.14-4.9-.33-9.59-.59-15.39-.91-20.73-4.26-34.98-9.06-47.33-4.96-13.11-12.58-24.84-22.56-34.6-9.75-9.91-21.56-17.61-34.52-22.48-5.55-2.14-11.45-4-18.13-5.48-8.26-1.83-17.72-3.09-29.19-3.59-20.88-.99-27.51-1.22-80.46-1.22-52.96 0-59.59.23-80.39 1.14-20.73.92-34.98 4.27-47.32 9.07-13.11 4.95-24.84 12.58-34.6 22.56-9.9 9.76-17.6 21.57-22.48 34.53-4.8 12.42-8.15 26.6-9.06 47.33-.27 5.82-.49 10.54-.66 15.46-.44 12.72-.56 26.82-.56 65.02 0 38.21.12 52.31.53 65.01.16 4.9.36 9.6.61 15.4.91 20.73 4.27 34.98 9.07 47.33 4.95 13.11 12.65 24.85 22.55 34.6 9.76 9.91 21.57 17.61 34.52 22.49 12.42 4.8 26.59 8.15 47.32 9.07 20.8.91 27.43 1.14 80.39 1.14s59.59-.23 80.39-1.14c11.33-.5 20.72-1.73 28.93-3.53 6.8-1.48 12.79-3.36 18.39-5.54 26.21-10.14 46.94-30.87 57.07-57.09 4.8-12.42 8.16-26.6 9.07-47.33.25-5.8.45-10.5.61-15.4.41-12.7.53-26.8.53-65.01 0-38.22-.04-52.32-.4-65.02z" fill="#ff6b81"/><path d="m451.125 255.94c0 38.21-.12 52.31-.53 65.01-.16 4.9-.36 9.6-.61 15.4-.91 20.73-4.27 34.91-9.07 47.33-10.13 26.22-30.86 46.95-57.07 57.09-5.6 2.18-11.59 4.06-18.39 5.54 25.22-11.06 45.08-31.76 55.06-57.58 4.99-12.91 8.48-27.65 9.43-49.2.95-21.63 1.18-28.52 1.18-83.59 0-55.06-.08-61.95-1.03-83.58-.95-21.55-4.43-36.37-9.42-49.21-5.15-13.62-13.07-25.82-23.45-35.97-8.99-9.13-19.67-16.46-31.36-21.54 6.68 1.48 12.58 3.34 18.13 5.48 12.96 4.87 24.77 12.57 34.52 22.48 9.98 9.76 17.6 21.49 22.56 34.6 4.8 12.35 8.15 26.6 9.06 47.33.26 5.8.45 10.49.59 15.39.36 12.7.4 26.8.4 65.02z" fill="#ed2061"/><path d="m450.725 190.92h-389.02c.17-4.92.39-9.64.66-15.46.91-20.73 4.26-34.91 9.06-47.33 4.88-12.96 12.58-24.77 22.48-34.53 9.76-9.98 21.49-17.61 34.6-22.56 12.34-4.8 26.59-8.15 47.32-9.07 20.8-.91 27.43-1.14 80.39-1.14 52.95 0 59.58.23 80.46 1.22 11.47.5 20.93 1.76 29.19 3.59 6.68 1.48 12.58 3.34 18.13 5.48 12.96 4.87 24.77 12.57 34.52 22.48 9.98 9.76 17.6 21.49 22.56 34.6 4.8 12.35 8.15 26.6 9.06 47.33.26 5.8.45 10.49.59 15.39z" fill="#9090fb"/><path d="m450.595 320.95c-.16 4.9-.36 9.6-.61 15.4-.91 20.73-4.27 34.91-9.07 47.33-10.13 26.22-30.86 46.95-57.07 57.09-5.6 2.18-11.59 4.06-18.39 5.54-8.21 1.8-17.6 3.03-28.93 3.53-20.8.91-27.43 1.14-80.39 1.14s-59.59-.23-80.39-1.14c-20.73-.92-34.9-4.27-47.32-9.07-12.95-4.88-24.76-12.58-34.52-22.49-9.9-9.75-17.6-21.49-22.55-34.6-4.8-12.35-8.16-26.6-9.07-47.33-.25-5.8-.45-10.5-.61-15.4z" fill="#fbdf63"/><path d="m430.655 320.95h19.94c-.16 4.9-.36 9.6-.61 15.4-.91 20.73-4.27 34.91-9.07 47.33-10.13 26.22-30.86 46.95-57.07 57.09-5.6 2.18-11.59 4.06-18.39 5.54 25.22-11.06 45.08-31.76 55.06-57.58 4.99-12.91 8.48-27.65 9.43-49.2.31-7.03.54-12.5.71-18.58z" fill="#ffa402"/><path d="m397.225 87.18c-8.99-9.13-19.67-16.46-31.36-21.54 6.68 1.48 12.58 3.34 18.13 5.48 12.96 4.87 24.77 12.57 34.52 22.48 9.98 9.76 17.6 21.49 22.56 34.6 4.8 12.35 8.15 26.6 9.06 47.33.26 5.8.45 10.49.59 15.39h-19.95c-.15-6.07-.37-11.53-.68-18.56-.95-21.55-4.43-36.37-9.42-49.21-5.15-13.62-13.07-25.82-23.45-35.97z" fill="#6c5fea"/><g><path d="m191.941 24.947v105.59c0 9.64-7.81 17.44-17.44 17.44h-30.502l-18.28 26.35-18.28-26.35h-82.497c-9.64 0-17.44-7.8-17.44-17.44v-105.59c0-9.63 7.8-17.44 17.44-17.44h149.559c9.63 0 17.44 7.81 17.44 17.44z" fill="#4dd4f7"/><path d="m191.941 24.947v105.59c0 9.64-7.81 17.44-17.44 17.44h-20c9.63 0 17.44-7.8 17.44-17.44v-105.59c0-9.63-7.81-17.44-17.44-17.44h20c9.63 0 17.44 7.81 17.44 17.44z" fill="#00c2f3"/><path d="m128.463 53.572c-6.797-6.798-17.826-6.789-24.634.018l-4.109 4.109-4.109-4.109c-6.808-6.808-17.837-6.816-24.634-.018-6.797 6.797-6.789 17.826.018 24.634l28.724 28.724 28.724-28.724c6.81-6.808 6.818-17.837.02-24.634z" fill="#fff"/></g><g><path d="m504.5 415.42v73.65c0 8.52-6.9 15.43-15.41 15.43h-146.039c-8.52 0-15.42-6.91-15.42-15.43v-120.69l41.59 31.62h119.869c8.51 0 15.41 6.9 15.41 15.42z" fill="#d9f0f4"/><path d="m504.5 415.42v73.65c0 8.52-6.9 15.43-15.41 15.43h-20c8.51 0 15.41-6.91 15.41-15.43v-73.65c0-8.52-6.9-15.42-15.41-15.42h20c8.51 0 15.41 6.9 15.41 15.42z" fill="#bae1e5"/></g><ellipse cx="255.973" cy="255.904" fill="#fff" rx="97.351" ry="97.392"/><ellipse cx="372.798" cy="144.558" fill="#fff" rx="19.999" ry="20.008"/><path d="m255.973 323.284c-37.137 0-67.351-30.227-67.351-67.38s30.214-67.38 67.351-67.38 67.351 30.227 67.351 67.38-30.214 67.38-67.351 67.38z" fill="#56788b"/></g><g><path d="m226.465 68.37h.028c7.974-.029 17.64-.041 29.719-.041 52.586 0 59.462.231 80.137 1.213 17.78.784 31.642 3.427 45.005 8.595 11.862 4.465 22.864 11.632 31.816 20.727.034.034.068.068.103.102 9.188 8.979 16.181 19.708 20.809 31.955 5.135 13.208 7.775 27.07 8.563 44.945.178 4.025 3.497 7.169 7.487 7.169.111 0 .224-.002.336-.007 4.139-.183 7.345-3.685 7.163-7.823-.864-19.583-3.815-34.917-9.544-49.652-5.372-14.218-13.54-26.755-24.277-37.263-10.459-10.609-23.311-18.973-37.108-24.167-14.887-5.757-30.213-8.708-49.667-9.565-20.937-.994-27.894-1.229-80.822-1.229-12.101 0-21.786.012-29.773.041-4.143.015-7.488 3.385-7.473 7.527.014 4.133 3.369 7.473 7.498 7.473z"/><path d="m438.134 367.868c-1.031 4.012 1.386 8.1 5.397 9.131.626.161 1.254.238 1.871.238 3.342 0 6.39-2.25 7.259-5.635 2.662-10.359 4.238-21.781 4.818-34.921.93-21.198 1.149-28.202 1.149-80.737 0-23.194-.016-36.843-.1-47.071-.034-4.142-3.435-7.51-7.562-7.438-4.143.034-7.473 3.419-7.438 7.562.084 10.176.1 23.794.1 46.947 0 52.219-.217 59.148-1.136 80.078-.532 12.087-1.958 22.504-4.358 31.846z"/><path d="m295.644 443.389h-.053c-9.097.063-21.265.091-39.454.091-52.295 0-59.208-.217-80.06-1.136-17.78-.784-31.643-3.428-45.008-8.595-11.863-4.466-22.865-11.633-31.816-20.727l-.082-.082c-9.24-9.101-16.239-19.836-20.826-31.975-5.137-13.214-7.779-27.076-8.566-44.943-.919-20.932-1.136-27.861-1.136-80.08 0-46.459.186-57.268.873-72.79.183-4.138-3.023-7.641-7.162-7.824-4.094-.186-7.64 3.023-7.823 7.161-.698 15.783-.888 26.704-.888 73.453 0 52.536.22 59.54 1.149 80.739.863 19.577 3.815 34.911 9.547 49.652 5.326 14.097 13.49 26.63 24.267 37.254 10.459 10.612 23.313 18.979 37.116 24.175 14.89 5.756 30.216 8.707 49.695 9.565 21.118.931 28.106 1.151 80.72 1.151 18.226 0 30.425-.028 39.558-.091 4.142-.029 7.477-3.41 7.448-7.552-.029-4.123-3.381-7.446-7.499-7.446z"/><path d="m169.192 211.086c-3.812-1.61-8.214.172-9.828 3.988-5.469 12.938-8.242 26.674-8.242 40.83 0 57.837 47.036 104.892 104.851 104.892s104.851-47.054 104.851-104.892-47.036-104.892-104.851-104.892c-30.084 0-58.758 12.956-78.669 35.546-2.739 3.107-2.44 7.847.667 10.585s7.848 2.44 10.585-.667c17.065-19.361 41.638-30.465 67.417-30.465 49.544 0 89.851 40.325 89.851 89.892s-40.307 89.892-89.851 89.892-89.851-40.325-89.851-89.892c0-12.138 2.375-23.91 7.059-34.989 1.612-3.814-.173-8.215-3.989-9.828z"/><path d="m255.973 330.784c41.273 0 74.852-33.591 74.852-74.88s-33.578-74.88-74.852-74.88c-41.272 0-74.851 33.591-74.851 74.88s33.578 74.88 74.851 74.88zm0-134.76c33.002 0 59.852 26.862 59.852 59.88s-26.85 59.88-59.852 59.88-59.851-26.862-59.851-59.88 26.849-59.88 59.851-59.88z"/><path d="m400.298 144.558c0-15.168-12.336-27.508-27.499-27.508s-27.5 12.34-27.5 27.508 12.337 27.508 27.5 27.508 27.499-12.34 27.499-27.508zm-39.999 0c0-6.897 5.607-12.508 12.5-12.508 6.892 0 12.499 5.611 12.499 12.508s-5.607 12.508-12.499 12.508c-6.893-.001-12.5-5.611-12.5-12.508z"/><path d="m489.082 392.485h-117.335l-39.573-30.098c-2.268-1.726-5.32-2.015-7.871-.75-2.554 1.266-4.169 3.869-4.169 6.719v120.708c0 12.646 10.28 22.935 22.917 22.935h16.233c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-16.233c-4.365 0-7.917-3.56-7.917-7.935v-105.58l29.545 22.471c1.305.993 2.9 1.53 4.54 1.53h119.863c4.366 0 7.918 3.56 7.918 7.935v73.646c0 4.375-3.552 7.935-7.918 7.935h-95.304c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h95.304c12.637-.001 22.918-10.29 22.918-22.936v-73.645c0-12.646-10.281-22.935-22.918-22.935z"/><path d="m368.444 477.057h99.94c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-99.94c-4.143 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5z"/><path d="m368.444 443.044h89.948c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-89.948c-4.143 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5z"/><path d="m119.557 178.657c1.401 2.021 3.704 3.226 6.163 3.226s4.762-1.205 6.163-3.226l16.042-23.129h26.577c13.751 0 24.938-11.191 24.938-24.946v-105.635c0-13.756-11.187-24.947-24.938-24.947h-95.106c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h95.105c5.48 0 9.938 4.462 9.938 9.947v105.635c0 5.484-4.458 9.946-9.938 9.946h-30.503c-2.459 0-4.762 1.205-6.163 3.226l-12.116 17.469-12.117-17.469c-1.401-2.021-3.704-3.226-6.163-3.226h-82.5c-5.48 0-9.939-4.462-9.939-9.946v-105.635c0-5.485 4.459-9.947 9.939-9.947h19.913c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.499-7.5h-19.914c-13.751 0-24.939 11.191-24.939 24.947v105.635c0 13.755 11.188 24.946 24.939 24.946h78.574z"/><path d="m94.416 112.264c1.407 1.407 3.315 2.198 5.305 2.198s3.897-.791 5.305-2.198l28.723-28.736c9.72-9.723 9.728-25.535.018-35.248-4.7-4.703-10.951-7.292-17.603-7.292h-.02c-6.104.004-11.876 2.19-16.423 6.188-4.547-3.998-10.317-6.184-16.424-6.188h-.019c-6.651 0-12.902 2.589-17.604 7.292-9.708 9.713-9.7 25.525.019 35.248zm-18.133-53.379c1.867-1.869 4.352-2.897 6.995-2.897h.008c2.65.002 5.145 1.037 7.021 2.915l4.108 4.11c1.407 1.407 3.314 2.198 5.305 2.198s3.897-.791 5.305-2.198l4.108-4.11c1.877-1.878 4.37-2.913 7.021-2.915h.007c2.644 0 5.128 1.028 6.995 2.896 0 0 0 0 .001.001 3.863 3.865 3.855 10.162-.02 14.038l-23.416 23.43-23.419-23.429c-3.874-3.875-3.883-10.174-.019-14.039z"/></g></svg>' }></SvgXml>
  </View>
);

class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: null,
    };
  }

  componentDidUpdate(prevProps) {
      if(!isEqual(this.props.themeColors.screenBackground, prevProps.themeColors.screenBackground)) {
        this.setState({
          theme: {
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: this.props.themeColors.screenBackground
            }
          }
        })
      }
  }

  _readFromLocalStorage = async () => {
    const isDark = await AsyncStorage.getItem('isDark')
    if(isDark == 'true') {
      this.props.updateColorTheme(true)
    }else if(isDark == 'false') {
      this.props.updateColorTheme(false)
    }
  }

  componentDidMount(){
    this.props.setOriginalAccount(this.props.jsonData.originalAccount)
    this._readFromLocalStorage()
  }

  render() {

    createHistoryTopTabs = () => {
      return (
        <MaterialTopTabs.Navigator 
            swipeEnabled={false}
            tabBarOptions={{
            activeTintColor: this.props.themeColors.historyTopTabActiveTint,
            inactiveTintColor: this.props.themeColors.historyTopTabPassiveTint,
            showIcon:true,
            showLabel:false,
            scrollEnabled:false,
            indicatorStyle: {backgroundColor: this.props.themeColors.historyTopTabActiveBackground, width:'7.5%', marginHorizontal:'5%', height:'85%', bottom:'7%', zIndex: -1, borderRadius:50},
            labelStyle: { fontSize: 22, fontFamily:'Baloo-Regular', textTransform:'capitalize' },
            tabStyle: { height: 40, padding:0, margin:0},
            style: { height:50,shadowOpacity:0, elevation:0, backgroundColor:this.props.themeColors.screenBackground},
          }}>
          <MaterialTopTabs.Screen initialParams={{ type: "Be??eni" }}  name="Like" component={HistoryScreen} options={{ title: 'i', tabBarIcon: ({ color }) => (
                <View>
                  <SvgXml width='27' height='27' fill={color} xml={SVGs.likeUncolored}></SvgXml>
                </View>
              )}}/>
          <MaterialTopTabs.Screen initialParams={{ type: "Takip" }} name="Follow" component={HistoryScreen} options={{ title: 'Follow', tabBarIcon: ({ color }) => (
            <View>
              <SvgXml width='27' height='27' fill={color} xml={SVGs.followUncolored}></SvgXml>
            </View>
          )}}/>
          <MaterialTopTabs.Screen initialParams={{ type: "Koleksiyon" }} name="Collection" component={HistoryScreen} options={{ title: 'Collection', tabBarIcon: ({ color }) => (
                <View>
                  <SvgXml width='27' height='27' fill={color} xml={SVGs.collectionUncolored}></SvgXml>
                </View>
              )}}/>
          <MaterialTopTabs.Screen initialParams={{ type: "Yorum" }} name="Comment" component={HistoryScreen} options={{ title: 'Comment', tabBarIcon: ({ color }) => (
                <View>
                  <SvgXml width='27' height='27' fill={color} xml={SVGs.commentUncolored}></SvgXml>
                </View>
              )}}/>
        </MaterialTopTabs.Navigator>
      )
    }

    createNotificationsStack = () =>
      <Stack.Navigator
        screenOptions={{
            headerTintColor: this.props.themeColors.navbarTintTheme,
          }}>
        <Stack.Screen name="NotificationsTab" component={NotificationsTab}
          options={({ navigation, route }) => ({
                    headerTintColor: this.props.themeColors.navbarTintTheme,
                    headerTitle: () => <Text style={{color:this.props.themeColors.navbarTintTheme, fontFamily:FontFamilies.navTitle, fontSize:FontSizes.navTitle}}>Bildirimler</Text>,
                    headerStyle: {elevation:0, shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground}, 
                  })}
        />
      </Stack.Navigator>

    createHistoryStack = () =>
      <Stack.Navigator
        screenOptions={{
            headerTintColor: this.props.themeColors.navbarTintTheme,
            headerBackTitle:' ',
            headerBackImage: () => 
              <View style={{marginLeft:10}}>
                <SvgXml fill={this.props.themeColors.navbarTintTheme} xml={SVGs.navBackButton} width='22' height='22'></SvgXml>
              </View>,
          }}>
        <Stack.Screen name="History" component={createHistoryTopTabs}
          options={({ navigation, route }) => ({
                    headerTintColor: this.props.themeColors.navbarTintTheme,
                    headerTitle: () => <LogoTitle />,
                    headerStyle: {elevation:0, shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground}, 
                  })}
        />
      </Stack.Navigator>

    createProfileStack = () =>
      <Stack.Navigator 
        screenOptions={{
          headerTintColor: this.props.themeColors.navbarTintTheme,
          headerBackTitle:' ',
          headerBackImage: () => 
            <View style={{marginLeft:10}}>
              <SvgXml fill={this.props.themeColors.navbarTintTheme} xml={SVGs.navBackButton} width='22' height='22'></SvgXml>
            </View>,
        }}>
        <Stack.Screen name="Profile" component={ProfileTab} navigation={this.navigation}
          options={({ navigation, route }) => ({ 
            headerTitle: () => <LogoTitle />,
            style:{elevation:0},
            headerStyle: {elevation:0, shadowOpacity:0, shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground}, 
            headerRight: () => (
              <Button onPress={() => navigation.navigate('Settings')}  navigation={this.navigation} style={{elevation:0, backgroundColor:"transparent", padding:3, marginRight:15}}>
                <View>
                  <SvgXml width='30' height='30' fill={this.props.themeColors.navbarTintTheme} xml={SVGs.settingsUncolored}></SvgXml>
                </View>
              </Button>
            ),
                    
          })}
        />
        <Stack.Screen name="GetLike" component={GetLikeScreen} 
          options={({ navigation, route }) => ({
                    headerTintColor: this.props.themeColors.navbarTintTheme,
                    headerTitle: () => <LogoTitle />,
                    headerStyle: {elevation:0, shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground}, 
                  })}
        />
        <Stack.Screen name="GetComment" component={GetCommentScreen} 
          options={({ navigation, route }) => ({
                    headerTintColor: this.props.themeColors.navbarTintTheme,
                    headerTitle: () => <LogoTitle />,
                    headerStyle: {elevation:0, shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground}, 
                  })}
        />
        <Stack.Screen name="GetCollection" component={GetCollectionScreen} 
          options={({ navigation, route }) => ({
                    headerTintColor: this.props.themeColors.navbarTintTheme,
                    headerTitle: () => <LogoTitle />,
                    headerStyle: {elevation:0, shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground}, 
                  })}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} 
          options={({ navigation, route }) => ({
                    headerTintColor: this.props.themeColors.navbarTintTheme,
                    headerTitle: () => <LogoTitle />,
                    headerStyle: {elevation:0,  shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground}, 
                  })}
        />
        <Stack.Screen name="BackupAccount" component={BackupAccount} 
          options={({ navigation, route }) => ({
                    headerTitle: () => <LogoTitle />,
                    headerStyle: {elevation:0,  shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground}, 
                  })}
        />
      </Stack.Navigator>
    
    createActionStack = () =>
      <Stack.Navigator 
        screenOptions={{
          headerTintColor: this.props.themeColors.navbarTintTheme,
          headerBackTitle:' ',
          headerBackImage: () => 
            <View style={{marginLeft:10}}>
              <SvgXml fill={this.props.themeColors.navbarTintTheme} xml={SVGs.navBackButton} width='22' height='22'></SvgXml>
            </View>,
        }}>
        <Stack.Screen name="ActionTab" component={ActionTab}
          options={({ navigation, route }) => ({ 
                    headerTitle: () => <LogoTitle />,
                    headerTitleStyle: { 
                      fontSize:FontSizes.headerUsername, fontFamily:FontFamilies.username, color:this.props.themeColors.navbarTintTheme,
                    },
                    style:{elevation:0},
                    headerStyle: {elevation:0, shadowOpacity:0, shadowColor: 'transparent', backgroundColor:'#6765F4'}, 
                    headerTintColor: this.props.themeColors.navbarTintTheme,
                    headerLeft: () => (
                      <Button  navigation={this.navigation} style={{ elevation:0, backgroundColor:"transparent", marginLeft:10}}>
                        <View style={{flexDirection:'row', justifyContent:'center', paddingRight:13, backgroundColor:this.props.themeColors.actionTabShopBackground, borderRadius:20 ,
                          shadowColor: this.props.themeColors.actionTabShopBackground,
                          shadowOffset: {
                              width: 0,
                              height: 0,
                          },
                          shadowOpacity: .5,
                          shadowRadius: 5}}>
                          <View style={{justifyContent:'center'}}>
                            <SvgXml width='35' height='35' xml={SVGs.coin}></SvgXml>
                          </View>
                          <View style={{justifyContent:'center'}}>
                            <Text style={{color:this.props.themeColors.actionTabShopTint, fontFamily:FontFamilies.navTitle, fontSize:19, bottom:-1}}> Ma??aza</Text>
                          </View>
                        </View>
                      </Button>
                    ),
                    headerRight: () => (
                      <View style={{marginRight:20, flexDirection:'row'}}>
                        <CoinView size={21} wid th={26} iconSide={'right'} price={this.state.coinAmount}/>
                    </View>
                    ),
                    
                    })}
        />
        <Stack.Screen name="ChoosePost" component={ChoosePost} navigation={this.navigation} 
          options={({ navigation, route }) => ({
                    headerTintColor: this.props.themeColors.navbarTintTheme,
                    headerStyle: {elevation:0,  shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground},
                  })}
        />
        <Stack.Screen name="EarnLike" component={EarnLike} navigation={this.navigation} 
          options={({ navigation, route }) => ({
                    headerTintColor: this.props.themeColors.navbarTintTheme,
                    headerStyle: {elevation:0,  shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground},
                  })}
        />
        <Stack.Screen name="EarnFollow" component={EarnFollow} navigation={this.navigation} 
          options={({ navigation, route }) => ({
                    headerTintColor: this.props.themeColors.navbarTintTheme,
                    headerStyle: {elevation:0,  shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground},
                  })}
        />
        <Stack.Screen name="EarnComment" component={EarnComment} navigation={this.navigation} 
          options={({ navigation, route }) => ({
                    headerTintColor: this.props.themeColors.navbarTintTheme,
                    headerStyle: {elevation:0,  shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground},
                  })}
        />
        <Stack.Screen name="EarnCollection" component={EarnCollection} navigation={this.navigation} 
          options={({ navigation, route }) => ({
                    headerStyle: {elevation:0,  shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground},
                  })}
        />
        <Stack.Screen name="GetLikeScreen" component={GetLikeScreen} navigation={this.navigation} 
          options={({ navigation, route }) => ({
                    headerTintColor: this.props.themeColors.navbarTintTheme,
                    headerTitle: () => <LogoTitle />,
                    headerStyle: {elevation:0,  shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground},
                  })}
        />
        <Stack.Screen name="GetCollectionScreen" component={GetCollectionScreen} navigation={this.navigation} 
          options={({ navigation, route }) => ({
                    headerTintColor: this.props.themeColors.navbarTintTheme,
                    headerTitle: () => <LogoTitle />,
                    headerStyle: {elevation:0,  shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground},
                  })}
        />
        <Stack.Screen name="GetCommentScreen" component={GetCommentScreen} navigation={this.navigation} 
          options={({ navigation, route }) => ({
                    headerTitle: () => <LogoTitle />,
                    headerStyle: {elevation:0,  shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground},
                  })}
        />
        <Stack.Screen name="GetFollowerScreen" component={GetFollowerScreen} navigation={this.navigation} 
          options={({ navigation, route }) => ({
                    headerTintColor: this.props.themeColors.navbarTintTheme,
                    headerTitle: () => <LogoTitle />,
                    headerStyle: {elevation:0,  shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground},
                  })}
        />
        <Stack.Screen name="BackupAccount" component={BackupAccount} 
          options={({ navigation, route }) => ({
                    headerTitle: () => <LogoTitle />,
                    headerStyle: {elevation:0,  shadowColor: 'transparent', backgroundColor:this.props.themeColors.screenBackground}, 
                  })}
        />
      </Stack.Navigator>

    return (
      <NavigationContainer onIndexChange={(index) => alert("x") } theme={this.state.theme ? this.state.theme : DefaultTheme}>
        <StatusBar translucent barStyle={this.props.themeColors.statusBar} />
        <MainBottomTab.Navigator 
          labeled= {false}
          activeColor={this.props.themeColors.bottomTabActiveTint}
          inactiveColor={this.props.themeColors.bottomTabPassiveTint}
          initialRouteName={'ExploreTab'}
          barStyle={{ 
            height:70,
            paddingTop:3,borderTopWidth: 1, borderColor:'rgba(233, 233, 233, .28)',
            position: 'absolute', bottom: -10, left: 0, right: 0, backgroundColor: this.props.themeColors.screenBackground
          }}
          >
          <MainBottomTab.Screen name="ExploreOffersTab" component={ExploreOffersTab} 
            options={{
              tabBarColor: 'transparent',
              tabBarIcon: ({ color }) => (
                <View>
                  <SvgXml fill={color} xml={SVGs.tabExploreUncolored} width='30' height='30'></SvgXml>
                </View>
              ),
            }}
          />
          <MainBottomTab.Screen name="HistoryTab" children={createHistoryStack} 
            options={{
              tabBarColor: 'transparent',
              tabBarIcon: ({ color }) => (
                <View>
                  <SvgXml fill={color} xml={SVGs.tabHistoryUncolored} width='30' height='30'></SvgXml>
                </View>
              ),
            }}
          />
          <MainBottomTab.Screen name="ActionTab" component={createActionStack} 
            options={{
              tabBarIcon: ({ color }) => (
                <View style={{backgroundColor:'transparent', position:'absolute', top:-14, borderRadius:25,
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 2.14,
                    elevation: 5}}
                  >
                    <View style={{ flex:1, top:7}}>
                      <SvgXml width='40' height='40' xml={SVGs.tabActionColored} ></SvgXml>
                    </View>
                  </View>
                  
              ),
            }}
          />
          <MainBottomTab.Screen name="NotificationsTab"  component={createNotificationsStack} 
            options={{
              tabBarColor: 'transparent',
              tabBarIcon: ({ color }) => (
                <View>
                  <SvgXml fill={color} xml={SVGs.tabNotificationUncolored} width='27' height='27'></SvgXml>
                </View>
              ),
            }}
          />
          
          <MainBottomTab.Screen  name="ProfileTab" children={createProfileStack} 
            barStyle={{ backgroundColor: '#000' }}
              options={{
                tabBarColor: 'transparent',
                
                tabBarIcon: ({ color }) => (
                  <View style={{marginTop:-8, marginLeft:-10}}>
                    <CircleGradient
                      backgroundColor={this.props.themeColors.screenBackground}
                      style={{ justifyContent: 'center', alignItems: 'center'}}
                      circleDiameter = {40}
                      gradientColors = {[this.props.themeColors.themeSide1Dark,this.props.themeColors.themeSide1Soft, this.props.themeColors.themeSide2Dark, this.props.themeColors.themeSide2Soft,  this.props.themeColors.themeSide3Dark, this.props.themeColors.themeSide3Soft]}
                    >
                      <Image source={{uri: this.props.originalAccount ? this.props.originalAccount.profileImageLink : 'https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg'}} style={{height:'94%', borderRadius:100, margin:'3%', aspectRatio:1}} />
                    </CircleGradient>
                  </View>
                ),
              }}
          />
        </MainBottomTab.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeColors: state.colorReducer.themeColors,
    originalAccount: state.accountReducer.originalAccount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateColorTheme: (isDark) => dispatch(updateColorTheme(isDark)),
    setOriginalAccount: (originalAccount) => dispatch(setOriginalAccount(originalAccount))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

const styles = StyleSheet.create({
})