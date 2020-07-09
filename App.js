
import React from 'react';
import {ScrollView, View, Text, Dimensions} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainComponent from './src/screens/Home';
import { debug } from 'react-native-reanimated';

console.disableYellowBox = true;
const AppNavigator = createStackNavigator({
  MainPage: {
    screen: MainComponent,
    navigationOptions: () => ({
      headerBackTitle: null,
      headerShown: false,
    }),
  },

});

const HomeNavigation = createAppContainer(AppNavigator);


class App extends React.Component {
  render() {
    return (
      // <Provider store={store}>
        <HomeNavigation />
      // </Provider>
      
    );
  }
}

export default App;
