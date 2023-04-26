/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Amplify, Auth} from 'aws-amplify';
import awsmobile from './src/aws-exports';
import {DataStore} from 'aws-amplify';
import {SQLiteAdapter} from '@aws-amplify/datastore-storage-adapter/SQLiteAdapter';
import 'core-js/full/symbol/async-iterator';
Amplify.configure(awsmobile);

DataStore.configure({
  storageAdapter: SQLiteAdapter,
});
AppRegistry.registerComponent(appName, () => App);
