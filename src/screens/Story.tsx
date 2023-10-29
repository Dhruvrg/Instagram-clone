import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import Avatar from '../components/Avatar';
import MoreOptions from '../components/reacttion/MoreOptions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

const Story = ({route}: any) => {
  const [isLike, setIsLike] = useState(false);
  const {user}: any = route.params;
  const [message, setMessage] = useState('');
  const navigation: any = useNavigation();
  const height = Dimensions.get('window').height - 140;

  useEffect(() => {
    if (user.story.type[0] == 'photo') {
      setTimeout(() => navigation.goBack(), 3000);
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={tw`bg-[#000000] flex-1 pt-5`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={tw`absolute z-50 flex-row items-center top-8 px-5`}>
        <TouchableOpacity
          style={tw`flex-row items-center flex-1 gap-4`}
          onPress={() => navigation.navigate('Profile', {id: user.id})}>
          <Avatar border={false} viewed={true} size={10} src={user.image} />
          <Text style={tw`text-white font-bold`}>{user.username}</Text>
        </TouchableOpacity>
        <MoreOptions />
      </View>
      {user.story.type[0] == 'photo' ? (
        <Image
          resizeMode="cover"
          style={tw`h-[${height}px] rounded-lg`}
          alt="Avatar"
          source={{uri: user.story.src[0]}}
        />
      ) : (
        <Video
          source={{
            uri: user.story.src[0],
          }}
          onEnd={() => navigation.goBack()}
          resizeMode="cover"
          style={tw`h-[${height}px] rounded-lg`}
        />
      )}
      <View style={tw`flex-row items-center px-3 gap-3 py-4`}>
        <TextInput
          value={message}
          onChangeText={(text: any) => setMessage(text)}
          placeholder="Send message"
          placeholderTextColor={'#FFFFFF'}
          style={tw`text-white no-underline font-semibold rounded-3xl border-gray-700 border flex-1 px-5 h-12`}
        />
        <TouchableOpacity onPress={() => setIsLike(!isLike)}>
          {isLike ? (
            <Icon style={tw`text-red-500 text-2xl`} name="heart" />
          ) : (
            <Icon style={tw`text-white text-2xl`} name="heart-o" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => null}>
          <Icon style={tw`text-white text-2xl`} name="send-o" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Story;
