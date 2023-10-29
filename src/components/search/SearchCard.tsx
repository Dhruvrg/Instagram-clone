import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Avatar from '../Avatar';
import {useNavigation} from '@react-navigation/native';

const SearchCard = ({user}: any) => {
  const {id, name, username, image} = user;
  const {navigate}: any = useNavigation();

  return (
    <TouchableOpacity
      style={tw`flex-row gap-5 items-center px-5 py-2`}
      onPress={() => navigate('Profile', {id: id})}>
      <Avatar border={false} viewed={false} src={image} size={14} />
      <View style={tw`w-35`}>
        <Text numberOfLines={1} style={tw`text-white font-semibold`}>
          {username}
        </Text>
        <Text numberOfLines={1} style={tw`text-[#808080]`}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchCard;
