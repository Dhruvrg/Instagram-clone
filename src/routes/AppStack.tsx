import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Navbar from '../components/Navbar';
import Search from '../screens/Search';
import Create from '../screens/Create';
import Reels from '../screens/Reels';
import Profile from '../screens/Profile';
import EditFile from '../screens/EditFile';
import useShowNavbarContent from '../hooks/showNavbarContent';
import FileDetail from '../screens/FileDetail';
import Explore from '../screens/Explore';
import Posts from '../screens/Posts';
import Connections from '../screens/Connections';
import Story from '../screens/Story';
import Messages from '../screens/Messages';
import Chats from '../screens/Chats';

export type AppStackParamList = {
  Home: undefined;
  Search: undefined;
  Create: undefined;
  Reels: any;
  Profile: any;
  EditFile: any;
  FileDetail: {src: string; createType: string; fileType: string};
  Explore: any;
  Posts: any;
  Connections: any;
  Story: any;
  Messages: any;
  Chats: any;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  const showNavbarContent = useShowNavbarContent();
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="Reels" component={Reels} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditFile" component={EditFile} />
        <Stack.Screen name="FileDetail" component={FileDetail} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="Connections" component={Connections} />
        <Stack.Screen name="Story" component={Story} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Chats" component={Chats} />
      </Stack.Navigator>
      {showNavbarContent.isLogin && <Navbar />}
    </>
  );
};
