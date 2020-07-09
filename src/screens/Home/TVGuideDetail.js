/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  TabHeading,
  Tab,
  Tabs,
  Item,
  Input,
} from 'native-base';
import GlobalStyle from '../../style/globalStyle.js';
import colors from '../../style/colors';
import {SwipeListView} from 'react-native-swipe-list-view';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Switch} from 'react-native-switch';
import TVGuide from './TVGuide.js';
import parser from 'epg-parser';
var RNFS = require('react-native-fs');

// const EPGList = [
//     {
//         title : 'A1 EPG',
//         description : 'KALP ATOSI',
//         image : '',
//         progress : 80,
//     },
//     {
//         title : 'A2 EPG',
//         description : 'KALP ATOSI',
//         image : '',
//         progress : 100,
//     },
//     {
//         title : 'A3 EPG',
//         description : 'KALP ATOSI',
//         image : '',
//         progress : 70,
//     },
//     {
//         title : 'A4 EPG',
//         description : 'KALP ATOSI',
//         image : '',
//         progress : 50,
//     },
//     {
//         title : 'A1 EPG',
//         description : 'KALP ATOSI',
//         image : '',
//         progress : 80,
//     },
//     {
//         title : 'A2 EPG',
//         description : 'KALP ATOSI',
//         image : '',
//         progress : 100,
//     },
//     {
//         title : 'A3 EPG',
//         description : 'KALP ATOSI',
//         image : '',
//         progress : 70,
//     },
//     {
//         title : 'A4 EPG',
//         description : 'KALP ATOSI',
//         image : '',
//         progress : 50,
//     },
//     {
//         title : 'A1 EPG',
//         description : 'KALP ATOSI',
//         image : '',
//         progress : 80,
//     },
//     {
//         title : 'A2 EPG',
//         description : 'KALP ATOSI',
//         image : '',
//         progress : 100,
//     },
//     {
//         title : 'A3 EPG',
//         description : 'KALP ATOSI',
//         image : '',
//         progress : 70,
//     },
//     {
//         title : 'A4 EPG',
//         description : 'KALP ATOSI',
//         image : '',
//         progress : 50,
//     },
// ]

const renderAddLink = () => {
  return (
    <View
      key={index}
      style={{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#171717',
      }}>
      <View style={{marginHorizontal: 15, borderBottomWidth: 0}}>
        <TouchableOpacity>
          <Ionicons
            name="ios-add-circle"
            size={25}
            style={{color: '#FFFFFF'}}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
          borderBottomWidth: 0.3,
          borderBottomColor: '#999',
          alignItems: 'center',
        }}>
        <Text style={{color: '#FFF', fontSize: 20}}>{item.title}</Text>
        <Text style={{color: '#FFF', fontSize: 20}}></Text>
        {isEditMode ? (
          <TouchableOpacity>
            <Ionicons
              name="ios-arrow-forward"
              size={18}
              style={{marginLeft: 10, marginRight: 10, color: '#a9a9a9'}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Ionicons
              name="md-information-circle-outline"
              size={25}
              style={{color: colors.colorRed, marginRight: 10}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const renderItem = (item, index, isEditMode) => {
  return (
    <View
      key={index}
      activeOpacity={0.5}
      style={{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#171717',
      }}>
      <View style={{marginHorizontal: 15, borderBottomWidth: 0}}>
        {isEditMode ? (
          <TouchableOpacity>
            <Ionicons name="ios-link" size={25} style={{color: '#FFFFFF'}} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Ionicons name="ios-link" size={25} style={{color: '#FFFFFF'}} />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
          borderBottomWidth: 0.3,
          borderBottomColor: '#999',
          alignItems: 'center',
        }}>
        <Text style={{color: '#FFF', fontSize: 20}}>{item.title}</Text>
        <Text style={{color: '#FFF', fontSize: 20}}></Text>
        {isEditMode ? (
          <TouchableOpacity>
            <Ionicons
              name="md-information-circle-outline"
              size={25}
              style={{color: colors.colorRed, marginRight: 10}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Ionicons
              name="ios-arrow-forward"
              size={18}
              style={{marginLeft: 10, marginRight: 10, color: '#a9a9a9'}}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};
const TVGuideDetail = ({navigation}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [appReady, setApp] = useState(false);
  const [isSwitchOn, setSwitchOn] = useState(false);
  const [favoriteStatus, setFavoriteStatus] = useState([]);
  const [testval, settestval] = useState([]);

  const [channelList, setchannelList] = useState(false);
  const [isActivityIndicatorVisible, setActivityIndicator] = useState(false);
  const [programmeList, setProgrammeList] = useState(false);
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    let pageTitle = navigation.state.params.title;
    setPageTitle(pageTitle);

    console.log('GOT RESULT1 RNFS.MainBundlePath=' + RNFS.MainBundlePath);
    setActivityIndicator(true);
    RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {
        console.log('GOT RESULT', result);
        // stat the first file
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then((statResult) => {
        console.log('statResult', statResult);
        return RNFS.readFile('/Volumes/data3/turkey.xml', 'utf8');
        // return 'no file';
      })
      .then((contents) => {
        // log the file contents
        console.log('epg=', contents);
        const result = parser.parse(contents);
        console.log('parseresult1', result);
        if (
          result &&
          result.hasOwnProperty('channels') &&
          result.hasOwnProperty('programs')
        ) {
          setchannelList(result.channels);
          setProgrammeList(result.programs);
        }
        setActivityIndicator(false);
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  }, []);

  return (
    <Container style={GlobalStyle.viewConinater}>
      <Header hasTabs style={styles.headerContainer}>
        <Left style={{flex: 1}}>
          <Button
            transparent
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons
              name="ios-arrow-back"
              size={22}
              style={{marginLeft: 10, color: colors.colorRed}}
            />
            <View
              style={{
                borderBottomColor: colors.colorRed,
                borderBottomWidth: 1,
              }}>
              <Text
                style={{
                  marginHorizontal: 5,
                  color: colors.colorRed,
                  fontSize: 20,
                }}>
                TV Guide
              </Text>
            </View>
          </Button>
        </Left>
        <Body style={{flex: 2, alignItems: 'center'}}></Body>
        <Right style={{flex: 1}}></Right>
      </Header>
      <Content>
        <View style={{marginHorizontal: 15, marginBottom: 15}}>
          <Text style={{color: '#FFF', fontSize: 30, fontWeight: 'bold'}}>
            {pageTitle}
          </Text>
        </View>

        <View style={{flex: 1, justifyContent: 'center'}}>
          {isActivityIndicatorVisible ? (
            <View style={{height: '100%', width: '100%'}}>
              <ActivityIndicator
                size="large"
                color="white"
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
              />
            </View>
          ) : (
            <FlatList
              data={channelList}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: colors.darkBackground,
                    marginHorizontal: 15,
                    paddingVertical: 10,
                    marginBottom: 10,
                    paddingHorizontal: 15,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => {
                      console.log('item', item);
                      navigation.navigate('ProgramList', {
                        pageTitle: item.name[0].value,
                        prevBtnText: pageTitle,
                      });
                    }}>
                    <Image
                      style={{width: 40, height: 40}}
                      source={{uri: item.icon[0]}}
                    />
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 16,
                        marginHorizontal: 15,
                      }}>
                      {item.name[0].value}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{}}
                    onPress={() => {
                      let status = favoriteStatus[index];
                      let favoriteStatus1 = favoriteStatus;
                      favoriteStatus1[index] = !status;
                      console.log(favoriteStatus1);
                      setFavoriteStatus(favoriteStatus1);
                      settestval(testval + 1);
                    }}>
                    <Ionicons
                      name="ios-arrow-forward"
                      size={25}
                      color="#FFFFFF"
                      style={{
                        marginLeft: 10,
                        marginRight: 10,
                        color: '#a9a9a9',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
      </Content>
    </Container>
  );
};
export default TVGuideDetail;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
  },
  headerContainer: {
    backgroundColor: '#000',
    borderBottomWidth: 0,
    width: '100%',
  },
  headerTitle: {
    color: '#FF0000',
  },
  headerIcons: {
    color: '#000000',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  imageIcon: {
    marginVertical: 10,
    marginRight: 20,
    width: 80,
    height: 50,
  },
});
