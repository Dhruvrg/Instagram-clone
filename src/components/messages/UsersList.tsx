import {View, Text, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../config/firebase';
import Avatar from '../Avatar';
import tw from 'twrnc';

const UsersList = () => {
  const [list, setList] = useState<any>([]);

  const getUsersList = async () => {
    try {
      const temp: any = [];
      const data = await getDocs(collection(db, 'user'));
      data.docs.forEach(doc => temp.push({...doc.data(), id: doc.id}));
      setList(temp);
    } catch (error) {}
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <View>
      <ScrollView style={tw`gap-10 px-5 py-5`} horizontal>
        <View style={tw`w-25 items-center `}>
          <Avatar border={false} viewed={false} size={18} />
          <Text style={tw`text-gray-400 mt-1`}>Your note</Text>
        </View>
        {list.map((user: any) => (
          <View key={user.id} style={tw`w-25 items-center `}>
            <Avatar border={false} viewed={false} size={18} src={user.image} />
            <Text style={tw`text-white mt-1`}>{user.username}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default UsersList;
