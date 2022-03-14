import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, SafeAreaView, StyleSheet, TouchableOpacity,Switch, Image } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements"
import { Colors , FontFamilies, FontSizes, SVGs } from '../../../constants'
import { SvgXml } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient'

class Tab5 extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      secondAccountConnected: true,

      autoLike: true,
      autoComment: true,
      autoFollow: true,
      autoCollection: true,
      autoWatch: false,

      data: [
        {
          id: 1,
          isButton: true,
          rowBackgroundColor:'#fff',
          titleColor:Colors.likeMain,
          contentColor:Colors.settingsButtonContent,
          iconSVG: SVGs.likeUncolored,
          title: "Otomatik Beğeni",
          content: "Bu özelliği aktif ederek diğer kullanıcıların gönderilerine otomatik beğeni yaparak kredi kazanabilirsin.",
          action: <View>
            <SvgXml width='25' height='25' fill={'#fff'} xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g>	<g>		<path d="M496.128,220.361l-160-144.032c-19.712-17.728-50.08-16.192-67.808,3.584c-17.728,19.68-16.128,50.048,3.584,67.776			l66.976,60.32H48c-26.528,0-48,21.472-48,48s21.472,48,48,48h290.944l-67.072,60.32c-19.712,17.76-21.312,48.096-3.584,67.776			c9.504,10.528,22.592,15.904,35.712,15.904c11.456,0,22.944-4.064,32.096-12.32l160-143.968			c10.112-9.088,15.904-22.08,15.904-35.68C512,242.441,506.208,229.449,496.128,220.361z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'}></SvgXml>
          </View>,
          navigate: 'asdf'
        },
        {
          id: 2,
          titleColor:Colors.commentMain,
          contentColor:Colors.settingsButtonContent,
          iconSVG: SVGs.commentUncolored,
          title: "Otomatik Yorum",
          content: "Başkalarının gönderilerine yorum yaparak kredi kazanabilirsin!",
        },
        {
          id: 3,
          titleColor:Colors.followMain,
          contentColor:Colors.settingsButtonContent,
          iconSVG: SVGs.followUncolored,
          title: "Otomatik Takip",
          content: "Bu özelliği aktif ederek diğer kullanıcıların gönderilerine otomatik beğeni yaparak kredi kazanabilirsin."
        },
        {
          id: 4,
          titleColor:Colors.collectionMain,
          contentColor:Colors.settingsButtonContent,
          isButton: true,
          iconSVG: collectionUncolored,
          title: "Otomatik Koleksiyon",
          content: "Bu özelliği aktif ederek diğer kullanıcıların gönderilerini otomatik koleksiyona ekleyerek kredi kazanabilirsin.",
          action: <View>
            <SvgXml width='25' height='25' fill={'#4175DF'} xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g>	<g>		<path d="M496.128,220.361l-160-144.032c-19.712-17.728-50.08-16.192-67.808,3.584c-17.728,19.68-16.128,50.048,3.584,67.776			l66.976,60.32H48c-26.528,0-48,21.472-48,48s21.472,48,48,48h290.944l-67.072,60.32c-19.712,17.76-21.312,48.096-3.584,67.776			c9.504,10.528,22.592,15.904,35.712,15.904c11.456,0,22.944-4.064,32.096-12.32l160-143.968			c10.112-9.088,15.904-22.08,15.904-35.68C512,242.441,506.208,229.449,496.128,220.361z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'}></SvgXml>
          </View>,
        },
        {
          id: 5,
          titleColor:Colors.watchMain,
          contentColor:Colors.settingsButtonContent,
          isButton: true,
          iconSVG: '<svg id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m69.193 342.129c52.17 47.142 115.633 78.871 186.807 78.871 71.165 0 134.628-31.721 186.807-78.871 42.639-38.529 66.042-76.741 67.018-78.349 2.9-4.781 2.9-10.779 0-15.561-.976-1.608-24.379-39.82-67.018-78.349-52.17-47.141-115.633-78.87-186.807-78.87-71.165 0-134.628 31.721-186.807 78.871-42.638 38.528-66.042 76.741-67.018 78.349-2.9 4.781-2.9 10.779 0 15.561.976 1.607 24.38 39.82 67.018 78.348zm20.114-150c52.232-47.197 108.316-71.129 166.693-71.129 58.128 0 113.999 23.74 166.062 70.56 28.638 25.754 48.228 51.846 56.96 64.45-8.636 12.486-27.92 38.189-56.329 63.86-52.232 47.198-108.316 71.13-166.693 71.13-58.128 0-113.999-23.74-166.062-70.56-28.638-25.754-48.228-51.846-56.96-64.45 8.635-12.487 27.92-38.19 56.329-63.861z"/><path d="m256 361c57.897 0 105-47.103 105-105s-47.103-105-105-105-105 47.103-105 105 47.103 105 105 105zm0-180c41.355 0 75 33.645 75 75s-33.645 75-75 75-75-33.645-75-75 33.645-75 75-75z"/><path d="m256 301c24.813 0 45-20.187 45-45s-20.187-45-45-45-45 20.187-45 45 20.187 45 45 45zm0-60c8.271 0 15 6.729 15 15s-6.729 15-15 15-15-6.729-15-15 6.729-15 15-15z"/></g></svg>',
          title: "Otomatik İzlenme",
          content: "Bu özellik otomatik olarak çalışmamaktadır.",
          action: <View>
            <SvgXml width='25' height='25' fill={'#4175DF'} xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g>	<g>		<path d="M496.128,220.361l-160-144.032c-19.712-17.728-50.08-16.192-67.808,3.584c-17.728,19.68-16.128,50.048,3.584,67.776			l66.976,60.32H48c-26.528,0-48,21.472-48,48s21.472,48,48,48h290.944l-67.072,60.32c-19.712,17.76-21.312,48.096-3.584,67.776			c9.504,10.528,22.592,15.904,35.712,15.904c11.456,0,22.944-4.064,32.096-12.32l160-143.968			c10.112-9.088,15.904-22.08,15.904-35.68C512,242.441,506.208,229.449,496.128,220.361z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'}></SvgXml>
          </View>,
        },
      ],
    };
  }

  componentDidMount() {
  }


  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0,
          width: "86%",
          backgroundColor: "#fff",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeaderConnected = () => {
    return <View style={{justifyContent:'center', alignItems:'center', flex:1, paddingHorizontal:10, backgroundColor:Colors.screenBackground, marginBottom:15}}>
        <Text style={{fontSize:25, paddingLeft:10, fontFamily:FontFamilies.coinText, color:Colors.themeDark, textAlign:'center', marginVertical:5}}>
            OTOMATİK KAZAN
        </Text>
        <Text style={{fontSize:19, fontFamily:FontFamilies.settingsRowContent, color:'#000', textAlign:'center'}}>
            <Text style={{fontFamily: 'Roboto-Black', fontWeight:'bold'}}>“KAZAN”</Text> özelliklerinde kullanmak için farklı bir hesap bağladınız! {"\n\n"} <Text style={{lineHeight:20, color:Colors.gray}}>Bu, asıl hesabınızı korumanıza yardımcı olur.</Text>
        </Text>
        <View style={{flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row', marginVertical:10}}>
            <View style={{paddingLeft:20, backgroundColor:'white', flexDirection:'row', zIndex:-1, borderRadius:25,
                shadowColor: Colors.lightGray2,
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0.57,
                shadowRadius: 2.84,
                elevation: 2}}>
                <Image source={require('../../../../assets/ProfileImage2.jpg')} style={{position:'absolute', top:-5, borderWidth:1, borderColor:Colors.lightGray, left:-25, width:50, height:50, borderRadius:25}} />

                <Text style={{fontFamily:'Mada-Bold', fontSize:FontSizes.username, color:'black', padding:10, paddingRight:15}}>@erkamdemirci</Text>
            </View>
        </View>
        <View>
            <TouchableOpacity onPress={() => this.setState({secondAccountConnected: !this.state.secondAccountConnected})}>
                <Text style={{color:'#928DFF', fontWeight:'bold', marginVertical:10, fontSize:15}}>Farklı Bir Hesap Bağla</Text>
            </TouchableOpacity>
        </View>
    </View>;
}

  renderHeaderNotConnected = () => {
    return <View style={{justifyContent:'center', alignItems:'center', flex:1, paddingHorizontal:10, backgroundColor:Colors.screenBackground, marginBottom:15}}>
        <Text style={{fontSize:25, paddingLeft:10, fontFamily:FontFamilies.coinText, color:'#58C36A', textAlign:'center', marginVertical:5}}>
            OTOMATİK KAZAN
        </Text>

        <Text style={{fontSize:18, fontFamily:FontFamilies.settingsRowContent, color:'#000', textAlign:'center'}}>
            Dilerseniz yeni bir instagram hesabı açarak ya da başka bir hesabı bağlayarak <Text style={{fontFamily: 'Roboto-Black', fontWeight:'bold'}}>“KAZAN”</Text> özelliklerini yeni açtığınız hesapta aktif edebilirsiniz.{'\n'}<Text style={{color:Colors.gray, lineHeight:25}}>Bu, asıl hesabınızı korumanıza yardımcı olur.</Text>
        </Text>
        
        <TouchableOpacity style={{flex:1, width:'100%', height:50, borderRadius:25, backgroundColor:'#B91D73', overflow:'hidden', marginTop:15, marginBottom:7, flexDirection:'row'}}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#F953C6', '#B91D73']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 0.75, y: 0.5 }}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom:0,
                }}
            />
            <View style={{flex:3, justifyContent:'center', alignItems:'center'}}>
                <View>
                    <SvgXml width='25' height='25' fill={'#fff'} xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g>	<g>		<path d="M367.57,256.909c-9.839-4.677-19.878-8.706-30.093-12.081C370.56,219.996,392,180.455,392,136C392,61.01,330.991,0,256,0			c-74.991,0-136,61.01-136,136c0,44.504,21.488,84.084,54.633,108.911c-30.368,9.998-58.863,25.555-83.803,46.069			c-45.732,37.617-77.529,90.086-89.532,147.743c-3.762,18.066,0.745,36.622,12.363,50.908C25.222,503.847,42.365,512,60.693,512			H307c11.046,0,20-8.954,20-20c0-11.046-8.954-20-20-20H60.693c-8.538,0-13.689-4.766-15.999-7.606			c-3.989-4.905-5.533-11.29-4.236-17.519c20.755-99.695,108.691-172.521,210.24-174.977c1.759,0.068,3.526,0.102,5.302,0.102			c1.793,0,3.578-0.035,5.354-0.104c31.12,0.73,61.05,7.832,89.044,21.14c9.977,4.74,21.907,0.499,26.649-9.478			C381.789,273.582,377.547,261.651,367.57,256.909z M260.878,231.877c-1.623-0.029-3.249-0.044-4.878-0.044			c-1.614,0-3.228,0.016-4.84,0.046C200.465,229.35,160,187.312,160,136c0-52.935,43.065-96,96-96s96,43.065,96,96			C352,187.299,311.555,229.329,260.878,231.877z"/>	</g></g><g>	<g>		<path d="M492,397h-55v-55c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v55h-55c-11.046,0-20,8.954-20,20			c0,11.046,8.954,20,20,20h55v55c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20v-55h55c11.046,0,20-8.954,20-20			C512,405.954,503.046,397,492,397z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'}></SvgXml>
                </View>
            </View>
            <View style={{flex:11, justifyContent:'center'}}>
                <Text style={{color:'white', fontFamily:'gilroy-Black', fontSize:18}}>Yeni Hesap Oluştur</Text>
            </View>
            <View style={{flex:2, justifyContent:'center', alignItems:'flex-start'}}>
                <View>
                    <SvgXml width='25' height='25' fill={'#fff'} xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g>	<g>		<path d="M496.128,220.361l-160-144.032c-19.712-17.728-50.08-16.192-67.808,3.584c-17.728,19.68-16.128,50.048,3.584,67.776			l66.976,60.32H48c-26.528,0-48,21.472-48,48s21.472,48,48,48h290.944l-67.072,60.32c-19.712,17.76-21.312,48.096-3.584,67.776			c9.504,10.528,22.592,15.904,35.712,15.904c11.456,0,22.944-4.064,32.096-12.32l160-143.968			c10.112-9.088,15.904-22.08,15.904-35.68C512,242.441,506.208,229.449,496.128,220.361z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'}></SvgXml>
                </View>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.setState({secondAccountConnected: !this.state.secondAccountConnected})} style={{flex:1, width:'100%', height:50, borderRadius:25, backgroundColor:'#B91D73', overflow:'hidden', marginBottom:15, flexDirection:'row'}}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#00B4DB', '#0083B0']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 0.75, y: 0.5 }}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom:0,
                }}
            />
            <View style={{flex:3, justifyContent:'center', alignItems:'center'}}>
                <View>
                    <SvgXml width='25' height='25' fill={'#fff'} xml={'<svg id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m306.096 139.589-42.362 42.362c63.201 7.958 89.188 85.519 44.713 129.993l-128.574 128.575c-29.882 29.882-78.514 29.882-108.396 0-29.954-29.975-29.963-78.432 0-108.396l33.83-33.84c-6.212-20.407-8.183-45.636-4.167-70.2l-63.246 63.246c-50.505 50.505-50.544 132.268-.01 182.782 50.489 50.51 132.279 50.524 182.782 0 158.123-158.101 113.829-113.816 126.552-126.591 62.463-64.858 40.731-172.051-41.122-207.931z"/><path d="m474.205 220.573c50.398-50.388 50.388-132.384 0-182.782-50.391-50.371-132.373-50.399-182.772 0-129.418 129.418-126.551 126.6-126.551 126.6-63.235 65.675-39.886 172.39 41.102 207.922h.01l38.771-38.771h-.01c-63.214-8.003-89.056-85.397-44.88-129.816 0 0 73.311-73.307 128.741-128.752 29.908-29.908 78.382-30.013 108.396 0 29.892 29.892 29.892 78.514 0 108.405l-30.219 30.219c7.161 26.227 7.858 47.72 4.187 70.2z"/><path d="m16.339 189.371c.463 0 .933-.021 1.403-.065l29.284-2.717c8.249-.765 14.315-8.072 13.55-16.321s-8.071-14.321-16.322-13.55l-29.284 2.717c-8.249.765-14.315 8.072-13.55 16.321.723 7.778 7.26 13.615 14.919 13.615z"/><path d="m170.278 60.565c.471.044.939.065 1.403.065 7.659 0 14.197-5.838 14.918-13.615l2.717-29.283c.765-8.249-5.301-15.557-13.55-16.321-8.251-.767-15.556 5.302-16.322 13.55l-2.717 29.283c-.764 8.249 5.302 15.557 13.551 16.321z"/><path d="m74.046 92.558c5.858 5.858 15.355 5.858 21.213 0 5.858-5.857 5.858-15.355 0-21.213l-18.785-18.785c-5.857-5.857-15.355-5.857-21.213 0s-5.858 15.355 0 21.213z"/><path d="m494.257 322.694-29.283 2.717c-8.249.765-14.315 8.072-13.55 16.321.766 8.261 8.089 14.318 16.321 13.55l29.283-2.717c8.249-.765 14.315-8.072 13.55-16.321-.765-8.25-8.084-14.321-16.321-13.55z"/><path d="m341.722 451.435c-8.259-.77-15.556 5.302-16.321 13.55l-2.717 29.283c-.814 8.77 6.077 16.387 14.953 16.387 7.659 0 14.196-5.838 14.918-13.615l2.717-29.283c.765-8.25-5.301-15.558-13.55-16.322z"/><path d="m437.954 419.442c-5.857-5.857-15.355-5.857-21.213 0s-5.858 15.355 0 21.213l18.785 18.785c5.858 5.858 15.355 5.858 21.213 0 5.858-5.857 5.858-15.355 0-21.213z"/></g></svg>'}></SvgXml>
                </View>
            </View>
            <View style={{flex:11, justifyContent:'center'}}>
                <Text style={{color:'white', fontFamily:'gilroy-Black', fontSize:18}}>Farklı Hesap Bağla</Text>
            </View>
            <View style={{flex:2, justifyContent:'center', alignItems:'flex-start'}}>
                <View>
                    <SvgXml width='25' height='25' fill={'#fff'} xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g>	<g>		<path d="M496.128,220.361l-160-144.032c-19.712-17.728-50.08-16.192-67.808,3.584c-17.728,19.68-16.128,50.048,3.584,67.776			l66.976,60.32H48c-26.528,0-48,21.472-48,48s21.472,48,48,48h290.944l-67.072,60.32c-19.712,17.76-21.312,48.096-3.584,67.776			c9.504,10.528,22.592,15.904,35.712,15.904c11.456,0,22.944-4.064,32.096-12.32l160-143.968			c10.112-9.088,15.904-22.08,15.904-35.68C512,242.441,506.208,229.449,496.128,220.361z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'}></SvgXml>
                </View>
            </View>
        </TouchableOpacity>

        <Text style={{fontSize:16, paddingLeft:10, fontFamily:FontFamilies.settingsRowContent, color:'#000', textAlign:'center'}}>
        Aşağıdaki izinleri aktif ederek , <Text style={{fontFamily: 'Roboto-Black', fontWeight:'bold', color:'#58C36A'}}>“Otomatik Kazan”</Text> özelliği ile uygulama telefonunuzda açık olduğu sürece puan kazanabilirsiniz.
        </Text>
    </View>
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderItem = (item) => {
    return <View style={[styles.rowContainer,{opacity: item.id==5 ? 0.5 : 1}]}>
    <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
      <View style={{width:60, height:60, justifyContent:'center', alignItems:'center'}}>
        <View>
          <SvgXml xml={item.iconSVG} fill={item.titleColor} width='30' height='30'></SvgXml>
        </View>
      </View>
    </View>
    <View style={{flex:8, flexDirection:'column'}}>
      <View style={{flex:1, padding:2, minHeight:35, justifyContent:'flex-end', alignItems:'flex-start'}}>
        <Text style={{fontFamily:FontFamilies.settingsRowTitle, color:item.titleColor, fontSize:FontSizes.settingsRowTitle}}>{item.title}</Text>
      </View>
      <View style={{flex:7, padding:2}}>
        <Text style={{fontFamily:FontFamilies.settingsRowContent, fontSize:FontSizes.settingsRowContent, lineHeight:17, color:item.contentColor, paddingBottom:10}}>{item.content}</Text>
      </View>
    </View>
    <View style={{flex:3, justifyContent:'center', alignItems:'center'}}>
      <View style={{width:50, height:50, justifyContent:'center', alignItems:'center'}}>
      <>
      { <View>
        {
          {
            1: <Switch
                trackColor={{false: 'gray', true: 'lightgreen'}}
                thumbColor="white"
                ios_backgroundColor="gray"
                onValueChange={(value) => this.setState({autoLike:value})}
                value={this.state.autoLike}
            />,
            2: <Switch 
                trackColor={{false: 'gray', true: 'lightgreen'}}
                thumbColor="white"
                ios_backgroundColor="gray"
                onValueChange={(value) => this.setState({autoComment:value})}
                value={this.state.autoComment}
            />,
            3: <Switch 
                trackColor={{false: 'gray', true: 'lightgreen'}}
                thumbColor="white"
                ios_backgroundColor="gray"
                onValueChange={(value) => this.setState({autoFollow:value})}
                value={this.state.autoFollow}
            />,
            4: <Switch 
                trackColor={{false: '#gray', true: 'lightgreen'}}
                thumbColor="white"
                ios_backgroundColor="#gray"
                onValueChange={(value) => this.setState({autoCollection:value})}
                value={this.state.autoCollection}
            />,
            5: <Switch 
                trackColor={{false: '#EEEEEF', true: 'lightgreen'}}
                disabled={true}
                thumbColor="white"
                ios_backgroundColor="#EEEEEF"
                onValueChange={(value) => this.setState({autoWatch:value})}
                value={this.state.autoWatch}
            />
          }[item.id]
        }
        </View>
       }
       </>
      </View>
    </View>
  </View>;
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => this.renderItem(item)}
          numColumns={1}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.state.secondAccountConnected ? this.renderHeaderConnected() : this.renderHeaderNotConnected()}
          showsHorizontalScrollIndicator={false} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 75,
            paddingTop:5
          }}
        />
      </SafeAreaView>
    );
  }
}

export default Tab5;

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:5,
    backgroundColor:Colors.screenBackground
  },
  rowContainer: {
    flex:1, flexDirection:'row',
    backgroundColor:'#fff', margin:5, 
    marginVertical:5,
    minHeight:100, borderRadius:15,
    shadowColor: Colors.lightGray2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.57,
    shadowRadius: 3.84,
    elevation: 2
  }
})