import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../routes/AppStack';
import tw from 'twrnc';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {db} from '../config/firebase';
import useCreateContent from '../hooks/showNavbarContent';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FileDetailProps = NativeStackScreenProps<AppStackParamList, 'FileDetail'>;

const FileDetail = ({route, navigation}: FileDetailProps) => {
  const {src, fileType, createType}: any = route.params;
  const [caption, setCaption] = useState('');
  const createContent = useCreateContent();

  const handleCreate = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId === null) return;
      if (createType === 'reel') {
        if (fileType !== 'video') {
          return;
        }
        const {id} = await addDoc(collection(db, 'reel'), {
          caption: caption,
          comment: [],
          like: [],
          reaction: [],
          src: src,
          user: [],
          userId: userId,
          share: 0,
        });
        await updateDoc(doc(db, 'user', userId), {
          reel: arrayUnion(id),
        });
      }
      if (createType === 'post') {
        if (fileType !== 'photo') {
          return;
        }
        const {id} = await addDoc(collection(db, 'post'), {
          comment: [],
          like: [],
          reaction: [],
          src: src,
          type: [fileType],
          user: [],
          userId: userId,
        });
        await updateDoc(doc(db, 'user', userId), {
          post: arrayUnion(id),
        });
      }
      createContent.logIn();
      navigation.navigate('Home');
    } catch (error) {}
  };

  return (
    <View style={tw`bg-[#000000] flex-1`}>
      <View style={tw`flex-row mt-4`}>
        <Pressable style={tw``} onPress={() => navigation.goBack()}>
          <Icon style={tw`text-white text-xl ml-5`} name="arrow-left" />
        </Pressable>
        <Text style={tw`text-white font-bold text-xl ml-5`}>New post</Text>
      </View>
      <View style={tw`justify-center items-center h-70 my-5`}>
        {fileType == 'video' ? (
          <Video
            source={{
              uri: src,
            }}
            resizeMode="cover"
            muted={true}
            style={tw`flex-1 w-40 rounded-3xl`}
            repeat={true}
          />
        ) : (
          <Image
            style={tw`flex-1 w-40 rounded-3xl`}
            alt="Avatar"
            source={{uri: src}}
          />
        )}
      </View>
      <TextInput
        value={caption}
        onChangeText={text => setCaption(text)}
        placeholder="Write a caption..."
        placeholderTextColor={'#808080'}
        style={tw`text-white no-underline border-b-[1px] border-gray-800 pb-8 px-5`}
      />
      <Text style={tw`border-b-[1px] border-gray-800 p-3`}>
        Your reel will be shared with your followers in their feeds and can be
        seen on your profile. It may also appear in places like Reels, where
        anyone can see it.
      </Text>
      <TouchableOpacity onPress={() => null} style={tw`flex-row gap-3 p-3`}>
        <Icon style={tw`text-white text-2xl`} name="address-book" />
        <Text style={tw`text-white text-lg flex-1`}>
          Tag people or add collaborators
        </Text>
        <Icon style={tw`text-white text-2xl`} name="chevron-right" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => null}
        style={tw`flex-row border-b-[1px] border-gray-800 gap-3 px-3 pb-3`}>
        <Icon style={tw`text-white text-2xl`} name="facebook-square" />
        <Text style={tw`text-white text-lg flex-1`}>Recommend on Facebook</Text>
        <Icon style={tw`text-white text-2xl`} name="chevron-right" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => null}
        style={tw`flex-row border-b-[1px] border-gray-800 gap-3 p-3`}>
        <Icon style={tw`text-white text-2xl`} name="gear" />
        <Text style={tw`text-white text-lg flex-1`}>Advanced settings</Text>
        <Icon style={tw`text-white text-2xl`} name="chevron-right" />
      </TouchableOpacity>
      <View style={tw`flex-row justify-evenly mt-4`}>
        <TouchableOpacity
          onPress={() => null}
          style={tw`w-35 py-2 items-center border-[1px] border-gray-800 rounded-lg`}>
          <Text style={tw`text-white text-lg`}>Save draft</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCreate()}
          style={tw`w-35 py-2 items-center bg-[#2897e5] border-[1px] border-gray-800 rounded-lg`}>
          <Text style={tw`text-white text-lg`}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FileDetail;
