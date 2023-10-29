import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';

const MoreOptions = () => {
  const [options, setOptions] = useState(false);

  return (
    <View style={tw`items-center`}>
      <TouchableOpacity onPress={() => setOptions(!options)}>
        <Icon style={tw`text-white text-2xl`} name="ellipsis-v" />
      </TouchableOpacity>
    </View>
  );
};

export default MoreOptions;
