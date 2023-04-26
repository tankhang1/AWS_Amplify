import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Auth} from 'aws-amplify';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '..';
const {width} = Dimensions.get('screen');
type Props = NativeStackScreenProps<RootStackParamsList, 'Forgot'>;
const Forgot = ({navigation, route}: Props) => {
  const [userName, setUserName] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const onNext = () => {
    Auth.forgotPassword(userName)
      .then(data => {
        console.log(data);
        scrollRef.current?.scrollTo({y: width});
      })
      .catch(e => console.log('error', e));
  };
  const onConfirm = () => {
    Auth.forgotPasswordSubmit(userName, code, newPassword)
      .then(data => {
        navigation.navigate('Authentication');
      })
      .catch(err => console.log(err));
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={{
          uri: 'https://camo.githubusercontent.com/b0221b7ebe904cfd5e7b338a9aa49dd8a001a472f74ca69b14da60dc4d1f6abd/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6177732d6d6f62696c652d6875622d696d616765732f6177732d616d706c6966792d6c6f676f2e706e67',
        }}
        style={{
          width: 300,
          height: 200,
          resizeMode: 'contain',
        }}
      />

      <View
        style={{
          height: 300,
        }}>
        <ScrollView
          horizontal
          pagingEnabled
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}>
          <View style={{width}}>
            <TextInput
              defaultValue={userName}
              onChangeText={setUserName}
              placeholder="User name"
              style={{
                width: '80%',
                paddingHorizontal: 10,
                color: 'black',
                fontSize: 18,
                alignSelf: 'center',
                borderRadius: 10,
                borderWidth: 1,
              }}
              placeholderTextColor={'gray'}
            />
            <View
              style={{
                width: '80%',
                alignSelf: 'center',
                marginTop: 10,
              }}>
              <Button title="Next" onPress={onNext} />
            </View>
          </View>
          <View style={{width}}>
            <TextInput
              defaultValue={code}
              onChangeText={setCode}
              placeholder="Code"
              style={{
                width: '80%',
                paddingHorizontal: 10,
                color: 'black',
                fontSize: 18,
                alignSelf: 'center',
                borderRadius: 10,
                borderWidth: 1,
              }}
              placeholderTextColor={'gray'}
            />
            <TextInput
              defaultValue={newPassword}
              onChangeText={setNewPassword}
              placeholder="New Password"
              style={{
                width: '80%',
                paddingHorizontal: 10,
                color: 'black',
                fontSize: 18,
                alignSelf: 'center',
                borderRadius: 10,
                borderWidth: 1,
              }}
              placeholderTextColor={'gray'}
            />
            <View
              style={{
                width: '80%',
                alignSelf: 'center',
                marginTop: 10,
              }}>
              <Button title="Confirm" onPress={onConfirm} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Forgot;
