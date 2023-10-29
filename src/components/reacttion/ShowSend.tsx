import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Avatar from '../Avatar';

const ShowSend = ({id}: any) => {
  const [search, setSearch] = useState('');

  return (
    <View
      style={tw`bg-[#1C1C1C] h-125 rounded-t-2xl z-50 absolute bottom-0 w-full`}>
      <View style={tw`items-center border-b-[1px] border-[#4A4A4A] pb-4 gap-2`}>
        <Icon style={tw`text-[#6D6D6D] text-3xl`} name="minus" />
        <Text style={tw`text-white font-semibold`}>Comments</Text>
      </View>
      {/* <SwiperFlatList
        vertical
        data={data}
        renderItem={({item}) => <Text>{item.comment}</Text>}
      /> */}
    </View>
  );
};

export default ShowSend;
