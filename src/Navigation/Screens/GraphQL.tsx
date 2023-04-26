import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '..';
import {API} from 'aws-amplify';
import {GraphQLQuery} from '@aws-amplify/api';
type Props = NativeStackScreenProps<RootStackParamsList, 'GraphQL'>;
const GraphQLScreen = ({navigation}: Props) => {
  const onCollectData = async () => {};
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Pressable
        onPress={onCollectData}
        style={{
          width: '80%',
          height: 50,
          backgroundColor: 'hsl(198,86%,71%)',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginVertical: 10,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
          }}>
          Collect Data
        </Text>
      </Pressable>
    </View>
  );
};

export default GraphQLScreen;
