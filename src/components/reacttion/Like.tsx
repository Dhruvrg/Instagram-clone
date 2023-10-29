import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import {arrayRemove, arrayUnion, doc, updateDoc} from 'firebase/firestore';
import {db} from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Like = ({like, type, id}: any) => {
  const [isLike, setIsLike] = useState(false);

  const handleLike = async () => {
    try {
      setIsLike(!isLike);
      const userId = await AsyncStorage.getItem('userId');
      if (userId === null) return;
      await updateDoc(doc(db, type, id), {
        like: isLike ? arrayRemove(userId) : arrayUnion(userId),
      });
      await updateDoc(doc(db, 'user', userId), {
        liked: isLike ? arrayRemove(userId) : arrayUnion(id),
      });
    } catch (error) {}
  };

  useEffect(() => {
    const checkLike = async () => {
      const userId = await AsyncStorage.getItem('userId');
      setIsLike(like.some((ele: string) => ele === userId));
    };
    checkLike();
  }, []);

  return (
    <View style={tw`items-center`}>
      <TouchableOpacity onPress={() => handleLike()}>
        {isLike ? (
          <Icon style={tw`text-red-500 text-2xl`} name="heart" />
        ) : (
          <Icon style={tw`text-white text-2xl`} name="heart-o" />
        )}
      </TouchableOpacity>
      {type == 'reel' && (
        <Text style={tw`text-white text-[12px]`}>{like.length + isLike}</Text>
      )}
    </View>
  );
};

export default Like;
