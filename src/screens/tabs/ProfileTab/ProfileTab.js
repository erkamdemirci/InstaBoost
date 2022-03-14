import React, {Component} from 'react';
import { StyleSheet,  View, Text, Dimensions, Animated, Image, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import Modal from 'react-native-modal';
import { FontFamilies, FontSizes, SVGs } from '../../../constants'

import CoinView from '../../../components/CoinView'
import CircleGradient from '../../../components/CircleGradient'
import { WaveIndicator } from 'react-native-indicators';
import ActionTypesModal from './ActionTypesModal'
import { SvgXml } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient'

import { connect } from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const TabBarHeight = 52;
const HeaderHeight = 200;

class ProfileTab extends Component {
  
  componentDidMount() {
  // Post Verileri
    let items = Array.apply(null, Array(9)).map((v, i) => {
      return { id: i, src: 'http://placehold.it/200x200?text='+(i+1) }
    });
    this.setState({ items });
  }

  constructor(props) {
    super(props);
    this.state = { 
      shouldModalOpen: false
    };
  }

  _modalToggle = () => {
    this.setState({
      shouldModalOpen: !this.state.shouldModalOpen
    })
  }

  _navigateToAction = (itemType, imageLink) => {
    switch(itemType) {
      case 'like':
        this.props.navigation.navigate("GetLike", {
          imageLink: imageLink ? imageLink : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
          });
        break;
      case 'comment':
      this.props.navigation.navigate("GetComment", {
        imageLink: imageLink ? imageLink : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        });
      break;
      case 'collection':
      this.props.navigation.navigate("GetCollection", {
        imageLink: imageLink ? imageLink : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        });
      break;
      default:
        break;
    }
  }

  modifyNumber = (number) => {
    return number % 1 == 0 ? number : number.toFixed(1)
  }
  
  divideThousands = (number) => {
    const numberText = number.toString()
    return Math.abs(Number(numberText)) >= 1.0e+9
    ? this.modifyNumber(Math.abs(Number(numberText)) / 1.0e+9) + "B"
    : Math.abs(Number(numberText)) >= 1.0e+6
    ? this.modifyNumber(Math.abs(Number(numberText)) / 1.0e+6) + "M"
    : Math.abs(Number(numberText)) >= 1.0e+3
    ? this.modifyNumber(Math.abs(Number(numberText)) / 1.0e+3) + "K"
    : Math.abs(Number(numberText));
  }

  renderHeader = () => {
    return (
      <Animated.View style={[styles.header, {backgroundColor: this.props.themeColors.screenBackground}]}>
        <View style={{flex:1, flexDirection:'column'}}>
          <View style={{flex:6, flexDirection:'row', marginHorizontal:5}}>
            <View style={{flex:5}}>
              <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                <TouchableOpacity activeOpacity={0.5} style={{flex:1, justifyContent:'space-around', alignItems:'center'}}>
                  <CircleGradient
                    backgroundColor={this.props.themeColors.screenBackground}
                    style={{ borderRadius:50, padding:5, justifyContent: 'center', alignItems: 'center'}}
                    circleDiameter = {100}
                    gradientColors = {[this.props.themeColors.themeSide1Dark,this.props.themeColors.themeSide1Soft, this.props.themeColors.themeSide2Dark, this.props.themeColors.themeSide2Soft,  this.props.themeColors.themeSide3Dark, this.props.themeColors.themeSide3Soft]}
                  >
                    <Image style={{height:'92%', borderRadius:100, margin:'4%', aspectRatio:1}} source={{uri: this.props.originalAccount.profileImageLink}} />
                  </CircleGradient>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex:10}}>
              <View style={{flex:1, flexDirection:'column'}}>
                <View style={{flex:3.5}}> 
                  <TouchableOpacity style={{flex:3, justifyContent:'flex-end', alignItems:'flex-start'}}>
                    <Text style={{fontFamily:FontFamilies.name, fontSize:FontSizes.name, color:this.props.themeColors.profileName, letterSpacing:0.3}}>{this.props.originalAccount.profileName}</Text>
                  </TouchableOpacity>
                  <View style={{flex:2, justifyContent:'flex-start', alignItems:'flex-start'}}>
                    <Text style={{fontFamily:FontFamilies.username, fontSize:FontSizes.username, color:this.props.themeColors.profileUsername, letterSpacing:0.3}}>@{this.props.originalAccount.username}</Text>
                  </View>
                </View>
                <View style={{flex:4}}>
                  <Text style={{color:this.props.themeColors.profileDesc}}>
                    {this.props.originalAccount.description}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{flex:2.5}}>
            <View style={{flex:1, flexDirection:'row', marginHorizontal:20}}>
              <TouchableOpacity style={{flex:3, flexDirection:'column'}}>
                <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                  <Text style={{fontSize:FontSizes.profileNumbers, fontFamily:FontFamilies.profileNumbers, color:this.props.themeColors.profileNumbers}}>25</Text>
                </View>
                <View style={{flex:1, justifyContent:'flex-start', alignItems:'center'}}>
                  <Text style={{fontSize:FontSizes.profileNumberTitles, textAlign:'center', fontFamily:FontFamilies.profileNumberTitles, color:this.props.themeColors.profileNumberTitles, textTransform: 'uppercase'}}>GÖNDERİ</Text>
                </View>                  
              </TouchableOpacity>
              <TouchableOpacity style={{flex:3, flexDirection:'column'}}>
                <View View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                  <Text style={{fontSize:FontSizes.profileNumbers, fontFamily:FontFamilies.profileNumbers, color:this.props.themeColors.profileNumbers}}>{this.divideThousands(this.props.originalAccount.follower)}</Text>
                </View>
                <View style={{flex:1, justifyContent:'flex-start', alignItems:'center'}}>
                  <Text style={{fontSize:FontSizes.profileNumberTitles, textAlign:'center', fontFamily:FontFamilies.profileNumberTitles, color:this.props.themeColors.profileNumberTitles, textTransform: 'uppercase'}}>TAKİPÇİ</Text>
                </View> 
              </TouchableOpacity>
              <TouchableOpacity style={{flex:4, flexDirection:'column'}}>
                <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                  <Text style={{fontSize:FontSizes.profileNumbers, fontFamily:FontFamilies.profileNumbers, color:this.props.themeColors.profileNumbers}}>{this.divideThousands(this.props.originalAccount.following)}</Text>
                </View>
                <View style={{flex:1, justifyContent:'flex-start', alignItems:'center'}}>
                  <Text style={{fontSize:FontSizes.profileNumberTitles, textAlign:'center', fontFamily:FontFamilies.profileNumberTitles, color:this.props.themeColors.profileNumberTitles, textTransform: 'uppercase'}}>TAKİP EDİLEN</Text>
                </View> 
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex:0.1, marginHorizontal:5, opacity:.7, marginTop:5, borderRadius:10, overflow:'hidden', backgroundColor:'white'}}>
            <LinearGradient
              // Background Linear Gradient
              colors={[this.props.themeColors.themeBlue,this.props.themeColors.themeBlue2,this.props.themeColors.themeSide1Dark,this.props.themeColors.themeSide2Dark,this.props.themeColors.themeSide3Dark]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                  opacity:1,
                  position:'absolute',
                  top:0,
                  left:0,
                  bottom:0,
                  right:0
              }}
          />
          </View>
        </View>
      </Animated.View>
    )
  }

  renderItem = ({ item }) => {
    return(
      <TouchableOpacity
        key = {item.id}
        style = {styles.postItem}
        onPress = { () => this.setState({shouldModalOpen:true, imageLink:"https://source.unsplash.com/collection/"+item.id*3+"/1600x900"}) }
        >
        <View style={{position:"absolute", left:0, top:0, right:0, bottom:0, zIndex:2, alignItems:"flex-end", padding:5}}>       
          {
            item.id % 5 == 0 
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
                  <SvgXml width='25' height='25' style={{}} fill={this.props.themeColors.white} xml={SVGs.videoIcon}></SvgXml>
            </View>
            : null 
          }
        </View>
        <Image
          style = {{flex: 1}}
          source={{
            //uri: item.item.src,
            uri: "https://source.unsplash.com/collection/"+item.id*3+"/1600x900"
          }}
        />
      </TouchableOpacity>
    )
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
        //stackexchange User API url
            const url = 'https://randomuser.me/api/?page='+{page}+'&results=30';
            this.setState({ loading: true })
  
        }

    onRefresh() {
        this.setState({ isRefreshing: true });
    }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.themeColors.screenBackground}}>
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
                        <SvgXml width='70' height='70' xml={SVGs.reload}></SvgXml>
                        <Text style={{color:this.props.themeColors.dataCantLoadDesc, fontSize:26, lineHeight:30, textAlign:'center', padding:20, fontFamily:FontFamilies.balooRegular}}>
                            <Text style={{color:this.props.themeColors.dataCantLoadTitle, fontSize:30}}>Gönderilerin Yüklenemedi</Text>{"\n"}<Text>Tekrar denemek için tıkla!</Text>
                        </Text>
                    </TouchableOpacity>
                </Animatable.View>
        }
        <Animated.FlatList
          scrollToOverflowEnabled={true}
          ListHeaderComponent={() => this.renderHeader()}
          contentContainerStyle={{
            paddingBottom: 75,
            paddingHorizontal:2
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
          numColumns={3}
          data = { this.state.items }
          renderItem = { this.renderItem }
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReachedThreshold={0.5}
          onEndReached={this.handleLoadMore.bind(this)}
        />

        <ActionTypesModal imageLink={this.state.imageLink} shouldModalOpen={this.state.shouldModalOpen} navigateToAction={this._navigateToAction} modalToggle={this._modalToggle} /> 
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeColors: state.colorReducer.themeColors,
    originalAccount: state.accountReducer.originalAccount,
  }
}

export default connect(mapStateToProps)(ProfileTab);

const styles = StyleSheet.create({
  header: {
    top: 0,
    height: HeaderHeight,
    width: '100%',
    marginBottom:3
  },
  postItem: {
    width: (Dimensions.get('screen').width-16) / 3,
    aspectRatio:1,
    margin:2,
    borderRadius:5,
    overflow:'hidden'
  },
});