/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, Children } from 'react';
import {View,ScrollView, Text, TextInput, StyleSheet, Image, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import { Container, Header, Left, Body, Right, Button,  Title,
    TabHeading,
    Content, Item, Input} from 'native-base';
import GlobalStyle from '../../style/globalStyle.js';
import colors from '../../style/colors';
import { SwipeListView } from 'react-native-swipe-list-view';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const TVChannels = [
    {
        title : 'Africa and\nMiddle East',
    },
    {
        title : 'America',
    },
    {
        title : 'Asia',
    },
]

const renderAddLink = () => {
    return(
    <View key={index}
        style={{
        flexDirection:'row', flex:1, alignItems:'center',  backgroundColor:'#171717',
    }}>
      <View style={{marginHorizontal:15, borderBottomWidth:0}}>
        <TouchableOpacity>
            <Ionicons
                name="ios-add-circle"
                size={25}
                style={{ color: '#FFFFFF', }}
            />
        </TouchableOpacity>
      </View>

      <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', paddingVertical:10, borderBottomWidth:0.3, borderBottomColor:'#999', alignItems:'center'}}>
          <Text style={{color:'#FFF', fontSize:20}}>{item.title}</Text>
          <Text style={{color:'#FFF', fontSize:20 }}></Text>
          {
            isEditMode?
            <TouchableOpacity>
                <Ionicons
                name="ios-arrow-forward"
                size={18}
                style={{ marginLeft:10, marginRight:10, color: '#a9a9a9', }}
                />
            </TouchableOpacity>
            :
            <TouchableOpacity>
                <Ionicons
                    name="md-information-circle-outline"
                    size={25}
                    style={{ color: colors.colorRed, marginRight:10}}
                />
            </TouchableOpacity>
        }
          
      </View>
    </View>
    )
}

const renderItem = (item, index, isEditMode) =>{
 return(
    <View key={index}
        style={{
        flexDirection:'row', flex:1, alignItems:'center',  backgroundColor:'#171717',
    }}>
      <View style={{marginHorizontal:15, borderBottomWidth:0}}>
        {
            isEditMode?
            <TouchableOpacity>
            <Ionicons
                name="ios-link"
                size={25}
                style={{ color: '#FFFFFF', }}
            />
            </TouchableOpacity>
            :
            <TouchableOpacity>
            <Ionicons
                name="ios-link"
                size={25}
                style={{ color: '#FFFFFF', }}
            />
            </TouchableOpacity>
        }
      </View>

      <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', paddingVertical:10, borderBottomWidth:0.3, borderBottomColor:'#999', alignItems:'center'}}>
          <Text style={{color:'#FFF', fontSize:20}}>{item.title}</Text>
          <Text style={{color:'#FFF', fontSize:20 }}></Text>
          {
            isEditMode?
            <TouchableOpacity>
            <Ionicons
                name="md-information-circle-outline"
                size={25}
                style={{ color: colors.colorRed, marginRight:10}}
            />
            </TouchableOpacity>
            :
            <TouchableOpacity>
                <Ionicons
                name="ios-arrow-forward"
                size={18}
                style={{ marginLeft:10, marginRight:10, color: '#a9a9a9', }}
                />
            </TouchableOpacity>
        }
          
      </View>
    </View>
 )
}
const AddM3ULink = ({navigation}) => {

    const [isEditMode, setEditMode] = useState(false);
    const [appReady, setApp] = useState(false);
    const [channelTitle, setChannelTitle] = useState('');
    const [channelLink, setChannelLink] = useState('');

    return(
        <Container style={GlobalStyle.viewConinater}>
            <Header style={styles.headerContainer}>
                <Left style={{flex: 1}}>
                    <Button
                        transparent
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <View style={{borderBottomColor:colors.colorRed, borderBottomWidth:1}}>
                            <Text style={{color:colors.colorRed, fontSize:20, borderBottomColor:colors.colorRed, borderBottomWidth:3}}>Cancel</Text>
                        </View>      
                    </Button>
                    
                </Left>
                <Body style={{flex: 3, alignItems: 'center'}}>
                    <Title style={GlobalStyle.headerTitle}>M3U Link
                    </Title>
                </Body>
                <Right style={{flex: 1}}>
                    <Button
                        transparent
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <View style={{borderBottomColor:colors.colorRed, borderBottomWidth:1}}>
                            <Text style={{color:colors.colorRed, fontSize:20, borderBottomColor:colors.colorRed, borderBottomWidth:3}}>Save</Text>
                        </View>
                    </Button>
                </Right>
            </Header>
            <Content>
                <View style={{marginBottom:15,marginTop:30 ,backgroundColor:colors.darkBackground, paddingLeft:10}}>
                    <View style={{paddingVertical:10, borderBottomWidth:0.5, borderBottomColor:'#FFF'}}>
                        <TextInput placeholderTextColor="#C2C2C2" style={{color:'#FFF', fontSize:20}} placeholder="Title" 
                             value={channelTitle}
                             onChangeText={text => {
                                setChannelTitle(text)
                             }}
                        />
                    </View>
                    <View style={{paddingVertical:10}}>
                        <TextInput placeholderTextColor="#C2C2C2" style={{color:'#FFF', fontSize:20, minHeight:60}} placeholder="http://" multiline
                            value={channelLink}
                            onChangeText={text => {
                                setChannelLink(text);
                             }}
                        />
                    </View>
                </View>
                <View style={{marginBottom:15,marginTop:0, paddingLeft:10}}>
                    <Text style={{color:colors.placeholderTextColor, fontSize:14, borderBottomColor:colors.colorRed, borderBottomWidth:3}}>URL should return M3U content</Text>
                </View>

                <TouchableOpacity  style={{flexDirection:'row', flex:1, alignItems:'center',  backgroundColor:colors.darkBackground,}}
                    onPress={() => {
                        // navigation.navigation.navigate('AddM3ULink')
                    }}
                >
                    <View style={{flex:1, flexDirection:'row', paddingLeft:10, justifyContent:'space-between', paddingVertical:10, borderBottomWidth:0.3, borderBottomColor:'#999', alignItems:'center'}}>
                        <Text style={{color:'#FFF', fontSize:20}}>Check link contents</Text>
                        <Text style={{color:'#FFF', fontSize:20 }}></Text>
                            <TouchableOpacity>
                                <Ionicons
                                name="ios-arrow-forward"
                                size={18}
                                style={{ marginLeft:10, marginRight:10, color: '#a9a9a9', }}
                                />
                            </TouchableOpacity>
                    </View>
                </TouchableOpacity>

                <View style={{marginBottom:15,marginTop:30, paddingLeft:10}}>
                    <Text style={{color:colors.placeholderTextColor, fontSize:14, borderBottomColor:colors.colorRed, borderBottomWidth:3}}>SUGGESTED LINKS</Text>
                </View>

                <View style={{marginBottom:15,marginTop:0, paddingLeft:10, paddingVertical:10, backgroundColor:colors.darkBackground}}>
                    <FlatList
                        style={{ }}
                        keyExtractor={(item, index) => index.toString()}
                        data={TVChannels}
                        renderItem={({item, index}) => 
                            <View style={{height:50, width:150, backgroundColor:colors.tvchannelbackgroundColor,marginHorizontal:5,
                                justifyContent:'center', alignItems:'center', borderRadius:5,
                            }}>
                                <Text style={{color:'#FFF', fontSize:14 }}>{item.title}</Text>
                            </View>
                        }
                        horizontal
                    />
                </View>
                <View style={{marginBottom:15, paddingLeft:10}}>
                    <Text style={{color:colors.placeholderTextColor, fontSize:14, borderBottomColor:colors.colorRed, borderBottomWidth:3}}>Worldwide free, public local and available on{'\n'}internet TV channels</Text>
                </View>
            </Content>
        </Container>
    )
}
export default AddM3ULink;

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
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  
});
