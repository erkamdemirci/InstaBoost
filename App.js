import React, {useEffect} from 'react'
import MainScreen from './src/MainScreen'
import { registerRootComponent } from 'expo';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import {customFonts} from './customFonts'

import { Provider } from 'react-redux';
import configureStore from './src/redux/store';

const store = configureStore();

const getDataFromJSON = () => {
  return require('./src/jsonData/userData.json')
};

export default class App extends React.Component {
  state = {
    isLoading: false,
    jsonData: null,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ jsonData: await getDataFromJSON(), isLoading: true});
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Provider store={store}>
          <MainScreen jsonData={this.state.jsonData} />
        </Provider>
      );
    } else {
      return <AppLoading />;
    }
  }
}

registerRootComponent(App);

