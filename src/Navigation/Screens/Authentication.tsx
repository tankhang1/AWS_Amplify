import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Auth, Hub} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '..';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
const {width, height} = Dimensions.get('window');
type Props = NativeStackScreenProps<RootStackParamsList, 'Authentication'>;
const Authentication = ({navigation, route}: Props) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const LIST_SIGNIN = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/640px-Facebook_Logo_%282019%29.png',
  ];
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({payload: {event, data}}) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser();
          navigation.navigate('Welcome');
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser();
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => console.log(userData))
      .catch(() => console.log('Not signed in'));
  }
  const onSignIn = async () => {
    try {
      const user = await Auth.signIn(userName, password);
      console.log(user);
      navigation.navigate('Welcome');
    } catch (error) {
      console.log('error signing in', error);
    }
  };
  const onSignUp = async () => {
    try {
      const {user} = await Auth.signUp({
        username: userName,
        password: password,
        attributes: {
          nick_name: 'Doan Tan Khang',
        },
        autoSignIn: {
          enabled: true,
        },
      });
      console.log(user);
      navigation.navigate('Welcome');
    } catch (error) {
      console.log(error);
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
      <Pressable
        onPress={onSignIn}
        style={{
          paddingVertical: 10,
          backgroundColor: '#4682ff',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          borderRadius: 10,
          marginTop: 20,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
          }}>
          Sign in
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('SignUp')}
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
          Sign up
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('Forgot')}
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
          Forgot Password
        </Text>
      </Pressable>
      <Text>Sign in with Social Media</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 130,
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Pressable
          onPress={() => {
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Facebook,
            });
          }}>
          <Image
            source={{uri: LIST_SIGNIN[1]}}
            style={{
              width: 50,
              height: 50,
              resizeMode: 'contain',
            }}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Google,
            });
          }}>
          <Image
            source={{uri: LIST_SIGNIN[0]}}
            style={{
              width: 50,
              height: 50,
              resizeMode: 'contain',
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Authentication;
