import {TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';

const Camera = () => {
  return (
    <TouchableOpacity
      style={tw`absolute top-4 right-4 z-10`}
      onPress={() => null}>
      <Icon style={tw`text-white text-2xl`} name="camera" />
    </TouchableOpacity>
  );
};

export default Camera;
