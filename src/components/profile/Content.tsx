import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import PostCard from './PostCard';
import ReelCard from './ReelCard';

const Content = ({data, id}: any) => {
  const {post, reel, tagged} = data;
  const [contentType, setContentType] = useState(0);
  return (
    <View>
      <View style={tw`flex-row mt-5`}>
        <TouchableOpacity
          style={tw`w-30 items-center border-b ${
            contentType === 0 ? 'border-white' : 'border-gray-700'
          } py-1`}
          onPress={() => setContentType(0)}>
          <Icon style={tw`text-white text-2xl`} name="table" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`w-30 items-center border-b ${
            contentType === 1 ? 'border-white' : 'border-gray-700'
          } py-1`}
          onPress={() => setContentType(1)}>
          <Icon style={tw`text-white text-2xl`} name="caret-square-o-right" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`w-30 items-center border-b ${
            contentType === 2 ? 'border-white' : 'border-gray-700'
          } py-1`}
          onPress={() => setContentType(2)}>
          <Icon style={tw`text-white text-2xl`} name="address-book-o" />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row mt-[1px]`}>
        {contentType === 0 &&
          post.map((id: any) => <PostCard key={id} id={id} />)}
        {contentType === 1 &&
          reel.map((id: any) => <ReelCard key={id} id={id} />)}
        {contentType === 2 &&
          tagged.map((id: any) => <PostCard key={id} id={id} />)}
      </View>
    </View>
  );
};

export default Content;
