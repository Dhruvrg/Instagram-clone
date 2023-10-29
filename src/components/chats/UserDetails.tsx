import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Avatar from '../Avatar';
import {useNavigation} from '@react-navigation/native';

const UserDetails = ({user}: any) => {
  const {navigate}: any = useNavigation();

  return (
    <View style={tw`items-center py-5`}>
      <Avatar border={false} viewed={false} size={30} src={user.image} />
      <Text style={tw`text-white font-bold text-lg mt-2`}>{user.name}</Text>
      <Text style={tw`text-white text-lg font-light`}>
        Instagram • {user.username}
      </Text>
      <Text style={tw`text-[#808080] text-lg font-light`}>
        {user.followers.length} followers • {user.post.length} posts
      </Text>
      <TouchableOpacity
        style={tw`bg-[#1C1C1C] px-3 py-2 rounded-lg mt-3`}
        onPress={() => navigate('Profile', {id: user.id})}>
        <Text style={tw`text-white font-bold`}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserDetails;
