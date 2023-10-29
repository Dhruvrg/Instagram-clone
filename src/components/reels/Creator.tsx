import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../config/firebase';
import Avatar from '../Avatar';
import {useNavigation} from '@react-navigation/native';

const Creator = ({userId}: any) => {
  const [follow, setFollow] = useState(false);
  const [user, setUser] = useState<any>({});
  const {navigate}: any = useNavigation();

  const getCreatorDetails = async () => {
    try {
      const data = await getDoc(doc(db, 'user', userId));
      setUser(data.data());
    } catch (error) {}
  };

  useEffect(() => {
    getCreatorDetails();
  }, []);

  return (
    <View style={tw`flex-row gap-3 items-center`}>
      <TouchableOpacity onPress={() => null}>
        <Avatar border={false} viewed={false} size={7} src={user.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('Profile', {id: userId})}>
        <Text style={tw`text-white font-bold`}>{user.username}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`border-white border rounded-lg px-[15px] py-[4px]`}
        onPress={() => setFollow(!follow)}>
        <Text style={tw`text-white`}>{follow ? 'Following' : 'Follow'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Creator;
