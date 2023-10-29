import {View, Text, Pressable, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../routes/AppStack';
import Video from 'react-native-video';
import ShowMuteIcon from '../components/reels/ShowMuteIcon';
import Icon from 'react-native-vector-icons/FontAwesome';
import useCreateContent from '../hooks/showNavbarContent';
import Loading from '../components/Loading';

type EditFileProps = NativeStackScreenProps<AppStackParamList, 'EditFile'>;

const EditFile = ({route, navigation}: EditFileProps) => {
  const createContent = useCreateContent();
  const {response, createType, fileType}: any = route.params;
  const [muted, setMuted] = useState(false);
  const [showMute, setShowMute] = useState(false);
  const [src, setSrc] = useState('');

  const cloudinaryUpload = async () => {
    const uri = response.assets && response.assets[0].uri;
    const type = response.assets && response.assets[0].type;
    const name = response.assets && response.assets[0].fileName;
    const source = {
      uri,
      type,
      name,
    };

    const data = new FormData();
    data.append('file', source);
    data.append('upload_preset', 'qy95kv3s');
    data.append('cloud_name', 'dschxieoo');

    fetch(
      `https://api.cloudinary.com/v1_1/dschxieoo/${
        fileType == 'photo' ? 'image' : 'video'
      }/upload`,
      {
        method: 'post',
        body: data,
      },
    )
      .then(res => res.json())
      .then(data => {
        setSrc(data.secure_url);
      })
      .catch(err => {});
  };

  useEffect(() => {
    cloudinaryUpload();
    createContent.logOut();
  }, []);

  const handleMute = () => {
    setMuted(!muted);
    setShowMute(true);
    setTimeout(() => {
      setShowMute(false);
    }, 2000);
  };

  return (
    <View style={tw`bg-[#000000] flex-1`}>
      <View style={tw`flex-row gap-2 px-5 absolute z-10 py-5`}>
        <TouchableOpacity
          onPress={() => null}
          style={tw`justify-center items-center bg-[#000000] bg-opacity-75 w-10 h-10 rounded-full mr-10`}>
          <Icon style={tw`text-[#FFFFFF] text-2xl`} name="close" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => null}
          style={tw`justify-center items-center bg-[#000000] bg-opacity-75 w-10 h-10 rounded-full`}>
          <Icon style={tw`text-[#FFFFFF] text-2xl`} name="music" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => null}
          style={tw`justify-center items-center bg-[#000000] bg-opacity-75 w-10 h-10 rounded-full`}>
          <Text style={tw`text-[#FFFFFF] text-2xl`}>Aa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => null}
          style={tw`justify-center items-center bg-[#000000] bg-opacity-75 w-10 h-10 rounded-full`}>
          <Icon style={tw`text-[#FFFFFF] text-2xl`} name="gift" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => null}
          style={tw`justify-center items-center bg-[#000000] bg-opacity-75 w-10 h-10 rounded-full`}>
          <Icon style={tw`text-[#FFFFFF] text-2xl`} name="star" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => null}
          style={tw`justify-center items-center bg-[#000000] bg-opacity-75 w-10 h-10 rounded-full`}>
          <Icon style={tw`text-[#FFFFFF] text-2xl`} name="download" />
        </TouchableOpacity>
      </View>
      <Pressable
        onPress={() => handleMute()}
        style={tw`flex-1 justify-center items-center`}>
        <ShowMuteIcon showMute={showMute} muted={muted} />
        {src !== '' ? (
          fileType == 'video' ? (
            <Video
              source={{
                uri: src,
              }}
              muted={muted}
              style={tw`flex-1 w-full rounded-3xl`}
              repeat={true}
            />
          ) : (
            <Image
              style={tw`flex-1 w-full rounded-3xl`}
              alt="Avatar"
              source={{uri: src}}
            />
          )
        ) : (
          <Loading />
        )}
      </Pressable>
      <View style={tw`flex-row gap-1 px-2 mb-10`}>
        <TouchableOpacity
          onPress={() => null}
          style={tw`justify-center items-center bg-[#1C1C1C] p-3 rounded-full`}>
          <Text style={tw`text-[#FFFFFF] text-sm`}>Edit video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => null}
          style={tw`justify-center items-center bg-[#1C1C1C] p-3 rounded-full`}>
          <Text style={tw`text-[#FFFFFF] text-sm`}>Add clips</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('FileDetail', {src, createType, fileType})
          }
          style={tw`justify-center items-center bg-[#2897e5] p-3 rounded-full absolute right-3`}>
          <Text style={tw`text-[#FFFFFF] text-sm`}>Next --{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditFile;
