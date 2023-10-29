import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import {db} from '../../config/firebase';
import Avatar from '../Avatar';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FollowingCard = ({id}: any) => {
  const [user, setUser] = useState<any>({username: '', name: '', image: ''});
  const [following, setFollowing] = useState<any>(true);
  const {navigate}: any = useNavigation();

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

  const getUser = async () => {
    try {
      const data = await getDoc(doc(db, 'user', id));
      const {username, image, name}: any = data.data();
      setUser({username, name, image});
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <TouchableOpacity
      style={tw`flex-row gap-5 items-center px-4 py-1.5`}
      onPress={() => navigate('Profile', {id: id})}>
      <Avatar border={false} viewed={false} src={user.image} size={14} />
      <View style={tw`w-25`}>
        <Text numberOfLines={1} style={tw`text-white font-semibold`}>
          {user.username}hhhhhh
        </Text>
        <Text numberOfLines={1} style={tw`text-[#808080]`}>
          {user.name}
        </Text>
      </View>
      <TouchableOpacity
        style={tw`${
          following ? 'bg-[#1C1C1C]' : 'bg-[#0496C7]'
        } w-27 items-center px-5 py-[7px] rounded-lg`}
        onPress={() => handleFollowing()}>
        <Text style={tw`text-white font-semibold`}>
          {following ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => null}>
        <Icon style={tw`text-white text-2xl`} name="ellipsis-v" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default FollowingCard;
