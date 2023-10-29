import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import useShowNavbarContent from '../../hooks/showNavbarContent';

const Header = () => {
  const showNavbarContent = useShowNavbarContent();
  const {navigate}: any = useNavigation();

  return (
    <View style={tw`flex-row px-5 gap-5 py-2`}>
      <Text
        style={tw`text-white text-2xl font-semibold flex-1 font-serif italic`}>
        Instagram
      </Text>
      <TouchableOpacity onPress={() => null}>
        <Icon style={tw`text-white text-2xl`} name="heart-o" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          showNavbarContent.logOut(), navigate('Messages');
        }}>
        <Icon style={tw`text-white text-2xl`} name="wechat" />
        <Text
          style={tw`text-white bg-red-600 w-[16px] text-center font-bold text-[12px] rounded-full absolute -right-2`}>
          4
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
