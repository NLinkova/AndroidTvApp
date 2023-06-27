import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import TVScreen from './screens/TV/TVScreen';
import { GameCard } from './types';

const Stack = createNativeStackNavigator();
export type StackParams = {
  TVScreen: undefined;
  GameScreen: { game: GameCard };
};

function App(): JSX.Element {

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='TVScreen' screenOptions={{
        headerStyle: {
          backgroundColor: '#1e45f4',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} >

        <Stack.Screen
          name="TVScreen"
          component={TVScreen}
          options={{ title: "Игры" }}

        />
        {/* <Stack.Screen
          name="GameScreen"
          component={GameComponent}
          options={({ route }) => ({ title: route.params.game.name })}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>

  );
}


export default App;
