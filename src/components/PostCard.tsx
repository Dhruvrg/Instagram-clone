import React, {useEffect, useState} from 'react';
import Avatar from './Avatar';
import tw from 'twrnc';
import MoreOptions from './reacttion/MoreOptions';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Like from './reacttion/Like';
import useShowNavbarContent from '../hooks/showNavbarContent';
import Icon from 'react-native-vector-icons/FontAwesome';
import ShowComment from './reacttion/ShowComment';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../config/firebase';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

const PostCard = ({post}: any) => {
  const [user, setUser] = useState<any>({});
  const [popUp, setPopUp] = useState(0);
  const [comments, setComments] = useState(false);
  const {navigate}: any = useNavigation();
  const showNavbarContent = useShowNavbarContent();
  const width = Dimensions.get('window').width;
  const {src, userId, like, comment} = post;

  const getCreatorDetails = async () => {
    try {
      const data = await getDoc(doc(db, 'user', userId));
      setUser(data.data());
    } catch (error) {}
  };

  const handleBackButtonClick = () => {
    showNavbarContent.logIn();
    setComments(false);
    return true;
  };

  useEffect(() => {
    getCreatorDetails();
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  return (
    <View style={tw`flex-1 mb-4`}>
      <View style={tw`flex-row items-center px-4 py-2`}>
        <Avatar border={false} viewed={true} size={8} src={user.image} />
        <TouchableOpacity
          style={tw`flex-1 ml-2`}
          onPress={() => navigate('Profile', {id: userId})}>
          <Text style={tw`text-white font-bold`}>{user.username}</Text>
        </TouchableOpacity>
        <MoreOptions />
      </View>
      <SwiperFlatList
        data={src}
        renderItem={({item}) => (
          <Image
            resizeMode="cover"
            style={tw`h-110 w-[${width}px]`}
            alt="Image"
            source={{uri: item}}
          />
        )}
      />
      <View style={tw`flex-row gap-4 px-5 py-2 w-[${width}px]`}>
        <Like type="post" like={post.like} id={post.id} />
        <TouchableOpacity
          onPress={() => {
            setPopUp(0);
            setComments(true);
            showNavbarContent.logOut();
          }}>
          <Icon style={tw`text-white text-2xl`} name="comment-o" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-1`}
          onPress={() => {
            setPopUp(1);
            showNavbarContent.logOut();
          }}>
          <Icon style={tw`text-white text-2xl`} name="send-o" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPopUp(2);
            showNavbarContent.logOut();
          }}>
          <Icon style={tw`text-white text-2xl`} name="bookmark-o" />
        </TouchableOpacity>
      </View>
      {like.length != 0 && (
        <Text style={tw`px-5 text-white font-bold`}>{like.length} likes</Text>
      )}
      {comment.length != 0 && (
        <Text style={tw`px-5 text-white font-bold`}>{comment[0]}</Text>
      )}
      <TouchableOpacity
        onPress={() => {
          setPopUp(0);
          showNavbarContent.logOut();
        }}>
        <Text style={tw`px-5 text-[#808080]`}>
          View all {comment.length} comments
        </Text>
      </TouchableOpacity>
      {!showNavbarContent.isLogin && comments && popUp === 0 && (
        <ShowComment
          type="post"
          id={post.id}
          comment={post.comment}
          reaction={post.reaction}
          user={post.user}
        />
      )}
    </View>
  );
};

export default PostCard;
