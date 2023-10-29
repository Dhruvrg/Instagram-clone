import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {arrayRemove, arrayUnion, doc, updateDoc} from 'firebase/firestore';
import {db} from '../../config/firebase';

const ActionButton = ({id, onwner, list}: any) => {
  const [following, setFollowing] = useState<any>(true);

  const handleFollowing = async () => {
    try {
      setFollowing(!following);
      const userId = await AsyncStorage.getItem('userId');
      if (userId === null) return;
      await updateDoc(doc(db, 'user', userId), {
        following: following ? arrayRemove(id) : arrayUnion(id),
      });
      await updateDoc(doc(db, 'user', id), {
        followers: following ? arrayRemove(userId) : arrayUnion(userId),
      });
    } catch (error) {}
  };

  useEffect(() => {
    const checkFollow = async () => {
      const userId = await AsyncStorage.getItem('userId');
      setFollowing(list.some((ele: string) => ele === userId));
    };
    checkFollow();
  }, [id]);

  return (
    <View style={tw`flex-row gap-2 mt-3`}>
      {onwner ? (
        <TouchableOpacity
          style={tw`bg-[#3D3D3D] w-35 rounded-md py-1.5`}
          onPress={() => null}>
          <Text style={tw`text-white font-semibold text-center`}>
            Edit profile
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={tw`${
            following ? 'bg-[#3D3D3D]' : 'bg-[#0496C7]'
          } w-35 rounded-md py-1.5`}
          onPress={() => handleFollowing()}>
          <Text style={tw`text-white font-semibold text-center`}>
            {following ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      )}
      {onwner ? (
        <TouchableOpacity
          style={tw`bg-[#3D3D3D] w-35 rounded-md py-1.5`}
          onPress={() => null}>
          <Text style={tw`text-white font-semibold text-center`}>
            Share profile
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={tw`bg-[#3D3D3D] w-35 rounded-md py-1.5`}
          onPress={() => null}>
          <Text style={tw`text-white font-semibold text-center`}>Message</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={tw`bg-[#3D3D3D] rounded-md px-1`}
        onPress={() => null}>
        <Icon style={tw`text-white text-lg`} name="user-plus" />
      </TouchableOpacity>
    </View>
  );
};

export default ActionButton;
