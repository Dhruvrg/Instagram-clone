import {View, Text, TextInput, FlatList, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import Header from '../components/messages/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import UsersList from '../components/messages/UsersList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../config/firebase';
import MessageCard from '../components/messages/MessageCard';
import useShowNavbarContent from '../hooks/showNavbarContent';

const Messages = () => {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState<any>({});
  const showNavbarContent = useShowNavbarContent();

  const handleBackButtonClick = () => {
    showNavbarContent.logIn();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const getUserDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId == null) {
        return;
      }
      const data = await getDoc(doc(db, 'user', userId));
      setUser({...data.data(), id: data.id});
    } catch (error) {}
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <View style={tw`bg-[#000000] flex-1`}>
      <Header username={user.username} />
      <View style={tw`mx-5 my-3`}>
        <Icon
          style={tw`text-[#808080] text-lg absolute z-1 top-1 left-5`}
          name="search"
        />
        <TextInput
          value={search}
          onChangeText={(text: any) => setSearch(text)}
          placeholder="Search"
          placeholderTextColor={'#808080'}
          style={tw`bg-[#1C1C1C] text-[15px] text-white no-underline h-10 pl-15 font-semibold rounded-lg`}
        />
      </View>
      <UsersList />
      <View style={tw`flex-row items-center justify-between px-5`}>
        <Text style={tw`text-[#FFFFFF] font-semibold text-lg`}>Messages</Text>
        <Text style={tw`text-blue-600 font-semibold`}>Requests</Text>
      </View>
      <FlatList
        data={user.chat}
        keyExtractor={item => item}
        renderItem={({item}) => <MessageCard key={item} chatId={item} />}
      />
    </View>
  );
};

export default Messages;
