import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Authentication from './Screens/Authentication';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Authentication" component={Authentication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
