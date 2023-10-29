import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';

const Send = ({share}: any) => {
  const [send, setSend] = useState(false);

  return (
    <View style={tw`justify-center`}>
      <TouchableOpacity onPress={() => setSend(!share)}>
        <Icon style={tw`text-white text-2xl`} name="send-o" />
      </TouchableOpacity>
      <Text style={tw`text-white text-center text-[12px]`}>{share}</Text>
    </View>
  );
};

export default Send;
