import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../config/firebase';
import Video from 'react-native-video';

const ReelCard = ({id}: any) => {
  const [reel, setReel] = useState<any>({});
  const {navigate}: any = useNavigation();

  const getReel = async () => {
    try {
      const data = await getDoc(doc(db, 'reel', id));
      setReel(data.data());
    } catch (error) {}
  };

  useEffect(() => {
    getReel();
  }, []);

  return (
    <TouchableOpacity
      style={tw`m-[1px]`}
      onPress={() => navigate('Reels', {id})}>
      {reel.src && (
        <Video
          source={{
            uri: reel?.src,
          }}
          resizeMode="cover"
          muted={true}
          style={tw`flex-1 w-30 h-50`}
          repeat={true}
        />
      )}
    </TouchableOpacity>
  );
};

export default ReelCard;
