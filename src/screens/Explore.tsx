import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../config/firebase';
import tw from 'twrnc';
import PostCard from '../components/PostCard';
import Icon from 'react-native-vector-icons/FontAwesome';

const Explore = ({route, navigation}: any) => {
  const {post}: any = route.params;
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const getPosts = async () => {
  //     try {
  //       const temp: any = [];
  //       const data = await getDocs(collection(db, 'post'));
  //       data.docs.forEach(doc => temp.push({data: doc.data(), id: doc.id}));
  //       temp.sort(() => Math.random() - 0.5);
  //       temp.sort((x: any, y: any) => (x.id == id ? -1 : y.id == id ? 1 : 0));
  //       setPosts(temp);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getPosts();
  // }, [id]);

  return (
    <View style={tw`bg-[#000000] flex-1`}>
      <View style={tw`flex-row py-3`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon style={tw`text-white text-2xl mx-5`} name="arrow-left" />
        </TouchableOpacity>
        <Text style={tw`text-white font-bold text-xl`}>Explore</Text>
      </View>
      <PostCard post={post} />
    </View>
  );
};

export default Explore;
