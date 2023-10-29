import React from 'react';
import tw from 'twrnc';
import {SafeAreaView, StatusBar} from 'react-native';
import Router from './routes/Router';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {LogBox} from 'react-native';

function App(): JSX.Element {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <StatusBar />
      <SafeAreaView style={tw`h-full`}>
        <Router />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
