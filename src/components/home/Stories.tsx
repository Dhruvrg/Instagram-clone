import {Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import Avatar from '../Avatar';
import StoryCard from './StoryCard';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../config/firebase';

const Stories = () => {
  const [users, setUsers] = useState([]);

  const getStories = async () => {
    try {
      let temp: any = [];
      const data = await getDocs(collection(db, 'user'));
      data.docs.forEach(doc => temp.push({...doc.data(), id: doc.id}));
      temp.sort(() => Math.random() - 0.5);
      temp = temp.filter((user: any) => user.story.src.length != 0);
      setUsers(temp);
    } catch (error) {}
  };
  //new Date(user.story.date) > new Date()
  useEffect(() => {
    getStories();
  }, []);

  return (
    <ScrollView
      horizontal
      style={tw`flex-row pb-3 pt-4 border-b-[1px] border-[#4A4A4A]`}>
      <TouchableOpacity style={tw`items-center ml-5 mr-3`} onPress={() => null}>
        <Avatar border={false} viewed={false} size={20} />
        <Text
          style={tw`text-white bg-[#1773fe] border-black border-2 w-5 h-5 text-center text-[15px] rounded-full relative left-5 bottom-5`}>
          +
        </Text>
        <Text style={tw`text-white absolute bottom-0`}>Your story</Text>
      </TouchableOpacity>
      {users &&
        users.map((user: any) => <StoryCard key={user.id} user={user} />)}
    </ScrollView>
  );
};

export default Stories;
