import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../config/firebase';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';

const PostCard = ({id}: any) => {
  const [post, setPost] = useState<any>({});
  const {navigate}: any = useNavigation();

  const getPost = async () => {
    try {
      const data = await getDoc(doc(db, 'post', id));
      setPost({...data.data(), id: data.id});
    } catch (error) {}
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <TouchableOpacity
      style={tw`m-[1px]`}
      onPress={() => navigate('Posts', {post})}>
      {post.src && (
        <Image
          style={tw`h-30 w-30`}
          alt="Avatar"
          source={{uri: post?.src[0]}}
        />
      )}
    </TouchableOpacity>
  );
};

export default PostCard;
