import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import Header from '../components/chats/Header';
import UserDetails from '../components/chats/UserDetails';
import Avatar from '../components/Avatar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '../config/firebase';

const Chats = ({route}: any) => {
  const {chats, user, index}: any = route.params;
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState(chats);

  const updateChat = async () => {
    chat.chating.push(message);
    chat.idx += index;
    chat.time.push(new Date().getTime());
    try {
      await updateDoc(doc(db, 'chat', chat.id), {
        chating: chat.chating,
        idx: chat.idx,
        time: chat.time,
        users: chat.users,
      });
    } catch (error) {}
    setMessage('');
  };

  const startChat = () => {};

  return (
    <View style={tw`bg-[#000000] flex-1`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header user={user} />
        <UserDetails user={user} />
        <View>
          {chat.chating.length != 0 &&
            chat?.chating?.map((msg: any, idx: any) =>
              chat.idx[idx] != index ? (
                <View key={idx} style={tw`flex-row my-1 mx-4 gap-2 items-end`}>
                  <Avatar
                    border={false}
                    viewed={false}
                    size={7}
                    src={user.image}
                  />
                  <Text
                    style={tw`text-white font-semibold bg-[#1C1C1C] rounded-2xl py-2 px-3 max-w-60 self-start`}>
                    {msg}
                  </Text>
                </View>
              ) : (
                <Text
                  key={idx}
                  style={tw`text-white bg-[#405DE6] font-semibold rounded-2xl py-2 px-3 my-1 mx-4 max-w-60 self-end`}>
                  {msg}
                </Text>
              ),
            )}
        </View>
      </ScrollView>
      <View style={tw`mb-2 flex-row`}>
        <Icon
          style={tw`text-white text-2xl bg-[#405DE6] self-start absolute z-10 top-1 left-4 py-1 px-2 rounded-full`}
          name="camera"
        />
        <TextInput
          placeholder="Message..."
          placeholderTextColor={'#555555'}
          style={tw`bg-[#1C1C1C] rounded-3xl mx-2.5 flex-1 pl-14 pr-35`}
          value={message}
          onChangeText={text => setMessage(text)}
        />
        {message.length == 0 ? (
          <View style={tw`flex-row absolute z-10 right-6 top-2 gap-5`}>
            <Icon style={tw`text-white text-2xl`} name="microphone" />
            <Icon style={tw`text-white text-2xl`} name="photo" />
            <Icon style={tw`text-white text-2xl`} name="gift" />
          </View>
        ) : (
          <TouchableOpacity
            style={tw`absolute z-10 right-6 top-2`}
            onPress={() =>
              message.length != 0
                ? chat.chating.length != 0
                  ? updateChat()
                  : startChat()
                : null
            }>
            <Text style={tw`text-[#405DE6] font-bold text-lg`}>Send</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Chats;
