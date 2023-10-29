import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import tw from 'twrnc';

const Audio = () => {
  return (
    <View style={tw`justify-center`}>
      <TouchableOpacity
        style={tw`border-[2px] w-7 h-7 rounded-md border-white bg-black`}
        onPress={() => null}>
        <Icon style={tw`text-gray-400 text-xl`} name="music" />
      </TouchableOpacity>
    </View>
  );
};

export default Audio;
