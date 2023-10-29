import React, {useState} from 'react';
import tw from 'twrnc';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../routes/AuthStack';
import Icon from 'react-native-vector-icons/FontAwesome';
type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;
import Loading from '../../components/Loading';
import Snackbar from 'react-native-snackbar';
import useCheckAuth from '../../hooks/checkAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {addDoc, collection} from 'firebase/firestore';
import {auth, db} from '../../config/firebase';
import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
} from 'react-native';

enum STEPS {
  NAME = 0,
  PASSWORD = 1,
  INFO = 2,
  DOB = 3,
  USERNAME = 4,
  PHONE_NO = 5,
  EMAIL = 6,
  CODE = 7,
  TERMS = 8,
}

const Signup = ({navigation}: SignupScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.NAME);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState('October 2, 2023');
  const [username, setUsername] = useState(name === '' ? 'new6758' : name);
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const checkAuth = useCheckAuth();

  const onBack = () => {
    setStep(value => value - 1);
  };

  const onNext = () => {
    setStep(value => value + 1);
  };

  const handleSignUp = async () => {
    if (step !== STEPS.TERMS) {
      return onNext();
    }
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
      const data = await addDoc(collection(db, 'user'), {
        bio: '',
        bookmark: [],
        chat: [],
        email: email,
        followers: [],
        following: [],
        image: '',
        liked: [],
        name: name,
        post: [],
        reel: [],
        story: {date: [], src: [], type: []},
        tagged: [],
        username: username,
      });
      await AsyncStorage.removeItem('@userId');
      await AsyncStorage.setItem('@userId', data.id);
      checkAuth.logIn();
    } catch (error) {
      Snackbar.show({
        text: 'Incorrect email or password',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#198754',
        textColor: '#000000',
      });
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  let bodyContent = (
    <>
      <Pressable style={tw`mt-4 w-80`} onPress={() => navigation.goBack()}>
        <Icon style={tw`text-white text-2xl`} name="arrow-left" />
      </Pressable>
      <Text style={tw`my-5 text-left w-80 text-white font-bold text-2xl`}>
        What's your name?
      </Text>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Full name"
        placeholderTextColor={'#808080'}
        style={tw`mb-5 bg-gray-800 text-white no-underline font-semibold px-5 py-3 w-80 border border-gray-600 rounded-xl`}
      />
      <Pressable style={tw`mb-4 w-80`} onPress={onNext}>
        <Text
          style={tw`text-center text-white font-semibold bg-[#0165FC] py-2 rounded-3xl text-lg`}>
          Next
        </Text>
      </Pressable>
      <Pressable
        style={tw`absolute bottom-5`}
        onPress={() => navigation.goBack()}>
        <Text style={tw`text-[#4890fe] font-semibold`}>
          Already have an account?
        </Text>
      </Pressable>
    </>
  );

  if (step === STEPS.PASSWORD) {
    bodyContent = (
      <>
        <Pressable style={tw`mt-4 w-80`} onPress={onBack}>
          <Icon style={tw`text-white text-2xl`} name="arrow-left" />
        </Pressable>
        <Text style={tw`mt-5 text-left w-80 text-white font-bold text-2xl`}>
          Create a password
        </Text>
        <Text style={tw`mt-3 text-left w-80 text-white leading-5`}>
          Create a password with at least 6 letters or numbers. It should be
          something others can't guess.
        </Text>
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          placeholderTextColor={'#808080'}
          secureTextEntry
          style={tw`my-5 bg-gray-800 text-white no-underline font-semibold px-5 py-3 w-80 border border-gray-600 rounded-xl`}
        />
        <Pressable style={tw`mb-4 w-80`} onPress={onNext}>
          <Text
            style={tw`text-center text-white font-semibold bg-[#0165FC] py-2 rounded-3xl text-lg`}>
            Next
          </Text>
        </Pressable>
        <Pressable
          style={tw`absolute bottom-5`}
          onPress={() => navigation.goBack()}>
          <Text style={tw`text-[#4890fe] font-semibold`}>
            Already have an account?
          </Text>
        </Pressable>
      </>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <>
        <Pressable style={tw`mt-4 w-80`} onPress={onBack}>
          <Icon style={tw`text-white text-2xl`} name="arrow-left" />
        </Pressable>
        <Text style={tw`mt-5 text-left w-80 text-white font-bold text-2xl`}>
          Save your login info?
        </Text>
        <Text style={tw`mt-3 text-left w-80 text-white leading-5`}>
          We'll save the login info for {name == '' ? 'you' : name}, so you
          won't need to enter it next time you log in.
        </Text>
        <Pressable style={tw`my-4 w-80`} onPress={onNext}>
          <Text
            style={tw`text-center text-white font-semibold bg-[#0165FC] py-2 rounded-3xl text-lg`}>
            Save
          </Text>
        </Pressable>
        <Pressable style={tw`w-80`} onPress={onNext}>
          <Text
            style={tw`mb-3 py-2 rounded-3xl text-lg text-center text-white border border-[#808080]`}>
            Not now
          </Text>
        </Pressable>
        <Pressable
          style={tw`absolute bottom-5`}
          onPress={() => navigation.goBack()}>
          <Text style={tw`text-[#4890fe] font-semibold`}>
            Already have an account?
          </Text>
        </Pressable>
      </>
    );
  }

  if (step === STEPS.DOB) {
    bodyContent = (
      <>
        <Pressable style={tw`mt-4 w-80`} onPress={onBack}>
          <Icon style={tw`text-white text-2xl`} name="arrow-left" />
        </Pressable>
        <Text style={tw`mt-5 text-left w-80 text-white font-bold text-2xl`}>
          Whats's your birthday?
        </Text>
        <Text style={tw`mt-3 text-left w-80 text-white leading-5`}>
          Use your own birthday, even if this account is for a business, a pet
          or something else. No one will see this unless you choose to share it.
        </Text>
        <Text style={tw`text-left w-80 text-[#0165FC]`}>
          Why do I need to provide my birthday?
        </Text>
        <TextInput
          value={date}
          onChangeText={text => setDate(text)}
          placeholderTextColor={'#808080'}
          style={tw`my-5 bg-gray-800 text-white no-underline font-semibold px-5 py-3 w-80 border border-gray-600 rounded-xl`}
        />
        <Pressable style={tw`mb-4 w-80`} onPress={onNext}>
          <Text
            style={tw`text-center text-white font-semibold bg-[#0165FC] py-2 rounded-3xl text-lg`}>
            Next
          </Text>
        </Pressable>
        <Pressable
          style={tw`absolute bottom-5`}
          onPress={() => navigation.goBack()}>
          <Text style={tw`text-[#4890fe] font-semibold`}>
            Already have an account?
          </Text>
        </Pressable>
      </>
    );
  }

  if (step === STEPS.USERNAME) {
    bodyContent = (
      <>
        <Pressable style={tw`mt-4 w-80`} onPress={onBack}>
          <Icon style={tw`text-white text-2xl`} name="arrow-left" />
        </Pressable>
        <Text style={tw`mt-5 text-left w-80 text-white font-bold text-2xl`}>
          Create a username
        </Text>
        <Text style={tw`mt-3 text-left w-80 text-white leading-5`}>
          Add a username or use our suggestion. You can change this at any
          times.
        </Text>
        <TextInput
          value={username}
          onChangeText={text => setUsername(text)}
          placeholderTextColor={'#808080'}
          style={tw`my-5 bg-gray-800 text-white no-underline font-semibold px-5 py-3 w-80 border border-gray-600 rounded-xl`}
        />
        <Pressable style={tw`mb-4 w-80`} onPress={onNext}>
          <Text
            style={tw`text-center text-white font-semibold bg-[#0165FC] py-2 rounded-3xl text-lg`}>
            Next
          </Text>
        </Pressable>
        <Pressable
          style={tw`absolute bottom-5`}
          onPress={() => navigation.goBack()}>
          <Text style={tw`text-[#4890fe] font-semibold`}>
            Already have an account?
          </Text>
        </Pressable>
      </>
    );
  }

  if (step === STEPS.PHONE_NO) {
    bodyContent = (
      <>
        <Pressable style={tw`mt-4 w-80`} onPress={onBack}>
          <Icon style={tw`text-white text-2xl`} name="arrow-left" />
        </Pressable>
        <Text style={tw`mt-5 text-left w-80 text-white font-bold text-2xl`}>
          What's your mobile number?
        </Text>
        <Text style={tw`mt-3 text-left w-80 text-white leading-5`}>
          Enter the mobile number where you can be contacted. No one will see
          this on your profile.
        </Text>
        <TextInput
          keyboardType="phone-pad"
          value={phoneNo}
          onChangeText={text => setPhoneNo(text)}
          placeholderTextColor={'#808080'}
          placeholder="Mobile number"
          style={tw`mt-5 bg-gray-800 text-white no-underline font-semibold px-5 py-3 w-80 border border-gray-600 rounded-xl`}
        />
        <Text style={tw`mt-3 text-left w-80 text-sm leading-5`}>
          You may receive SMS notification from us for security any login
          purposes.
        </Text>
        <Pressable
          style={tw`my-4 w-80`}
          onPress={() => {
            onNext();
            onNext();
          }}>
          <Text
            style={tw`text-center text-white font-semibold bg-[#0165FC] py-2 rounded-3xl text-lg`}>
            Next
          </Text>
        </Pressable>
        <Pressable style={tw`w-80`} onPress={onNext}>
          <Text
            style={tw`mb-3 py-2 rounded-3xl text-lg text-center text-white border border-[#808080]`}>
            Sign up with email
          </Text>
        </Pressable>
        <Pressable
          style={tw`absolute bottom-5`}
          onPress={() => navigation.goBack()}>
          <Text style={tw`text-[#4890fe] font-semibold`}>
            Already have an account?
          </Text>
        </Pressable>
      </>
    );
  }

  if (step === STEPS.EMAIL) {
    bodyContent = (
      <>
        <Pressable style={tw`mt-4 w-80`} onPress={onBack}>
          <Icon style={tw`text-white text-2xl`} name="arrow-left" />
        </Pressable>
        <Text style={tw`mt-5 text-left w-80 text-white font-bold text-2xl`}>
          What's your email?
        </Text>
        <Text style={tw`mt-3 text-left w-80 text-white leading-5`}>
          Enter the email where you can be contacted. No one will see this on
          your profile.
        </Text>
        <TextInput
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
          placeholderTextColor={'#808080'}
          style={tw`my-5 bg-gray-800 text-white no-underline font-semibold px-5 py-3 w-80 border border-gray-600 rounded-xl`}
        />
        <Pressable style={tw`mb-4 w-80`} onPress={onNext}>
          <Text
            style={tw`text-center text-white font-semibold bg-[#0165FC] py-2 rounded-3xl text-lg`}>
            Next
          </Text>
        </Pressable>
        <Pressable style={tw`w-80`} onPress={onBack}>
          <Text
            style={tw`mb-3 py-2 rounded-3xl text-lg text-center text-white border border-[#808080]`}>
            Sign up with Mobile number
          </Text>
        </Pressable>
        <Pressable
          style={tw`absolute bottom-5`}
          onPress={() => navigation.goBack()}>
          <Text style={tw`text-[#4890fe] font-semibold`}>
            Already have an account?
          </Text>
        </Pressable>
      </>
    );
  }

  if (step === STEPS.CODE) {
    bodyContent = (
      <>
        <Pressable style={tw`mt-4 w-80`} onPress={onBack}>
          <Icon style={tw`text-white text-2xl`} name="arrow-left" />
        </Pressable>
        <Text style={tw`mt-5 text-left w-80 text-white font-bold text-2xl`}>
          Enter the confirmation code
        </Text>
        <Text style={tw`mt-3 text-left w-80 text-white leading-5`}>
          To confirm your account, enter the 6-digit code we sent to{' '}
          {email == '' ? phoneNo : email}
        </Text>
        <TextInput
          value={code}
          onChangeText={text => setCode(text)}
          placeholder="Confirmation code"
          placeholderTextColor={'#808080'}
          style={tw`my-5 bg-gray-800 text-white no-underline font-semibold px-5 py-3 w-80 border border-gray-600 rounded-xl`}
        />
        <Pressable style={tw`mb-4 w-80`} onPress={onNext}>
          <Text
            style={tw`text-center text-white font-semibold bg-[#0165FC] py-2 rounded-3xl text-lg`}>
            Next
          </Text>
        </Pressable>
        <Pressable style={tw`w-80`} onPress={() => console.log('Try again')}>
          <Text
            style={tw`mb-3 py-2 rounded-3xl text-lg text-center text-white border border-[#808080]`}>
            I didn't get the code
          </Text>
        </Pressable>
        <Pressable
          style={tw`absolute bottom-5`}
          onPress={() => navigation.goBack()}>
          <Text style={tw`text-[#4890fe] font-semibold`}>
            Already have an account?
          </Text>
        </Pressable>
      </>
    );
  }

  if (step === STEPS.TERMS) {
    bodyContent = (
      <>
        <Pressable style={tw`mt-4 w-80`} onPress={onBack}>
          <Icon style={tw`text-white text-2xl`} name="arrow-left" />
        </Pressable>
        <Text style={tw`mt-5 text-left w-80 text-white font-bold text-2xl`}>
          Agree to instagram's terms and policies
        </Text>
        <Text style={tw`mt-4 text-left w-80 text-white leading-5`}>
          People who use our service may have uploaded your contact information
          to Instagram. <Text style={tw`text-[#0165FC]`}>Learn more</Text>
        </Text>
        <Text style={tw`mt-4 text-left w-80 text-white leading-5`}>
          By tapping I agree, you agree to create an account and to Instagram's{' '}
          <Text style={tw`text-[#0165FC]`}>
            Terms, Privacy Policy and Cookies Policy.
          </Text>
        </Text>
        <Text style={tw`mt-4 text-left w-80 text-white leading-5`}>
          The Privacy Policy describes the ways we can use the information we
          collect when you create an account. For example, we use this
          information to provide, personalize and improve our products,
          including ads.
        </Text>
        <Pressable style={tw`mt-5 w-80`} onPress={handleSignUp}>
          <Text
            style={tw`text-center text-white font-semibold bg-[#0165FC] py-2 rounded-3xl text-lg`}>
            I agree
          </Text>
        </Pressable>
        <Pressable
          style={tw`absolute bottom-5`}
          onPress={() => navigation.goBack()}>
          <Text style={tw`text-[#4890fe] font-semibold`}>
            Already have an account?
          </Text>
        </Pressable>
      </>
    );
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
        {bodyContent}
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default Signup;
