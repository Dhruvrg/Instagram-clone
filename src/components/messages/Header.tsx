import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const Header = ({username}: any) => {
  const navigation: any = useNavigation();

  return (
    <View style={tw`flex-row px-5 gap-5 py-2`}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon style={tw`text-white text-2xl`} name="arrow-left" />
      </TouchableOpacity>
      <Text
        style={tw`text-white text-2xl font-semibold flex-1 font-serif italic`}>
        {username}
      </Text>
      <TouchableOpacity onPress={() => null}>
        <Icon style={tw`text-white text-2xl`} name="video-camera" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => null}>
        <Icon style={tw`text-white text-2xl`} name="edit" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
