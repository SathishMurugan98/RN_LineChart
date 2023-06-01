import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Charts from './Charts';
import Home from './Home';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode={false}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Charts" component={Charts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
