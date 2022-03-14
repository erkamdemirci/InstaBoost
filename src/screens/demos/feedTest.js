import React, { Component } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';

class ExploreOffersTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView>
        <Text> Feed Main </Text>
        <Button
          title='Go to Feed Item'
          onPress={() => this.props.navigation.navigate('Detail')}   
        />
      </SafeAreaView>
    );
  }
}

export default ExploreOffersTab;
