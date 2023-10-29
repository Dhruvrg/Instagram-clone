import React from 'react';
import tw from 'twrnc';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '../routes/AppStack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Avatar from './Avatar';

const Navbar = () => {
  const {navigate}: any = useNavigation<AppStackParamList>();

  return (
    <View
      style={[
        tw`bg-[#000000] border-t border-gray-900 flex-row justify-between h-[50px] px-7 py-[7px]`,
      ]}>
      <TouchableOpacity onPress={() => navigate('Home')}>
        <Icon style={tw`text-[#FFFFFF] text-3xl`} name="home" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('Search')}>
        <Icon style={tw`text-[#FFFFFF] text-2xl`} name="search" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('Create')}>
        <Icon style={tw`text-[#FFFFFF] text-2xl`} name="plus-square" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('Reels', {id: 'new'})}>
        <Icon style={tw`text-[#FFFFFF] text-2xl`} name="caret-square-o-right" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('Profile', {id: 'onwner'})}>
        <Avatar border={false} viewed={false} size={7} />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
