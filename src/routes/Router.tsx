import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Loading from '../components/Loading';
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import useCheckAuth from '../hooks/checkAuth';

const Router = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const checkAuth = useCheckAuth();

  useEffect(() => {
    const getUserId = async () => {
      try {
        setIsLoading(true);
        const id = await AsyncStorage.getItem('userId');
        if (id != null) {
          checkAuth.logIn();
        }
        setIsLoading(false);
      } catch (e) {
        Snackbar.show({
          text: 'Some Error Occur',
          backgroundColor: '#F4BE2C',
          textColor: '#000000',
        });
      }
    };
    getUserId();
  }, [checkAuth.isLogin]);

  if (isLoading && checkAuth.isLogin) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {checkAuth.isLogin ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
