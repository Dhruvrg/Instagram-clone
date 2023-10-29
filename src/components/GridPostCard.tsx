import {Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';

const GridPostCard = ({post, id}: any) => {
  const {navigate}: any = useNavigation();
  return (
    <>
      {post.type != undefined ? (
        <TouchableOpacity
          style={tw`m-[1px]`}
          onPress={() => navigate('Explore', {post})}>
          <Image
            style={tw`h-30 w-30`}
            alt="Avatar"
            source={{uri: post?.src[0]}}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={tw`m-[1px]`}
          onPress={() => navigate('Reels', {id})}>
          <Video
            source={{
              uri: post?.src,
            }}
            resizeMode="cover"
            muted={true}
            style={tw`flex-1 w-30 h-30`}
            repeat={true}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default GridPostCard;
