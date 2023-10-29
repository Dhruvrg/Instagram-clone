import {View, ScrollView} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Header from '../components/home/Header';
import Stories from '../components/home/Stories';
import Posts from '../components/home/Posts';
import useShowNavbarContent from '../hooks/showNavbarContent';

const Home = () => {
  const showNavbarContent = useShowNavbarContent();

  return (
    <View style={tw`bg-[#000000] flex-1`}>
      <Header />
      <ScrollView scrollEnabled={showNavbarContent.isLogin}>
        <Stories />
        <Posts />
      </ScrollView>
    </View>
  );
};

export default Home;
