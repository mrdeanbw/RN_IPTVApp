import {StyleSheet} from 'react-native';
import { color } from 'react-native-reanimated';
import colors from './colors';

export default StyleSheet.create({


  viewConinater:{
    flex: 1,
    backgroundColor:'black'
  },
  containerView: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  headerContainer: {
    borderBottomWidth: 0,
    width: '100%',
    backgroundColor: colors.headerContainerDark,
  },
  headerTitle: {
    color: colors.colorWhite,
  },
  headerIcons: {
    // color: '#2846FF',
    color: '#FFFFFF',
  },

  FooterContainer:{
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor:'#EEE',
  },

  tabBarUnderlineStyle: {
    backgroundColor: '#00B9AA',
    alignContent: 'center',
    alignSelf: 'center',
    // tabBarActiveTextColor: '#2846FF',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // addGraphicView : {
  //   size={14}
  // }
});
