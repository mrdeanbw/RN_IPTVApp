/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../style/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {SwipeListView} from 'react-native-swipe-list-view';

const EPGList = [
  {
    title: 'Turkey EPG',
    description: 'KALP ATOSI',
    image: '',
    progress: 80,
  },
  {
    title: 'A2 EPG',
    description: 'KALP ATOSI',
    image: '',
    progress: 100,
  },
  {
    title: 'A3 EPG',
    description: 'KALP ATOSI',
    image: '',
    progress: 70,
  },
  {
    title: 'A4 EPG',
    description: 'KALP ATOSI',
    image: '',
    progress: 50,
  },
];

const renderItem = (item, index, isEditMode, navigation) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#171717',
        borderBottomWidth: 0.3,
        borderBottomColor: '#999',
      }}>
      <View style={{marginHorizontal: 15}}>
        <Ionicons name="ios-link" size={25} style={{color: '#FFFFFF'}} />
      </View>
      <TouchableOpacity
        style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}
        onPress={() => {
          navigation.navigate('TVGuideDetail', {
            title: item.title,
          });
        }}>
        <Text style={{color: '#FFF', fontSize: 20}}>{item.title}</Text>
        <Text style={{color: '#FFF', fontSize: 20}} />
      </TouchableOpacity>
      <Ionicons
        name="ios-arrow-forward"
        size={18}
        style={{marginLeft: 10, marginRight: 10, color: '#a9a9a9'}}
      />
    </View>
  );
};
function TVGuide({navigation}) {
  const [isEditMode, setEditMode] = useState(false);
  const [EPGListArray, setEPGListArray] = useState([]);
  const [dummy, setdummy] = useState(false);


  useEffect(() => {
    // console.log('GOT RESULT1 RNFS.MainBundlePath=' + RNFS.MainBundlePath);
    setEPGListArray(EPGList);
  }, []);

  // useEffect(() => {
  //   setEPGListArray(EPGListArray);
  // }, [EPGListArray]);

  return (
    <Container style={GlobalStyle.viewConinater}>
      <Header hasTabs style={styles.headerContainer}>
        <Left style={{flex: 1}} />
        <Body style={{flex: 3, alignItems: 'center'}}>
          <Title style={GlobalStyle.headerTitle} />
        </Body>
        <Right style={{flex: 1}} />
      </Header>
      <Content>
        <View style={{marginHorizontal: 15, marginBottom: 15}}>
          <Text style={{color: '#FFF', fontSize: 30, fontWeight: 'bold'}}>
            TV Guide
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
              paddingVertical: 10,
              backgroundColor: '#131313',
              borderWidth: 0.3,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderColor: '#999',
            }}>
            <View style={{marginHorizontal: 15}}>
              <Ionicons
                name="ios-notifications-outline"
                size={25}
                style={{color: '#FFFFFF'}}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: '#FFF', fontSize: 20}}>Schedules</Text>
              <Text style={{color: '#FFF', fontSize: 20}}>0</Text>
            </View>
            <Ionicons
              name="ios-arrow-forward"
              size={18}
              style={{marginLeft: 10, marginRight: 10, color: '#a9a9a9'}}
            />
          </View>
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 40,
            marginBottom: 10,
            marginLeft: 15,
            alignItems: 'center',
          }}>
          <Text style={{color: '#FFF', fontSize: 16}}>XMLTV LINKS</Text>
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              justifyContent: 'center',
              marginTop: 2.5,
            }}
            onPress={() => {
              navigation.navigate('AddXMLLink', {
                type: 'M3ULink',
              });
            }}>
            <Ionicons name="ios-add" size={25} style={{color: '#FF4444'}} />
          </TouchableOpacity>
        </View>

        <SwipeListView
          data={EPGListArray}
          renderItem={({item, index}) =>
            renderItem(item, index, isEditMode, navigation)
          }
          renderHiddenItem={({item, index}) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#171717',
              }}>
              <View style={{marginHorizontal: 15, borderBottomWidth: 0}}>
                <TouchableOpacity
                  onPress={() => {
                    console.log('index', index);
                    let newEPGListArray = [...EPGListArray];
                    newEPGListArray.splice(index, 1);
                    // console.log('EPGListArray', newEPGListArray);
                    setEPGListArray(newEPGListArray);
                    setdummy(false);
                  }}>
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
                }}
              />
            </View>
          )}
          leftOpenValue={40}
        />
      </Content>
    </Container>
  );
}
export default TVGuide;

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
