import React, {useRef, useEffect} from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
// For IPTV
import IPTV from './IPTV';
import IPTVDetail from './IPTVDetail';
import AddM3ULink from './AddM3ULink';
// For TV Guide
import TVGuide from './TVGuide';
import TVGuideDetail from './TVGuideDetail';
import AddXMLLink from './AddXMLLink';
import ProgramList from './ProgramList';

import colors from '../../style/colors';

const IPTVStack = createStackNavigator(
  {
    Home: {screen: IPTV},
    AddM3ULink: {screen: AddM3ULink},
    IPTVDetail: {screen: IPTVDetail},
  },
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#42f44b',
      },
      headerTintColor: '#FFFFFF',
    },
  },
);

const TVGuideStack = createStackNavigator(
  {
    TVGuide: {screen: TVGuide},
    TVGuideDetail: {screen: TVGuideDetail},
    ProgramList: {screen: ProgramList},
    AddXMLLink: {screen: AddXMLLink},
  },
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#42f44b',
      },
      headerTintColor: '#FFFFFF',
      title: 'Social',
    },
  },
);

const App = createBottomTabNavigator(
  {
    Home: {
      screen: IPTVStack,
      navigationOptions: {
        title: 'IPTV',
      },
    },
    TVGuide: {
      screen: TVGuideStack,
      navigationOptions: {
        title: 'TV Guide',
      },
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `live-tv`;
          return <MaterialIcons name={iconName} size={25} color={tintColor} />;
        }
        if (routeName === 'TVGuide') {
          // iconName = `nav-icon-grid`;
          iconName = 'ios-keypad';
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: colors.colorRed,
      inactiveTintColor: '#AAAAAA',
      activeBackgroundColor: '#db517777',
      // inactiveBackgroundColor: 'trasparent',
      tabStyle: {borderRadius: 5},
      style: {backgroundColor: colors.headerContainerDark},
    },
  },
);

export default createAppContainer(App);
