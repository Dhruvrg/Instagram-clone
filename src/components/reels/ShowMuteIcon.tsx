import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import tw from 'twrnc';

const ShowMuteIcon = ({showMute, muted}: any) => {
  return (
    <>
      {showMute && (
        <View
          style={tw`absolute justify-center items-center mx-30 z-1 bg-[#000000] bg-opacity-65 w-15 h-15 rounded-full`}>
          {muted ? (
            <Icon style={tw`text-[#FFFFFF] text-2xl`} name="volume-off" />
          ) : (
            <Icon style={tw`text-[#FFFFFF] text-2xl`} name="volume-up" />
          )}
        </View>
      )}
    </>
  );
};

export default ShowMuteIcon;
