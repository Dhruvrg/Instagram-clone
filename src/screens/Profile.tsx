import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {View, Text, ScrollView} from 'react-native';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/profile/Header';
import UserDetails from '../components/profile/UserDetails';
import ActionButton from '../components/profile/ActionButton';
import Content from '../components/profile/Content';

const Profile = ({route}: any) => {
  const {id}: any = route.params;
  const [onwner, setOnwner] = useState(false);
  const [user, setUser] = useState<any>({});

  const getCreatorDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (id == 'onwner' || userId == id) {
        setOnwner(true);
      } else {
        setOnwner(false);
      }
      const data = await getDoc(doc(db, 'user', id == 'onwner' ? userId : id));
      setUser({...data.data(), id: data.id});
    } catch (error) {}
  };

  useEffect(() => {
    getCreatorDetails();
  }, [id]);

  return (
    <View style={tw`bg-[#000000] flex-1`}>
      {user.id && (
        <>
          <Header username={user.username} />
          <ScrollView>
            <View style={tw`px-5`}>
              <UserDetails user={user} onwner={onwner} />
              <ActionButton
                onwner={onwner}
                id={user.id}
                list={user.followers}
              />
            </View>
            <Content data={user} id={user.id} />
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Profile;
