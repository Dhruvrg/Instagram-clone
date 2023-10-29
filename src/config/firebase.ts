// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAfvvrWwUXli-RWzMNvCh0LTsfPL8CGOVo',
  authDomain: 'instagram-72acd.firebaseapp.com',
  projectId: 'instagram-72acd',
  storageBucket: 'instagram-72acd.appspot.com',
  messagingSenderId: '640689630946',
  appId: '1:640689630946:web:4985c740867dceb0caf8bb',
  measurementId: 'G-3HKZB2PY19',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
