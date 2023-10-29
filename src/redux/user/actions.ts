import AsyncStorage from '@react-native-async-storage/async-storage';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../config/firebase';
import {AppDispatch} from '../store';
export const GET_DETAILS = 'GET_DETAILS';
export const SET_DETAILS = 'SET_DETAILS';

export const getDetails = () => {
  try {
    return async (dispatch: AppDispatch) => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId == null) return false;
      const data = await getDoc(doc(db, 'user', userId));
      const user = data.data();
      if (user == undefined) return false;
      user.id = userId;
      dispatch({
        type: GET_DETAILS,
        payload: user,
      });
    };
  } catch (error) {}
};
