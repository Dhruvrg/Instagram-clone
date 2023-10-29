import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import Avatar from '../Avatar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../../config/firebase';

const CommentCard = ({comment, id, userId, reaction, type, index}: any) => {
  const [isLike, setIsLike] = useState(false);
  const [user, setUser] = useState<any>({username: '', image: ''});

  const getUserDetails = async () => {
    try {
      const data = await getDoc(doc(db, 'user', userId));
      const {username, image}: any = data.data();
      setUser({username, image});
    } catch (error) {}
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleLike = async () => {
    try {
      setIsLike(!isLike);
      reaction[index] = reaction[index] + !isLike;
      await updateDoc(doc(db, type, id), {
        reaction: reaction,
      });
    } catch (error) {}
  };

  return (
    <View style={tw`flex-row gap-3 px-6 py-3`}>
      <Avatar border={false} viewed={false} src={user.image} size={9} />
      <View style={tw`flex-1`}>
        <Text style={tw`text-white text-[12px]`}>{user.username}</Text>
        <Text style={tw`text-white`}>{comment}</Text>
      </View>
      <TouchableOpacity
        style={tw`items-center -gap-1`}
        onPress={() => handleLike()}>
        {isLike ? (
          <Icon style={tw`text-red-500 text-lg`} name="heart" />
        ) : (
          <Icon style={tw`text-[#989898] text-lg`} name="heart-o" />
        )}
        <Text style={tw`text-[#989898]`}>{reaction[index]}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommentCard;
