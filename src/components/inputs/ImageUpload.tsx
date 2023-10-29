import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';

const ImageUpload = () => {
  const [video, setVideo] = useState(
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  );

  const selectPhotoTapped = async () => {
    await launchImageLibrary(
      {
        mediaType: 'video',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorCode);
        } else {
          const uri = response.assets && response.assets[0].uri;
          const type = response.assets && response.assets[0].type;
          const name = response.assets && response.assets[0].fileName;
          const source = {
            uri,
            type,
            name,
          };
          cloudinaryUpload(source);
        }
      },
    );
  };

  const cloudinaryUpload = async (video: any) => {
    const data = new FormData();
    data.append('file', video);
    data.append('upload_preset', 'zkmpkbvz');
    data.append('cloud_name', 'dfwhmxovw');

    fetch('https://api.cloudinary.com/v1_1/dfwhmxovw/video/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        setVideo(data.secure_url);
      })
      .catch(err => {});
  };

  return (
    <View style={tw`flex-1 h-full`}>
      <Text>ImageUpload</Text>
      <TouchableOpacity onPress={() => selectPhotoTapped()}>
        <Text>Upload</Text>
      </TouchableOpacity>
      <Video
        source={{
          uri: video,
        }}
        paused={true}
        style={tw`w-100 flex-1 h-200`}
        repeat={true}
      />
    </View>
  );
};

export default ImageUpload;
