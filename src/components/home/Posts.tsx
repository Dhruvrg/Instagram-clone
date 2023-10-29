import React, {useEffect, useState} from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import PostCard from '../PostCard';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../config/firebase';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const temp: any = [];
      const data = await getDocs(collection(db, 'post'));
      data.docs.forEach(doc => temp.push({...doc.data(), id: doc.id}));
      temp.sort(() => Math.random() - 0.5);
      setPosts(temp);
    } catch (error) {}
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {posts.length != 0 &&
        posts.map((post: any) => <PostCard post={post} key={post.id} />)}
    </>
  );
};

export default Posts;
