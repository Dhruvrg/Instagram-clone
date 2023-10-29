import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import tw from 'twrnc';

const Loading = () => {
  return (
    <View style={tw`flex-1 bg-[#000000] justify-center items-center`}>
      <ActivityIndicator size="large" color="#DD2A7B" />
      <Text>Loading...</Text>
    </View>
  );
};

export default Loading;
