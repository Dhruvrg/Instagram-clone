import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../routes/AppStack';
import useShowNavbarContent from '../hooks/showNavbarContent';

type CreateProps = NativeStackScreenProps<AppStackParamList, 'Create'>;

const Create = ({navigation}: CreateProps) => {
  const [type, setType] = useState('POST');
  const [fileType, setFileType] = useState<'photo' | 'video'>('photo');
  const showNavbarContent = useShowNavbarContent();

  useEffect(() => {
    showNavbarContent.logIn();
  }, []);

  const openGallery = async () => {
    await launchImageLibrary(
      {
        mediaType: fileType,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      response =>
        !response.didCancel &&
        !response.errorCode &&
        navigation.navigate('EditFile', {
          response: response,
          createType: type,
          fileType: fileType,
        }),
    );
  };

  const openCamera = async () => {
    await launchCamera(
      {
        mediaType: fileType,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      response =>
        !response.didCancel &&
        !response.errorCode &&
        navigation.navigate('EditFile', {
          response: response,
          createType: type,
          fileType: fileType,
        }),
    );
  };

  return (
    <View style={tw`bg-[#000000] flex-1`}>
      <View style={tw`flex-row items-center py-1`}>
        <Icon style={tw`text-[#FFFFFF] text-4xl mx-5`} name="close" />
        <Text style={tw`text-[#FFFFFF] font-bold text-xl mx-5`}>
          New {type.toUpperCase()}
        </Text>
        <Text style={tw`absolute right-5 text-blue-600 font-bold text-lg`}>
          Next
        </Text>
      </View>
      <View style={tw`flex-1 justify-center items-center gap-5`}>
        <TouchableOpacity
          onPress={() => openCamera()}
          style={tw`flex-row justify-center items-center gap-2 bg-pink-500 rounded-lg py-1 w-35`}>
          <Text style={tw`text-black font-semibold text-2xl`}>Camera</Text>
          <Icon style={tw`text-black text-3xl`} name="camera" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openGallery()}
          style={tw`flex-row justify-center items-center gap-2 bg-pink-500 rounded-lg py-1 w-35`}>
          <Text style={tw`text-black font-semibold text-2xl`}>Gallery</Text>
          <Icon style={tw`text-black text-3xl`} name="folder-open" />
        </TouchableOpacity>
        <View style={tw`flex-row w-35 justify-evenly`}>
          <TouchableOpacity
            onPress={() => setFileType('photo')}
            style={tw`bg-gray-700 rounded-lg px-2 py-[1px]`}>
            <Icon
              style={tw`${
                fileType == 'photo' ? 'text-4xl text-white' : 'text-3xl'
              }`}
              name="photo"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFileType('video')}
            style={tw`bg-gray-700 rounded-lg px-2 py-[1px]`}>
            <Icon
              style={tw`${
                fileType == 'video' ? 'text-4xl text-white' : 'text-3xl'
              }`}
              name="video-camera"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={tw`flex-row bg-gray-900 border-[1px] border-gray-800 mb-5 py-[5px] rounded-3xl justify-evenly mx-10`}>
        <TouchableOpacity onPress={() => setType('post')}>
          <Text style={tw`text-white font-semibold text-lg`}>POST</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setType('story')}>
          <Text style={tw`text-white font-semibold text-lg`}>STORY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setType('reel')}>
          <Text style={tw`text-white font-semibold text-lg`}>REEL</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setType('live')}>
          <Text style={tw`text-white font-semibold text-lg`}>LIVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Create;
