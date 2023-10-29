import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import tw from 'twrnc';
import ShowMuteIcon from './ShowMuteIcon';
import Creator from './Creator';
import Details from './Details';
import Like from '../reacttion/Like';
import Comment from '../reacttion/Comment';
import MoreOptions from '../reacttion/MoreOptions';
import Audio from '../reacttion/Audio';
import Send from '../reacttion/Send';
import Camera from './Camera';
import ShowComment from '../reacttion/ShowComment';
import useShowNavbarContent from '../../hooks/showNavbarContent';
import {
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import ShowSend from '../reacttion/ShowSend';

const ReelCard = ({data, id, index, currentIndex}: any) => {
  const height = Dimensions.get('window').height;
  const [muted, setMuted] = useState(false);
  const [showMute, setShowMute] = useState(false);
  const [popUp, setPopUp] = useState(2);
  const showNavbarContent = useShowNavbarContent();

  const videoRef = useRef(null);

  const handleBackButtonClick = () => {
    showNavbarContent.logIn();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const handleMute = () => {
    showNavbarContent.logIn();
    if (showNavbarContent.isLogin) {
      setMuted(!muted);
      setShowMute(true);
      setTimeout(() => {
        setShowMute(false);
      }, 2000);
    }
  };

  return (
    <View style={tw`h-[${height}px]`}>
      <View style={tw`h-[${height - 50}px]`}>
        <Camera />
        <Pressable
          onPress={() => handleMute()}
          style={tw`flex-1 justify-center items-center border-b-2 border-gray-500`}>
          <ShowMuteIcon showMute={showMute} muted={muted} />
          <Video
            source={{
              uri: data.src,
            }}
            videoRef={videoRef}
            paused={currentIndex == index ? false : true}
            muted={muted}
            resizeMode="cover"
            style={[tw`flex-1 w-100 absolute`, {height: '100%'}]}
            repeat={true}
          />
        </Pressable>
        <View style={tw`absolute right-4 bottom-[20px] gap-4`}>
          <Like type="reel" like={data.like} id={id} />
          <TouchableOpacity
            onPress={() => {
              setPopUp(1);
              showNavbarContent.logOut();
            }}>
            <Comment comment={data.comment} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPopUp(2);
              showNavbarContent.logOut();
            }}>
            <Send share={data.share} />
          </TouchableOpacity>
          <MoreOptions />
          <Audio />
        </View>
        <View style={tw`absolute bottom-[15px] left-5 gap-4`}>
          <Creator userId={data.userId} />
          <Details caption={data.caption} />
        </View>
      </View>
      {!showNavbarContent.isLogin && popUp === 1 && (
        <ShowComment
          type="reel"
          id={id}
          comment={data.comment}
          reaction={data.reaction}
          user={data.user}
        />
      )}
      {!showNavbarContent.isLogin && popUp === 2 && <ShowSend id={data.id} />}
    </View>
  );
};

export default ReelCard;
