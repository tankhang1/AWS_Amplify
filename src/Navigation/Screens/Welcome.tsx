import {View, Text, Button} from 'react-native';
import React, {useEffect} from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../index';
import {Auth, DataStore, Hub} from 'aws-amplify';
import {Card} from '../../models';
type Props = NativeStackScreenProps<RootStackParamsList, 'Welcome'>;
const Welcome = ({navigation, route}: Props) => {
  const onSignOut = async () => {
    try {
      await Auth.signOut();
      navigation.navigate('Authentication');
    } catch (error) {
      console.log(error);
    }
  };
  const onCollectData = () => {
    navigation.navigate('DataStore');
  };
  const onNavigateGraphQL = () => {
    navigation.navigate('GraphQL');
  };
  useEffect(() => {
    Hub.listen('auth', async data => {
      if (data.payload.event === 'signOut') {
        await DataStore.clear();
      }
    });
  });
  return (
    <View>
      <Button title="Sign out" onPress={onSignOut} />
      <Button title="Go DataStore Screen" onPress={onCollectData} />
      <Button title="Go GraphQL Screen" onPress={onNavigateGraphQL} />
    </View>
  );
};

export default Welcome;
