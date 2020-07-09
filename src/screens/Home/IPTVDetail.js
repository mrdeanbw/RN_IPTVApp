/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
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
const LiveTVDetail = ({route, navigation}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [appReady, setApp] = useState(false);
  const [isSwitchOn, setSwitchOn] = useState(false);
  const [favoriteStatus, setFavoriteStatus] = useState([]);
  const [testval, settestval] = useState([]);
  const [selectedTab, setActiveTab] = useState('all');
  const [programmeListForChannel, setProgrammeListForChannel] = useState('');

  const programmeListForChannel_tmp =
    navigation.state.params.programmeListForChannel;

  console.log('navigation=', navigation);
  console.log('programmeListForChannel', programmeListForChannel_tmp);
  useEffect(() => {
    setProgrammeListForChannel(programmeListForChannel_tmp);
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
                Live TV
              </Text>
            </View>
          </Button>
        </Left>
        <Body style={{flex: 2, alignItems: 'center'}}>
          <Tabs
            initialPage={0}
            tabBarBackgroundColor={colors.inactiveTabColor}
            // tabContainerStyle = {{height:100}}
            style={{flex: 1, paddingVertical: 0, width: 200, height: 30}}
            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
            tabsContainerStyle={{height: 50, borderRadius: 10}}
            tabContainerStyle={{height: 40}}
            onChangeTab={({i}) => {
              console.log('onchangetab' + i);
              if (i == 0) setActiveTab('all');
              else setActiveTab('favorite');
            }}>
            <Tab
              heading={'All'}
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              textStyle={styles.textStyle}
              activeTextStyle={styles.activeTextStyle}
              style={{backgroundColor: 'transparent'}}></Tab>

            <Tab
              heading={'Favorites'}
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              textStyle={styles.textStyle}
              activeTextStyle={styles.activeTextStyle}
              style={{backgroundColor: 'transparent'}}></Tab>
          </Tabs>

          {/* <Switch
                        value={isSwitchOn}
                        style={{borderColor:'red', borderWidth:5, marginHorizontal:20}}
                        onValueChange={(isSimpleWiki) => {
                        //   this.setState({isSimpleWiki : isSimpleWiki}); 
                        //   this.setState({isWikiLevelChanged : true});
                        //   this.switchWikipediaLevel(isSimpleWiki);
                            setSwitchOn(!isSwitchOn)
                        }}
                        disabled={false}
                        activeText={'123'}
                        inActiveText={'Favorites'}
                        // circleSize={35}
                        circleBorderWidth={2}
                        backgroundActive={'#62636a'}
                        backgroundInactive={'#26272c'}
                        circleActiveColor={'#62636a'}
                        circleInActiveColor={'#62636a'}
                        changeValueImmediately={true}
                        renderInsideCircle={() => 
                            // <Text style={{color : '#F962A1',fontWeight:'bold', fontSize:18}}>S</Text> 
                            <View style={{backgroundColor:'red'}}>

                            </View>
                        } // custom component to render inside the Switch circle (Text, Image, etc.)
                        changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                        innerCircleStyle={{ alignItems: "center", justifyContent: "center", borderColor : 'red', borderWidth:0 }} // style for inner animated circle for what you (may) be rendering inside the circle
                        outerCircleStyle={{}} // style for outer animated circle
                        renderActiveText={true}
                        renderInActiveText={true}
                        switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                        switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                        switchWidthMultiplier={5} // multipled by the `circleSize` prop to calculate total width of the Switch
                    /> */}
        </Body>
        <Right style={{flex: 1}}></Right>
      </Header>
      <Content>
        <View style={{marginHorizontal: 15, marginBottom: 15}}>
          <Text style={{color: '#FFF', fontSize: 30, fontWeight: 'bold'}}>
            LiveTVDetail
          </Text>
        </View>
        <View>
          {selectedTab == 'all' ? (
            <FlatList
              data={programmeListForChannel}
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
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{width: 40, height: 40}}
                      source={{
                        //   uri: 'https://st.depositphotos.com/1092019/4295/i/950/depositphotos_42959315-stock-photo-iptv-concept-on-digital-background.jpg',
                        uri: '',
                      }}
                    />
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 16,
                        marginHorizontal: 15,
                      }}>
                      {item.title[0].value}
                    </Text>
                  </View>
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
                      name={
                        favoriteStatus[index] ? 'ios-star' : 'ios-star-outline'
                      }
                      size={25}
                      style={{
                        marginLeft: 10,
                        marginRight: 10,
                        color: colors.colorRed,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <FlatList
              data={programmeListForChannel}
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
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{width: 40, height: 40}}
                      source={{
                        uri:
                          'https://st.depositphotos.com/1092019/4295/i/950/depositphotos_42959315-stock-photo-iptv-concept-on-digital-background.jpg',
                      }}
                    />
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 16,
                        marginHorizontal: 15,
                      }}>
                      {item.title[0].value}
                    </Text>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </Content>
    </Container>
  );
};
export default LiveTVDetail;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
  },
  headerContainer: {
    backgroundColor: '#1a171b',
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
  activeTextStyle: {
    color: '#FFF',
  },
  textStyle: {
    color: 'white',
    fontWeight: '600',
  },
  tabStyle: {
    // height:20,
    backgroundColor: colors.inactiveTabColor,
    // borderWidth: 0,
    // borderRadius : 4,
    // borderRightWidth: 0,
    // borderLeftWidth: 0,
  },
  activeTabStyle: {
    backgroundColor: colors.activeTabColor,
  },
  tabBarUnderlineStyle: {
    backgroundColor: '#00B9AA',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    height: 0,
  },
});
