import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '..';
import {Auth, Hub} from 'aws-amplify';
type Props = NativeStackScreenProps<RootStackParamsList, 'SignUp'>;
const {width, height} = Dimensions.get('window');
const SignUp = ({navigation, route}: Props) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [scrollLayout, setScrollLayout] = useState(0);
  const onSignUp = async () => {
    try {
      const {user} = await Auth.signUp({
        username: userName,
        password: password,
        attributes: {
          nickname: nickName,
        },
        autoSignIn: {
          enabled: false,
        },
      });
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  const scrollRef = useRef<ScrollView>(null);
  const onResendCode = async () => {
    try {
      await Auth.resendSignUp(userName);
      console.log('Successfull');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    function listenToAutoSignInEvent() {
      Hub.listen('auth', ({payload}) => {
        const {event} = payload;
        console.log(event);
      });
    }
    listenToAutoSignInEvent();
  });
  const onConfirmCode = async () => {
    try {
      await Auth.confirmSignUp(userName, confirmCode);
      navigation.navigate('Welcome');
    } catch (error) {
      console.log('code error', error);
    }
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
          height: 250,
        }}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onLayout={e => {
            setScrollLayout(e.nativeEvent.layout.height);
            console.log(e.nativeEvent.layout.height);
          }}
          onContentSizeChange={(height, width) => console.log(height)}
          automaticallyAdjustContentInsets={false}>
          <View
            style={{
              width,
              alignItems: 'center',
            }}>
            <TextInput
              defaultValue={userName}
              onChangeText={setUserName}
              placeholder="User name"
              style={{
                width: '80%',
                paddingHorizontal: 10,
                color: 'black',
                fontSize: 18,
                borderRadius: 10,
                borderWidth: 1,
              }}
              placeholderTextColor={'gray'}
            />
            <TextInput
              defaultValue={password}
              onChangeText={setPassword}
              placeholder="Password"
              style={{
                width: '80%',
                paddingHorizontal: 10,
                color: 'black',
                fontSize: 18,
                borderRadius: 10,
                borderWidth: 1,
                marginTop: 10,
              }}
              placeholderTextColor={'gray'}
            />
            <TextInput
              defaultValue={nickName}
              onChangeText={setNickName}
              placeholder="Nick name"
              style={{
                width: '80%',
                paddingHorizontal: 10,
                color: 'black',
                fontSize: 18,
                borderRadius: 10,
                borderWidth: 1,
                marginTop: 10,
              }}
              placeholderTextColor={'gray'}
            />
            <Pressable
              onPress={() => {
                onSignUp();
                scrollRef.current?.scrollToEnd();
              }}
              style={{
                paddingVertical: 10,
                backgroundColor: '#4682ff',
                justifyContent: 'center',
                alignItems: 'center',
                width: '80%',
                borderRadius: 10,
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                }}>
                Next
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width,
              alignItems: 'center',
            }}>
            <TextInput
              defaultValue={confirmCode}
              onChangeText={setConfirmCode}
              placeholder="Confirm code"
              style={{
                width: '80%',
                paddingHorizontal: 10,
                color: 'black',
                fontSize: 18,
                borderRadius: 10,
                borderWidth: 1,
              }}
              placeholderTextColor={'gray'}
            />
            <Pressable
              onPress={onConfirmCode}
              style={{
                paddingVertical: 10,
                backgroundColor: '#4682ff',
                justifyContent: 'center',
                alignItems: 'center',
                width: '80%',
                borderRadius: 10,
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                }}>
                Confirm Code
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
      <Pressable
        style={{
          width: 100,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#4682ff',
          borderRadius: 10,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            marginBottom: 10,
          }}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
