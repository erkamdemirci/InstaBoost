historySubTabs = ({ navigation, route }) => {
    const actionType = route.name
    return (
      <MaterialTopTabs.Navigator 
        tabBarOptions={{
          activeTintColor: Colors.themeDark,
          inactiveTintColor: Colors.themeLight,
          showIcon:false,
          showLabel:true,
          scrollEnabled:false,
          indicatorStyle: {backgroundColor: Colors.themeDark, height:3, zIndex: -1, borderRadius:2},
          labelStyle: { fontSize: 21, fontFamily:'Baloo-Regular', textTransform:'capitalize', top:-2 },
          tabStyle: { height: 40, padding:0 },
          style: { height:42, shadowOpacity:0},
        }}>
        <MaterialTopTabs.Screen initialParams={{ post: actionType }} name="ActiveSessions" component={HistoryActiveTab} 
        options={{ title: 'Aktif Teklifler' }}/>
        <MaterialTopTabs.Screen initialParams={{ post: actionType }} name="DoneSessions" component={HistoryDoneTab} 
        options={{ title: 'Tamamlanmış' }}/>
      </MaterialTopTabs.Navigator>
    )
  }

  historyStack = () =>
      <Stack.Navigator>
        <Stack.Screen name="Feed" component={createHistoryTopTabs} options={({ navigation, route }) => ({ 
                    headerTitle: () => <LogoTitle />,
                    headerTitleStyle: { 
                      fontSize:FontSizes.headerUsername, fontFamily:FontFamilies.username, color:Colors.username,
                    },
                    headerStyle: {shadowColor: 'transparent', backgroundColor:Colors.screenBackground}, 
                    headerTintColor: Col.navTitle,
                    headerRight: () => (
                      <Button onPress={() => navigation.navigate('Settings')}  navigation={this.navigation} iconRight style={{backgroundColor:"transparent", padding:3, marginRight:15}}>
                        <View>
                          <SvgXml fill={Colors.headerIconTint} xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 18.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 456.556 456.556" style="enable-background:new 0 0 456.556 456.556;" xml:space="preserve"><g>	<path d="M97.564,79.443H13.428C6.011,79.443,0,73.428,0,66.015s6.011-13.428,13.428-13.428h84.136		c7.417,0,13.428,6.015,13.428,13.428S104.981,79.443,97.564,79.443z"/>	<path d="M145.643,127.518c-33.916,0-61.507-27.591-61.507-61.504c0-33.92,27.591-61.511,61.507-61.511s61.507,27.591,61.507,61.511		C207.15,99.928,179.559,127.518,145.643,127.518z M145.643,31.36c-19.107,0-34.651,15.547-34.651,34.654		s15.544,34.647,34.651,34.647s34.651-15.54,34.651-34.647S164.75,31.36,145.643,31.36z"/>	<path d="M443.128,79.443H242.433c-7.417,0-13.428-6.015-13.428-13.428s6.011-13.428,13.428-13.428h200.694		c7.417,0,13.428,6.015,13.428,13.428S450.545,79.443,443.128,79.443z"/>	<path d="M325.936,289.782c-33.917,0-61.507-27.591-61.507-61.504s27.591-61.504,61.507-61.504s61.507,27.591,61.507,61.504		S359.853,289.782,325.936,289.782z M325.936,193.631c-19.107,0-34.651,15.54-34.651,34.647s15.544,34.647,34.651,34.647		s34.651-15.54,34.651-34.647S345.043,193.631,325.936,193.631z"/>	<path d="M229.149,241.706H13.428C6.011,241.706,0,235.691,0,228.278s6.011-13.428,13.428-13.428h215.721		c7.417,0,13.428,6.015,13.428,13.428S236.566,241.706,229.149,241.706z"/>	<path d="M443.128,241.706h-69.113c-7.417,0-13.428-6.015-13.428-13.428s6.011-13.428,13.428-13.428h69.113		c7.417,0,13.428,6.015,13.428,13.428S450.545,241.706,443.128,241.706z"/>	<path d="M130.62,452.052c-33.916,0-61.507-27.591-61.507-61.511c0-33.913,27.591-61.504,61.507-61.504s61.507,27.591,61.507,61.504		C192.127,424.461,164.536,452.052,130.62,452.052z M130.62,355.894c-19.107,0-34.651,15.54-34.651,34.647		s15.544,34.654,34.651,34.654s34.651-15.547,34.651-34.654S149.727,355.894,130.62,355.894z"/>	<path d="M443.128,403.97H227.407c-7.417,0-13.428-6.015-13.428-13.428c0-7.413,6.011-13.428,13.428-13.428h215.721		c7.417,0,13.428,6.015,13.428,13.428C456.556,397.955,450.545,403.97,443.128,403.97z"/>	<path d="M82.541,403.97H13.428C6.011,403.97,0,397.955,0,390.541c0-7.413,6.011-13.428,13.428-13.428h69.113		c7.417,0,13.428,6.015,13.428,13.428C95.969,397.955,89.958,403.97,82.541,403.97z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>' } width='25' height='25'></SvgXml>
                        </View>
                      </Button>
                    ),
                    
                    })} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>

createHistoryTopTabs = () => {
  return (
    <MaterialTopTabs.Navigator 
      tabBarOptions={{
        activeTintColor: Colors.white,
        inactiveTintColor: Colors.themeLight,
        showIcon:true,
        showLabel:false,
        scrollEnabled:false,
        indicatorStyle: {backgroundColor:  Colors.themeDark, width:'7.5%', marginHorizontal:'5%', height:'85%', bottom:'7%', zIndex: -1, borderRadius:50, 
        shadowColor: Colors.themeDark,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.65,
            shadowRadius: 3,
            elevation: 2},
        labelStyle: { fontSize: 22, fontFamily:'Baloo-Regular', textTransform:'capitalize' },
        tabStyle: { height: 40, padding:0, margin:0},
        style: { height:50,shadowOpacity:0},
      }}>
      <MaterialTopTabs.Screen initialParams={{ post: "asf" }}  name="Like" component={HistoryTab} options={{ title: 'Aktif Teklifler', tabBarIcon: ({ color }) => (
            <View>
              <SvgXml width='27' height='27' fill={color} xml={likeUncolored }></SvgXml>
            </View>
          )}}/>
      <MaterialTopTabs.Screen navigation={this.navigation} name={"Follow"} name="Follow" component={HistoryTab} options={{ title: 'Tamamlanmış', tabBarIcon: ({ color }) => (
        <View>
          <SvgXml width='27' height='27' fill={color} xml={followUncolored }></SvgXml>
        </View>
      )}}/>
      <MaterialTopTabs.Screen navigation={this.navigation}  name="Collection" component={HistoryTab} options={{ title: 'Tamamlanmış', tabBarIcon: ({ color }) => (
            <View>
              <SvgXml width='27' height='27' fill={color} xml={collectionUncolored }></SvgXml>
            </View>
          )}}/>
      <MaterialTopTabs.Screen navigation={this.navigation}  name="Comment" component={HistoryTab} options={{ title: 'Tamamlanmış', tabBarIcon: ({ color }) => (
            <View>
              <SvgXml width='27' height='27' fill={color} xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 18.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 1024.287 1024.287" style="enable-background:new 0 0 1024.287 1024.287;" xml:space="preserve"><g>	<path d="M832.519,132.576c-176.76-176.776-464.39-176.76-641.151,0c-176.768,176.768-176.768,464.39,0,641.15		c98.879,98.895,239.293,146.613,377.948,129.074l156.507,115.594c5.234,3.869,11.527,5.893,17.899,5.893		c2.676,0,5.359-0.353,7.988-1.075c8.914-2.456,16.212-8.859,19.79-17.381l44.641-106.208c6.45-15.341-0.761-33.004-16.102-39.454		c-15.349-6.435-33.02,0.761-39.454,16.102l-29.787,70.874L595.212,847.009c-6.466-4.779-14.611-6.819-22.529-5.532		c-123.809,19.217-250.365-22.019-338.706-110.36c-153.267-153.266-153.267-402.658,0-555.933		c153.259-153.259,402.643-153.274,555.933,0c97.404,97.42,136.38,235.699,104.255,369.897c-0.078,0.33-0.157,0.659-0.22,0.989		c-4.504,18.558-10.382,36.881-17.31,54.065L806.24,767.637c-6.45,15.341,0.761,33.004,16.102,39.454		c15.341,6.442,33.012-0.761,39.454-16.102l70.56-167.901c8.239-20.418,15.05-41.683,19.939-61.983		c0.447-1.42,0.785-2.849,1.02-4.285C989.364,402.801,944.307,244.364,832.519,132.576z"/>	<path d="M702.911,312.009h-362.96c-13.316,0-24.106,10.684-24.106,24s10.79,24,24.106,24h362.96c13.316,0,24.106-10.684,24.106-24		S716.228,312.009,702.911,312.009z"/>	<path d="M727.017,474.009c0-13.316-10.79-24-24.106-24h-362.96c-13.316,0-24.106,10.684-24.106,24c0,13.316,10.79,24,24.106,24		h362.96C716.228,498.009,727.017,487.325,727.017,474.009z"/>	<path d="M339.951,588.009c-13.316,0-24.106,10.684-24.106,24c0,13.316,10.79,24,24.106,24H547.44c13.316,0,24.106-10.684,24.106-24		c0-13.316-10.79-24-24.106-24H339.951z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>' }></SvgXml>
            </View>
          )}}/>
    </MaterialTopTabs.Navigator>
  )
}

render() {
    return (
        <SafeAreaView style={styles.container}>
            <Text> {this.props.route.params.post} </Text>
            <FlatList
                data={this.state.DATA}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}