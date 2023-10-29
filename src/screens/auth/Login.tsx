import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Text, TextInput, Pressable, Platform, Image} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {AuthStackParamList} from '../../routes/AuthStack';
import {KeyboardAvoidingView} from 'react-native';
import tw from 'twrnc';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;
import {collection, getDocs, query, where} from 'firebase/firestore';
import useCheckAuth from '../../hooks/checkAuth';
import Loading from '../../components/Loading';
import LinearGradient from 'react-native-linear-gradient';
import logo from '../../assets/logo.png';

const Login = ({navigation}: LoginScreenProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const checkAuth = useCheckAuth();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      await AsyncStorage.setItem('email', email.trim());
      const q = query(collection(db, 'user'), where('email', '==', email));
      const data = await getDocs(q);
      data.forEach(async doc => {
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.setItem('userId', doc.id);
      });
      checkAuth.logIn();
      setIsLoading(false);
    } catch (error) {
      Snackbar.show({
        text: 'Incorrect email or password',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#198754',
        textColor: '#000000',
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={tw`flex-1 items-center`}
        colors={['#030c26', '#1a0328']}>
        <Text style={tw`text-gray-500 mt-15`}>English (US)</Text>
        <Image style={tw`h-20 w-20 my-18`} alt="Avatar" source={logo} />
        <TextInput
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Username, email or mobile number"
          placeholderTextColor={'#808080'}
          style={tw`mb-3 bg-gray-800 text-white no-underline font-semibold px-5 py-3 w-80 border border-gray-600 rounded-xl`}
        />
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor={'#808080'}
          style={tw`mb-3 bg-gray-800 text-white no-underline font-semibold px-5 py-3 w-80 border border-gray-600 rounded-xl`}
        />
        <Pressable style={tw`mb-4 w-80`} onPress={handleLogin}>
          <Text
            style={tw`text-center text-white font-semibold bg-[#0165FC] py-2 rounded-3xl text-lg`}>
            Log in
          </Text>
        </Pressable>
        <Pressable
          style={tw`mb-4`}
          onPress={() => console.log('forget password function')}>
          <Text style={tw`text-center text-white font-semibold`}>
            Forget password?
          </Text>
        </Pressable>
        <Pressable
          style={tw`w-80 mt-30`}
          onPress={() => navigation.navigate('Signup')}>
          <Text
            style={tw`mb-3 py-2 rounded-3xl text-lg text-center text-[#1773fe] border font-semibold border-[#1773fe]`}>
            Create new account
          </Text>
        </Pressable>
        <Text style={tw`text-gray-300 font-semibold text-lg text-center`}>
          Meta
        </Text>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default Login;
