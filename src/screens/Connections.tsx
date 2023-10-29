import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import FollowersCard from '../components/profile/FollowersCard';
import FollowingCard from '../components/profile/FollowingCard';

const Connections = ({route, navigation}: any) => {
  const [search, setSearch] = useState('');
  const {id, username, followers, onwner, following}: any = route.params;
  const [contentType, setContentType] = useState(route.params.contentType);

  return (
    <View style={tw`bg-[#000000] flex-1`}>
      <View style={tw`flex-row py-3`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon style={tw`text-white text-2xl mx-5`} name="arrow-left" />
        </TouchableOpacity>
        <Text style={tw`text-white font-bold text-xl`}>{username}</Text>
      </View>
      <View style={tw`flex-row mt-2`}>
        <TouchableOpacity
          style={tw`w-30 items-center border-b ${
            contentType === 0 ? 'border-white' : 'border-gray-700'
          } py-1`}
          onPress={() => setContentType(0)}>
          <Text
            style={tw`font-bold mb-2 ${
              contentType === 0 ? 'text-white' : 'text-[#808080]'
            }`}>
            {followers.length} followers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`w-30 items-center border-b ${
            contentType === 1 ? 'border-white' : 'border-gray-700'
          } py-1`}
          onPress={() => setContentType(1)}>
          <Text
            style={tw`font-bold mb-2 ${
              contentType === 1 ? 'text-white' : 'text-[#808080]'
            }`}>
            {following.length} following
          </Text>
        </TouchableOpacity>
        {onwner ? (
          <TouchableOpacity
            style={tw`w-30 items-center border-b ${
              contentType === 2 ? 'border-white' : 'border-gray-700'
            } py-1`}
            onPress={() => setContentType(2)}>
            <Text
              style={tw`font-bold mb-2 ${
                contentType === 2 ? 'text-white' : 'text-[#808080]'
              }`}>
              {0} subscription
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={tw`w-30 items-center border-b ${
              contentType === 2 ? 'border-white' : 'border-gray-700'
            } py-1`}
            onPress={() => setContentType(2)}>
            <Text
              style={tw`font-bold mb-2 ${
                contentType === 2 ? 'text-white' : 'text-[#808080]'
              }`}>
              {0} mutual
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={tw`flex-row justify-center my-3`}>
        <Icon
          style={tw`text-[#808080] text-xl absolute z-1 top-1 left-10`}
          name="search"
        />
        <TextInput
          value={search}
          onChangeText={(text: any) => setSearch(text)}
          placeholder="Search"
          placeholderTextColor={'#808080'}
          style={tw`bg-[#1C1C1C] w-85 text-white no-underline h-10 pl-15 font-semibold rounded-lg`}
        />
      </View>
      <View style={tw`mt-[1px]`}>
        {contentType === 0 &&
          followers.map((id: any) => <FollowersCard key={id} id={id} />)}
        {contentType === 1 &&
          following.map((id: any) => <FollowingCard key={id} id={id} />)}
      </View>
    </View>
  );
};

export default Connections;
