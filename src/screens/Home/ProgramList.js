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
        <Text style={{color: '#FFF', fontSize: 20}} />
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
        <Text style={{color: '#FFF', fontSize: 20}} />
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

const ProgramList = ({navigation}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [appReady, setApp] = useState(false);
  const [isSwitchOn, setSwitchOn] = useState(false);
  const [favoriteStatus, setFavoriteStatus] = useState([]);
  const [testval, settestval] = useState([]);
  const [channelList, setchannelList] = useState(false);
  const [isActivityIndicatorVisible, setActivityIndicator] = useState(false);
  const [programmeList, setProgrammeList] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [prevBtnText, setPrevBtnText] = useState('');
  const [dateSeletionStatus, setDateSelectionStatus] = useState('');

  useEffect(() => {
    let pageTitle = navigation.state.params.pageTitle;
    setPageTitle(pageTitle);

    let prevBtnText = navigation.state.params.prevBtnText;
    setPrevBtnText(prevBtnText);

    console.log('GOT RESULT1 RNFS.MainBundlePath=' + RNFS.MainBundlePath);
    setActivityIndicator(true);
    RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {
        console.log('GOT RESULT', result);
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then((statResult) => {
        console.log('statResult', statResult);
        return RNFS.readFile('/Volumes/data3/turkey.xml', 'utf8');
      })
      .then((contents) => {
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
                  fontSize: 16,
                }}>
                {prevBtnText}
              </Text>
            </View>
          </Button>
        </Left>
        <Body style={{flex: 2, alignItems: 'center'}}>
          <Text
            style={{
              marginHorizontal: 5,
              color: '#FFF',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {pageTitle}
          </Text>
        </Body>
        <Right style={{flex: 1}} />
      </Header>
      <Content>
        <View>
          <FlatList
            data={programmeList}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  backgroundColor: dateSeletionStatus[index]
                    ? colors.colorRed
                    : colors.dark_grey,
                  width: 80,
                  height: 80,
                  marginHorizontal: 2,
                  paddingHorizontal: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  let dateSeletionStatus = [false];
                  dateSeletionStatus[index] = true;
                  setDateSelectionStatus(dateSeletionStatus);
                }}>
                <Text style={{color: '#FFF'}}>Mon</Text>
                <Text style={{color: '#FFF'}}>1 May</Text>
              </TouchableOpacity>
            )}
            horizontal={true}
          />
        </View>

        <View style={{flex: 1, marginTop: 10, justifyContent: 'center'}}>
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
              data={programmeList}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: colors.darkBackground,
                    paddingVertical: 10,
                    marginBottom: 1,
                    paddingLeft: 15,
                    paddingRight: 10,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '85%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: colors.lightGrey}}>
                      {item.start.substring(8, 10)}:
                      {item.start.substring(10, 12)}
                    </Text>
                    <View style={{width: '85%', marginHorizontal: 15}}>
                      <Text style={{color: '#FFF', fontSize: 18}}>
                        {item.title[0].value}
                      </Text>
                      {item.desc[0] && item.desc[0].value && (
                        <Text
                          style={{
                            paddingVertical: 5,
                            color: colors.lightGrey,
                            fontSize: 15,
                          }}>
                          {item.desc[0].value}
                        </Text>
                      )}
                      <View
                        style={{
                          height: 2,
                          marginTop: 10,
                          width: '100%',
                          backgroundColor: 'white',
                        }}>
                        <View
                          style={{
                            height: 2,
                            width: '80%',
                            backgroundColor: 'red',
                          }} />
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity style={{}} onPress={() => {}}>
                    <Ionicons
                      name={
                        !favoriteStatus[index]
                          ? 'ios-play'
                          : 'ios-notifications-outline'
                      }
                      size={30}
                      style={{
                        marginLeft: 5,
                        marginRight: 10,
                        color: !favoriteStatus[index]
                          ? '#FFF'
                          : colors.colorRed,
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
export default ProgramList;

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
