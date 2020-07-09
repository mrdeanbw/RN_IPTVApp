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
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  TabHeading,
  Content,
  Item,
  Input,
} from 'native-base';
import GlobalStyle from '../../style/globalStyle.js';
import colors from '../../style/colors';
import {SwipeListView} from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
// ]

const renderItem = (
  item,
  index,
  isEditMode,
  navigation,
  channelList,
  programmeList,
) => {
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
            <Ionicons name="ios-link" size={18} style={{color: '#FFFFFF'}} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Ionicons name="ios-link" size={18} style={{color: '#FFFFFF'}} />
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
        }}
        onPress={() => {
          // onChannelBtn(navigation, item);
          console.log('channelList', channelList);

          let programmeListForChannel = programmeList.filter(
            (programme) => programme.channel == item.id,
          );
          console.log('programmeListForChannel', programmeListForChannel);

          navigation.navigate('IPTVDetail', {
            programmeListForChannel: programmeListForChannel,
          });
        }}>
        <Text style={{color: '#FFF', fontSize: 20}}>{item.name[0].value}</Text>
        <Text style={{color: '#FFF', fontSize: 20}}></Text>
        {isEditMode ? (
          <TouchableOpacity>
            <Ionicons
              name="md-information-circle-outline"
              size={18}
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
const IPTV = ({navigation}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [appReady, setApp] = useState(false);
  const [channelList, setchannelList] = useState(false);
  const [isActivityIndicatorVisible, setActivityIndicator] = useState(false);
  const [programmeList, setProgrammeList] = useState(false);

  useEffect(() => {
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
        <Left style={{flex: 1}}></Left>
        <Body style={{flex: 3, alignItems: 'center'}}>
          <Title style={GlobalStyle.headerTitle}></Title>
        </Body>
        <Right style={{flex: 1}}></Right>
      </Header>
      <Content>
        <View style={{marginHorizontal: 15, marginBottom: 15}}>
          <Text style={{color: '#FFF', fontSize: 30, fontWeight: 'bold'}}>
            IPTV
          </Text>
          <Item
            style={{
              backgroundColor: '#222',
              borderRadius: 10,
              borderBottomWidth: 0,
              marginTop: 10,
            }}>
            <Ionicons
              name="md-search"
              size={22}
              style={{marginLeft: 10, color: '#9C9CA2'}}
            />
            <Input style={{color: '#FFF'}} placeholder="Search" />
          </Item>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
              paddingVertical: 0,
              backgroundColor: '#131313',
            }}>
            <View style={{marginHorizontal: 13}}>
              <MaterialCommunityIcons
                name="history"
                size={25}
                style={{color: '#FFFFFF'}}
              />
            </View>

            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 0.3,
                borderBottomColor: '#99999988',
                paddingVertical: 10,
                alignItems: 'center',
              }}>
              <Text style={{color: '#FFF', fontSize: 20}}>Most Recent</Text>
              <Text style={{color: '#FFF', fontSize: 20}}></Text>
              <Ionicons
                name="ios-arrow-forward"
                size={18}
                style={{marginLeft: 10, marginRight: 10, color: '#a9a9a9'}}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#131313',
            }}>
            <View style={{marginHorizontal: 15}}>
              <Ionicons
                name="ios-star-outline"
                size={25}
                style={{color: '#FFFFFF'}}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text style={{color: '#FFF', fontSize: 20}}>Favorites</Text>
              <Text style={{color: '#FFF', fontSize: 20}}></Text>
              <Ionicons
                name="ios-arrow-forward"
                size={18}
                style={{marginLeft: 10, marginRight: 10, color: '#a9a9a9'}}
              />
            </View>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 40,
              marginBottom: 10,
              marginLeft: 15,
              alignItems: 'center',
            }}>
            <Text style={{color: '#FFF', fontSize: 16}}>M3U LINKS</Text>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                justifyContent: 'center',
                marginTop: 2.5,
              }}
              onPress={() => {
                navigation.navigate('AddM3ULink', {
                  type: 'M3ULink',
                });
              }}>
              <Ionicons name="ios-add" size={25} style={{color: '#FF4444'}} />
            </TouchableOpacity>
          </View>

          {isActivityIndicatorVisible ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <SwipeListView
              data={channelList}
              renderItem={({item, index}) =>
                renderItem(
                  item,
                  index,
                  isEditMode,
                  navigation,
                  channelList,
                  programmeList,
                )
              }
              renderHiddenItem={(item, index) => (
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
                        name="ios-remove-circle"
                        size={18}
                        style={{color: '#FF4444'}}
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 10,
                      alignItems: 'center',
                    }}></View>
                </View>
              )}
              leftOpenValue={40}
            />
          )}
        </ScrollView>
      </Content>
    </Container>
  );
};
export default IPTV;

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
