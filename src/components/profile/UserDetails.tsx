import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Avatar from '../Avatar';
import {useNavigation} from '@react-navigation/native';

const UserDetails = ({user, onwner}: any) => {
  const {bio, image, following, followers, post, story, name, id, username} =
    user;
  const {navigate}: any = useNavigation();

  return (
    <View style={tw`mt-5 -ml-1`}>
      <View style={tw`flex-row gap-5 items-center`}>
        <Avatar border={false} viewed={false} size={20} src={image} />
        <TouchableOpacity style={tw`items-center ml-5`} onPress={() => null}>
          <Text style={tw`text-white font-semibold text-lg`}>
            {post.length}
          </Text>
          <Text style={tw`text-white`}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`items-center`}
          onPress={() =>
            navigate('Connections', {
              contentType: 0,
              id,
              username,
              followers,
              onwner,
              following,
            })
          }>
          <Text style={tw`text-white font-semibold text-lg`}>
            {followers.length}
          </Text>
          <Text style={tw`text-white`}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`items-center`}
          onPress={() =>
            navigate('Connections', {
              contentType: 1,
              id,
              username,
              followers,
              onwner,
              following,
            })
          }>
          <Text style={tw`text-white font-semibold text-lg`}>
            {following.length}
          </Text>
          <Text style={tw`text-white`}>Following</Text>
        </TouchableOpacity>
      </View>
      <Text style={tw`text-white font-semibold text-lg`}>{name}</Text>
      <Text style={tw`text-white`}>{bio}</Text>
    </View>
  );
};

export default UserDetails;
