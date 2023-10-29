import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';

const Comment = ({comment}: [string] | any) => {
  return (
    <View style={tw`justify-center items-center`}>
      <Icon style={tw`text-white text-2xl`} name="comment-o" />
      <Text style={tw`text-white text-center text-[12px]`}>
        {comment?.length}
      </Text>
    </View>
  );
};

export default Comment;
