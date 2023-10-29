import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {db} from '../config/firebase';
import GridPostCard from '../components/GridPostCard';
import SearchCard from '../components/search/SearchCard';
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const Search = () => {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const getPosts = async () => {
    try {
      const temp: any = [];
      const posts = await getDocs(collection(db, 'post'));
      const reels = await getDocs(collection(db, 'reel'));
      posts.docs.forEach(doc => temp.push({data: doc.data(), id: doc.id}));
      reels.docs.forEach(doc => temp.push({data: doc.data(), id: doc.id}));
      temp.sort(() => Math.random() - 0.5);
      setData(temp);
    } catch (error) {}
  };

  const getUsersList = async () => {
    try {
      const temp: any = [];
      const q = query(
        collection(db, 'user'),
        where('username', '>=', search),
        where('username', '<=', search + '\uf8ff'),
      );
      const data = await getDocs(q);
      data.docs.forEach(doc => temp.push({...doc.data(), id: doc.id}));
      setList(temp);
    } catch (error) {}
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    getUsersList();
    setActive(true);
  }, [search]);

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-[#000000]`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity
        style={tw`mx-5 flex-row py-2`}
        onPress={() => setActive(false)}>
        {active && (
          <Pressable style={tw`mr-4`} onPress={() => setActive(true)}>
            <Icon style={tw`text-white text-2xl`} name="arrow-left" />
          </Pressable>
        )}
        <Icon
          style={tw`text-[#FFFFFF] text-xl absolute z-1 top-3 ${
            active ? 'left-12' : 'left-5'
          }`}
          name="search"
        />
        <TextInput
          value={search}
          onChangeText={(text: any) => setSearch(text)}
          placeholder="Search"
          placeholderTextColor={'#808080'}
          style={tw`bg-[#1C1C1C] flex-1 text-white no-underline font-semibold ${
            active ? 'pl-12' : 'pl-14'
          } pr-5 py-1 rounded-lg`}
        />
      </TouchableOpacity>
      {active ? (
        <ScrollView>
          {list.map((user: any) => (
            <SearchCard key={user.id} user={user} />
          ))}
        </ScrollView>
      ) : (
        <FlatList
          numColumns={3}
          data={data}
          keyExtractor={(item: any) => item.id}
          renderItem={({item}: any) => (
            <GridPostCard id={item.id} post={item.data} />
          )}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default Search;
