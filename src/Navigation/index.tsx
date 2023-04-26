import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Authentication from './Screens/Authentication';
import Welcome from './Screens/Welcome';
import SignUp from './Screens/SignUp';
import Forgot from './Screens/Forgot';
import DataStore from './Screens/DataStore';
import GraphQLScreen from './Screens/GraphQL';

export type RootStackParamsList = {
  Authentication: undefined;
  Welcome: undefined;
  SignUp: undefined;
  Forgot: undefined;
  DataStore: undefined;
  GraphQL: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamsList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Authentication" component={Authentication} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="DataStore" component={DataStore} />
        <Stack.Screen name="GraphQL" component={GraphQLScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
