import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../config/firebase';
import Avatar from '../Avatar';
import {useNavigation} from '@react-navigation/native';

const FollowersCard = ({id}: any) => {
  const [user, setUser] = useState<any>({username: '', name: '', image: ''});
  const {navigate}: any = useNavigation();

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
      style={tw`flex-row gap-5 items-center px-5 py-1.5`}
      onPress={() => navigate('Profile', {id: id})}>
      <Avatar border={false} viewed={false} src={user.image} size={14} />
      <View style={tw`w-35`}>
        <Text numberOfLines={1} style={tw`text-white font-semibold`}>
          {user.username}
        </Text>
        <Text numberOfLines={1} style={tw`text-[#808080]`}>
          {user.name}
        </Text>
      </View>
      <TouchableOpacity
        style={tw`bg-[#1C1C1C] px-5 py-[7px] rounded-lg`}
        onPress={() => null}>
        <Text style={tw`text-white font-semibold`}>Remove</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default FollowersCard;
