import {Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import LinearGradient from 'react-native-linear-gradient';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AvatarProps {
  size: number | undefined;
  src: undefined | null;
  border: boolean;
  viewed: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  size = 7,
  src = null,
  border = false,
  viewed = false,
}) => {
  const getCreatorDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId == null) return false;
      const data = await getDoc(doc(db, 'user', userId));
      const {image}: any = data.data();
      src = image;
    } catch (error) {}
  };

  useEffect(() => {}, []);

  return (
    <>
      {border ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={tw`w-${size + 3} h-${
            size + 3
          } rounded-full items-center justify-center`}
          colors={
            viewed
              ? ['#2a2a2a', '#2a2a2a']
              : ['#feda75', '#fa7e1e', '#d62976', '#962fbf']
          }>
          <View style={tw`border-[4px] border-black rounded-full`}>
            {src == null ? (
              <Icon
                style={tw`text-[#FFFFFF] text-${size}`}
                name="user-circle-o"
              />
            ) : (
              <Image
                style={tw`h-${size} w-${size} rounded-full`}
                alt="Avatar"
                source={{uri: src}}
              />
            )}
          </View>
        </LinearGradient>
      ) : (
        <View style={tw`rounded-full`}>
          {src == null ? (
            <Icon
              style={tw`text-[#FFFFFF] text-${size}`}
              name="user-circle-o"
            />
          ) : (
            <Image
              style={tw`h-${size} w-${size} rounded-full`}
              alt="Avatar"
              source={{uri: src}}
            />
          )}
        </View>
      )}
    </>
  );
};

export default Avatar;
