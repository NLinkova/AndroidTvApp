import React from 'react';
import {
  SafeAreaView, StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import TVScreen from './screens/TV/TVScreen';

function App(): JSX.Element {

  return (
    <LinearGradient
      colors={['#14063D', '#3806B2']}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea}>
        <TVScreen />
      </SafeAreaView>
    </LinearGradient>
  );
}


export default App;
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
