import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../config/firebase';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import Avatar from '../Avatar';
import Icon from 'react-native-vector-icons/FontAwesome';

const MessageCard = ({chatId}: any) => {
  const [chat, setChat] = useState<any>({});
  const [user, setUser] = useState<any>({});
  const [index, setIndex] = useState<any>(0);
  const {navigate}: any = useNavigation();
  const getChat = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const data = await getDoc(doc(db, 'chat', chatId));
      setChat({...data.data(), id: data.id});
      setIndex(chat.users['0'] === userId ? 0 : 1);
      const userData = await getDoc(
        doc(db, 'user', chat.users[chat.users['0'] === userId ? 1 : 0]),
      );
      setUser({...userData.data(), id: userData.id});
    } catch (error) {}
  };

  useEffect(() => {
    getChat();
  });

  if (user.id == undefined) {
    return null;
  }

  return (
    <TouchableOpacity
      style={tw`flex-row items-center gap-4 mx-4 mt-4`}
      onPress={() => navigate('Chats', {chats: chat, user, index})}>
      {user.id && (
        <Avatar border={false} viewed={false} size={15} src={user.image} />
      )}
      <View style={tw`flex-1 gap-[3px]`}>
        <Text style={tw`text-white font-bold`}>{user.username}</Text>
        <Text style={tw`text-white font-bold`}>
          {user?.chating?.length ? user?.chating?.length : 3} new messages
        </Text>
      </View>
      <Icon style={tw`text-white text-2xl`} name="camera" />
    </TouchableOpacity>
  );
};

export default MessageCard;
