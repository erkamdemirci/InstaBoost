// BEĞENİ AL, YORUM AL, KOLEKSİYON AL SAYFALARININ ALTINDA GEÇMİŞ OLACAK. 

import React, {useState, useEffect, useRef, Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import InsetShadow from 'react-native-inset-shadow';
import Modal from 'react-native-modal';
import { Colors , FontFamilies, FontSizes } from '../../constants'
import ActionIcons from '../../../assets/ActionIcons'
import CircleGradient from '../../components/CircleGradient'
import CoinView from '../../components/CoinView'
import { ScrollModal, ActionDetailModal, ActionTypesModal } from '../../components/Modals'
import { ProgressBar } from 'react-native-paper';
import fontFamilies from '../../constants/FontFamilies';
import {SvgXml } from "react-native-svg"


const AnimatedIndicator = Animated.createAnimatedComponent(ActivityIndicator);
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const TabBarHeight = 52;
const HeaderHeight = 180;
const SafeStatusBar = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
});
const PullToRefreshDist = 150;

class InstagramPostsFlatList extends Component {
  
  componentDidMount() {
  // Post Verileri
  let items = Array.apply(null, Array(16)).map((v, i) => {
      return { id: i, src: 'http://placehold.it/200x200?text='+(i+1) }
    });
    this.setState({ items });
  }

  constructor(props) {
    super(props);
    this.state = { 
      modalType: '', 
      actionType: '',
      bgImageUri:'',
    };
  }

  modalActionCallback = (action) => {
    switch(action) {
      case 'close':
        this.setState({modalType: ''});
        break;
      case 'like':
        this.setState({modalType: 'detail', actionType: 'like'});
        break;
      case 'comment':
        this.setState({modalType: 'detail', actionType: 'comment'});
        break;
      case 'collection':
        this.setState({modalType: 'detail', actionType: 'collection'});
        break;
      default:
        this.setState({modalType: ''});
        break;
    }
  }

  renderItem = ({ item }) => {
    return(
      <TouchableOpacity
        key = {item.id}
        style = {styles.postItem}
        onPress = { () => {this.setState({modalType:'actionTypes', bgImageUri:"https://source.unsplash.com/collection/"+item.id+"/1600x900"})}}
        >
        <View style={{position:"absolute", left:0, top:0, right:0, bottom:0, zIndex:2, alignItems:"flex-end", padding:5}}>       
          {item.id % 5 == 0 ? <Image style={{width:40, height:40}} source={{uri: "https://icon-library.com/images/play-icon-white-png/play-icon-white-png-4.jpg"}} /> : <View/> }
        </View>
        <Image
          style = {{ flex: 1}}
          source={{
            //uri: item.item.src,
            uri: "https://source.unsplash.com/collection/"+item.id+"/1600x900"
          }}
        />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.screenBackground}}>
        <Animated.FlatList
          scrollToOverflowEnabled={true}
          showsVerticalScrollIndicator ={false}
          scrollEventThrottle={16}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.props.scrollY}}}], {
            useNativeDriver: true,
          })}
          onMomentumScrollBegin={this.props.onMomentumScrollBegin}
          onScrollEndDrag={this.props.onScrollEndDrag}
          onMomentumScrollEnd={this.props.onMomentumScrollEnd}
          ItemSeparatorComponent={() => <View style={{height: 0}} />}
          ListHeaderComponent={() => <View style={{height: 0}} />}
          contentContainerStyle={{
            paddingTop: HeaderHeight + TabBarHeight,
            paddingHorizontal: 3,
            minHeight: Dimensions.get('window').height - TabBarHeight,
            paddingBottom: 75 
          }}
          showsHorizontalScrollIndicator={false} 
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data = { this.state.items }
          renderItem = { this.renderItem }
          keyExtractor={item => item.id.toString()}
          ref={this.props.onGetRef}
        />
        
      <ActionTypesModal bgImageUri={this.state.bgImageUri} modalType={this.state.modalType} modalActionCallback={this.modalActionCallback} />
      <ActionDetailModal modalType={this.state.modalType} actionType={this.state.actionType} modalActionCallback={this.modalActionCallback} />
      
      </View>
    );
  }
}

class ActivitiesScreen extends Component {
  
  componentDidMount() {
  // Post Verileri
  let items = Array.apply(null, Array(16)).map((v, i) => {
      return { id: i, src: 'http://placehold.it/200x200?text='+(i+1) }
    });
    this.setState({ items });
  }

  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  renderItem = ({ item }) => {
    return(
      <TouchableOpacity
        key = {item.id}
        style = {styles.postItem}
        onPress = { () => {StatusBar.setHidden(true); this.setState({modalType:'actionTypes', bgImageUri:"https://source.unsplash.com/collection/"+item.id+"/1600x900"})}}
        >
        <View style={{position:"absolute", left:0, top:0, right:0, bottom:0, zIndex:2, alignItems:"flex-end", padding:5}}>       
          {item.id % 5 == 0 ? <Image style={{width:40, height:40}} source={{uri: "https://icon-library.com/images/play-icon-white-png/play-icon-white-png-4.jpg"}} /> : <View/> }
        </View>
        <Image
          style = {{ flex: 1}}
          source={{
            //uri: item.item.src,
            uri: "https://source.unsplash.com/collection/"+item.id+"/1600x900"
          }}
        />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{borderWidth:5,  flex: 1, backgroundColor: Colors.screenBackground}}>
        <Animated.FlatList
          scrollToOverflowEnabled={true}
          showsVerticalScrollIndicator ={false}
          scrollEventThrottle={16}
          ref={(ref) => { this.flatListRef = ref; }}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.props.scrollY}}}], {
            useNativeDriver: false,
          })}
          onMomentumScrollBegin={this.props.onMomentumScrollBegin}
          onScrollEndDrag={this.props.onScrollEndDrag}
          onMomentumScrollEnd={this.props.onMomentumScrollEnd}
          ItemSeparatorComponent={() => <View style={{height: 0}} />}
          ListHeaderComponent={() => <View style={{height: 0}} />}
          contentContainerStyle={{
            paddingTop: HeaderHeight + TabBarHeight,
            paddingHorizontal: 3,
            minHeight: Dimensions.get('window').height - TabBarHeight,
            paddingBottom: 75 
          }}
          showsHorizontalScrollIndicator={false} 
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data = { this.state.items }
          renderItem = { this.renderItem }
          keyExtractor={item => item.id.toString()}
          ref={this.props.onGetRef}
        />
      </View>
    );
  }
}

const ProfileTab = () => {

  const flatListRef = React.useRef()
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'posts', title: 'Gönderilerim'},
    {key: 'activities', title: 'Aktiviteler'},
  ]);
  const scrollY = useRef(new Animated.Value(0)).current;
  let listRefArr = useRef([]);
  let listOffset = useRef({});
  let isListGliding = useRef(false);

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  const syncScrollOffset = () => {
    const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }else{}
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  const renderLabel = ({route, focused}) => {
    return (
      <Text style={[styles.label, {marginTop:-7, color:Colors.topTabBarActive, opacity: focused ? 1 : 0.5}]}>
        {route.title}
      </Text>
    );
  };

  const renderScene = ({route}) => {
    if(route.key == 'posts'){
      return (
        <InstagramPostsFlatList 
          scrollY={scrollY}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScrollEndDrag={onScrollEndDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onGetRef={(ref) => {
            if (ref) {
              const found = listRefArr.current.find((e) => e.key === route.key);
              if (!found) {
                listRefArr.current.push({
                  key: route.key,
                  value: ref,
                });
              }
            }
          }}
        />
      );
    }else{
      return (
        <ActivitiesScreen 
          scrollY={scrollY}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScrollEndDrag={onScrollEndDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onGetRef={(ref) => {
          if (ref) {
            const found = listRefArr.current.find((e) => e.key === route.key);
            if (!found) {
              listRefArr.current.push({
                key: route.key,
                value: ref,
              });
            }
          }
        }}
        />
      )
    }
    
  };

  const renderTabBar = (props) => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [HeaderHeight, 0],
      extrapolateRight: 'clamp',
    });
    return (
      <Animated.View
        style={{
          top: 0,
          zIndex: 1,
          position: 'absolute',
          transform: [{translateY: y}],
          width: '100%',
          height:40,
          borderRadius:0,
          overflow:'hidden',
        }}>
        <TabBar
          {...props}
          onTabPress={({route, preventDefault}) => {
            if (isListGliding.current) {
              preventDefault();
            }
          }}
          style={styles.tab}
          renderLabel={renderLabel}
          indicatorStyle={styles.indicator}
        />
      </Animated.View>
    );
  };

  const renderTabView = () => {
    return (
      <TabView
        onIndexChange={(index) => {setIndex(index)}}
        navigationState={{index: tabIndex, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{
          height: 0,
          width: Dimensions.get('window').width,
        }}
      />
    );
  };

  const renderCustomRefresh = () => {
    // headerMoveScrollY
    return Platform.select({
      ios: (
        <AnimatedIndicator
          style={{
            top: -50,
            position: 'absolute',
            alignSelf: 'center',
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-100, 0],
                  outputRange: [120, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
          animating
        />
      ),
      android: (
        <Animated.View
          style={{
            transform: [
              {
                translateY: headerMoveScrollY.interpolate({
                  inputRange: [-300, 0],
                  outputRange: [150, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
            backgroundColor: '#eee',
            height: 38,
            width: 38,
            borderRadius: 19,
            borderWidth: 2,
            borderColor: '#ddd',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            top: -50,
            position: 'absolute',
          }}>
          <ActivityIndicator animating />
        </Animated.View>
      ),
    });
  };

  return (
    <View style={{flex: 1}}>
      {renderTabView()}
      {renderHeader()}
    </View>
  );
};

export default ProfileTab

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    height: 48,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    paddingHorizontal: 16,
  },
  header: {
    top: 0,
    height: HeaderHeight,
    width: '100%',
    position: 'absolute',
  },
  label: {fontSize: FontSizes.topTabFontSize, fontFamily:FontFamilies.topTabFontFamily, color: Colors.themeColor},
  tab: {elevation: 0, shadowOpacity: 0, backgroundColor: Colors.screenBackground, borderRadius:0, paddingHorizontal:'2%'},
  indicator: {backgroundColor: Colors.topTabBarActive, height:3, zIndex: -1, borderRadius:2},
  headerContainer: {
    height:'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom:10,
    zIndex: -1,
    marginTop:5
  },
  headerColumn: {
    flex:1,
    textAlign: 'center',
    alignItems: 'center',
    height: 100,
  },
  profilePost: {
    resizeMode:'cover',
    width:'100%',
    height:'100%'
  },
  icon: {
    paddingLeft: 10
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  },
  postItem: {
    width: (Dimensions.get('screen').width-20) / 3,
    aspectRatio:1,
    margin:2,
    borderRadius:3,
    overflow:'hidden'
  },
  modalButton: {
    backgroundColor: '#fff',
    flexDirection:'row',
    position: "relative",
    alignItems: "center",
    height:55,
  },
  modalButtonLeft:{
    width:"50%",
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalButtonRight:{
    width:"50%",
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 18,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: Colors.themeColor,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.84,
    elevation: 2
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});