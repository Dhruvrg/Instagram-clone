import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Avatar from '../Avatar';

const Header = ({user}: any) => {
  const navigation: any = useNavigation();

  return (
    <View style={tw`flex-row px-4 gap-4 items-center py-3`}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon style={tw`text-white text-2xl`} name="arrow-left" />
      </TouchableOpacity>
      <Avatar border={false} viewed={false} size={9} src={user.image} />
      <View style={tw`flex-1`}>
        <Text style={tw`text-white`}>{user.name}</Text>
        <Text style={tw`text-[#808080]`}>{user.username}</Text>
      </View>
      <Icon style={tw`text-white text-2xl`} name="phone" />
      <Icon style={tw`text-white text-2xl`} name="video-camera" />
    </View>
  );
};

export default Header;
