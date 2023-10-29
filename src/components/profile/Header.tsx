import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({username}: any) => {
  return (
    <View style={tw`flex-row px-5 gap-5 py-2 ease-linear`}>
      <Text style={tw`text-white text-2xl font-bold flex-1`}>{username}</Text>
      <TouchableOpacity onPress={() => null}>
        <Icon style={tw`text-white text-2xl`} name="plus-square-o" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => null}>
        <Icon style={tw`text-white text-2xl`} name="bars" />
        <Text
          style={tw`text-white bg-red-600 w-[16px] text-center font-bold text-[12px] rounded-full absolute -right-2`}>
          3
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
