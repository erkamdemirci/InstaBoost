import * as React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, FlatList, Text } from 'react-native';
import { TabView } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import Constants from 'expo-constants';
import { FontFamilies, FontSizes } from '../../../constants';
import { LinearGradient } from 'expo-linear-gradient'
import { SvgXml } from "react-native-svg"
import CoinView from '../../../components/CoinView';

import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { LogBox } from 'react-native'

const tab1ItemSize = (Dimensions.get('window').width - 30) / 2;
const tab2ItemSize = (Dimensions.get('window').width - 40) / 3;

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])


class ActionTabView extends React.Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.postAspectRatio = 1;
    
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: '+ KAZAN' },
        { key: 'second', title: '- HARCA' },
      ],
    };
}
  
_renderTabScene = () => {
  return (
    <SafeAreaView style={{backgroundColor:this.props.themeColors.actionTabBackground, width:'100%', borderBottomLeftRadius:25, borderBottomRightRadius:25,
        paddingHorizontal: 10,
        shadowColor: this.props.themeColors.rowShadow,
                          shadowOffset: {
                              width: 0,
                              height: 0,
                          },
                          shadowOpacity: .2,
                          shadowRadius: 5}}>
          <FlatList nestedScrollEnabled
            data={this.props ? this.props.data : null}
            renderItem={({ item }) => 
              <TouchableOpacity onPress={() => {this.props.navigation.navigate(item.screen, {
                  type: item.type ? item.type : null, secondScreen: item.secondScreen ? item.secondScreen : null }) }} 
                  style={{flexDirection:'row', minHeight:100, margin:5, alignSelf:'center', width:'100%', justifyContent:'center', alignItems:'center', borderRadius:10, overflow:'hidden', padding:10}}>
                <LinearGradient
                      // Background Linear Gradient
                      colors={[this.props.themeColors.linearGradientDark, this.props.themeColors.linearGradientLight]}
                      start={{ x: 0.5, y: 0 }}
                      end={{ x: 0.5, y: 1 }}
                      style={{
                          opacity:.85,
                          position:'absolute',
                          top:0,
                          left:0,
                          bottom:0,
                          right:0
                      }}
                  />
                  <View style={{flex:1}}>
                      <View style={{width:'100%', alignItems:'center', justifyContent:'center', aspectRatio:1, borderRadius:50, backgroundColor:item.color, 
                        shadowColor: this.props.themeColors.screenBackground,
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 8}}>
                        <SvgXml width='20' height='20' fill={this.props.themeColors.white} xml={item.iconSVG}></SvgXml>
                      </View>
                  </View>
                  <View style={{flex:6, padding:10, flexDirection:'column'}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flexGrow:1}}>
                          <Text style={{color:item.color, fontFamily:FontFamilies.actionItemTitle, fontSize:FontSizes.actionItemTitle}}>{item.title}</Text>
                        </View>
                        <View style={{bottom:5}}>
                          <CoinView iconSide={"right"} plus={this.props.tabIndex ? null : !this.props.tabIndex } minus={this.props.tabIndex ? this.props.tabIndex : null}  price={item.price}/>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                      <Text style={{color:this.props.themeColors.actionTabRowDesc, fontFamily:FontFamilies.actionItemContent, fontSize:FontSizes.actionItemContent}}>{item.content}</Text>
                    </View>
                  </View>
              </TouchableOpacity>
            }
            numColumns={1}
            scrollEnabled={false}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 15,
              paddingTop:5
            }}
          />
        </SafeAreaView>
  )
}

  _handleIndexChange = index => {this.setState({ index }); this.props.tabChangeCallback(index)};

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={[styles.tabBar,{backgroundColor: this.props.themeColors.actionTabBackground}]}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 110 : 149
                ),
              })
            ),
            
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 107 : 165
                ),
              })
            ),
            
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 242 : 166
                ),
              })
            ),
          );

          return (
            <TouchableOpacity
              style={styles.tabItem}
              key={i.toString()}
              onPress={() => {this.setState({ index: i }); this.props.tabChangeCallback(i)}}>
              <Animated.Text style={[styles.tabText,{ color }]}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return this._renderTabScene();
      case 'second':
        return this._renderTabScene();
    }
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        initialLayout={{
          height: 0,
          width: Dimensions.get('window').width,
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeColors: state.colorReducer.themeColors
  }
}
export default connect(mapStateToProps)(ActionTabView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {fontSize: 27, top:-8, fontFamily:FontFamilies.actionTabTitle},
});
