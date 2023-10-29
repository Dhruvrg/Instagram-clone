import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import PostCard from '../components/PostCard';

const Posts = ({route, navigation}: any) => {
  const {post}: any = route.params;

  return (
    <View style={tw`bg-[#000000] flex-1`}>
      <View style={tw`flex-row py-3`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon style={tw`text-white text-2xl mx-5`} name="arrow-left" />
        </TouchableOpacity>
        <Text style={tw`text-white font-bold text-xl`}>Posts</Text>
      </View>
      <ScrollView>
        <PostCard post={post} />
      </ScrollView>
    </View>
  );
};

export default Posts;
