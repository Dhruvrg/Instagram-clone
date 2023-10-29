import {Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Avatar from '../Avatar';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';

const StoryCard = ({user}: any) => {
  const [viewed, setViewed] = useState(false);
  const {navigate}: any = useNavigation();

  return (
    <TouchableOpacity
      style={tw`items-center mr-3`}
      onPress={() => {
        navigate('Story', {user}), setViewed(true);
      }}>
      <Avatar border={true} viewed={viewed} size={18} src={user.image} />
      <Text style={tw`text-white absolute bottom-0`}>{user.username}</Text>
    </TouchableOpacity>
  );
};

export default StoryCard;
