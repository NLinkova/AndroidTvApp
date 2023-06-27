import React from 'react';
import {
  SafeAreaView
} from 'react-native';

import TVScreen from './screens/TV/TVScreen';

function App(): JSX.Element {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TVScreen />
    </SafeAreaView>
  );
}


export default App;
