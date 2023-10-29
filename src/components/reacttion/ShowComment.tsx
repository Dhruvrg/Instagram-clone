import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Avatar from '../Avatar';
import CommentCard from './CommentCard';
import {useKeyboard} from '@react-native-community/hooks';
import {db} from '../../config/firebase';
import {doc, updateDoc} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShowComment = ({comment, reaction, user, id, type}: any) => {
  const [text, setText] = useState('');
  const keyboardHeight: number = useKeyboard().keyboardHeight;
  const height =
    type == 'post'
      ? Dimensions.get('window').height - keyboardHeight - 100
      : 500;
  const emoji = ['❤️', '🙌', '🔥', '👏', '😢', '😍', '😮', '😂'];

  const handleComment = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      comment.push(text);
      reaction.push(0);
      user.push(userId);
      await updateDoc(doc(db, type, id), {
        comment: comment,
        reaction: reaction,
        user: user,
      });
      setText('');
    } catch (error) {}
  };

  return (
    <View
      style={tw`bg-[#1C1C1C] h-[${height}px] rounded-t-2xl z-50 absolute bottom-0 w-full`}>
      <View
        style={tw`items-center border-b-[1px] border-[#4A4A4A] pb-4 gap-2 mb-2`}>
        <Icon style={tw`text-[#6D6D6D] text-3xl`} name="minus" />
        <Text style={tw`text-white font-semibold`}>Comments</Text>
      </View>
      <SwiperFlatList
        style={tw`h-100`}
        vertical
        data={comment}
        renderItem={({index}) => (
          <CommentCard
            type={type}
            id={id}
            index={index}
            comment={comment[index]}
            userId={user[index]}
            reaction={reaction}
          />
        )}
      />
      <View
        style={tw`items-center absolute bottom-[${
          type == 'reel' && useKeyboard().keyboardShown ? keyboardHeight : 0
        }px] bg-[#1C1C1C]`}>
        <SwiperFlatList
          data={emoji}
          style={tw`py-1.5`}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => setText(text + emoji[index])}>
              <Text style={tw`text-2xl mx-1.5`}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <View style={tw`flex-row items-center px-5`}>
          <Avatar border={false} viewed={false} src={null} size={9} />
          <TextInput
            value={text}
            onChangeText={text => setText(text)}
            placeholder="Add a comment for shobhitnirwan..."
            placeholderTextColor={'#808080'}
            style={tw`text-white px-4`}
          />
          {text == '' ? (
            <Text
              style={tw`text-white border-2 pt-[1px] text-sm text-center font-semibold border-white rounded-md`}>
              GIF
            </Text>
          ) : (
            <TouchableOpacity onPress={() => handleComment()}>
              <Text style={tw`text-[#1773fe]`}>Post</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ShowComment;
