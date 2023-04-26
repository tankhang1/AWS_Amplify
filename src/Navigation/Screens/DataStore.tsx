import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '..';
import {DataStore as DS, Predicates} from 'aws-amplify';
import {Card, CardDetail} from '../../models';
import {CardStatus} from '../../models';
type Props = NativeStackScreenProps<RootStackParamsList, 'DataStore'>;
const DataStore = ({navigation}: Props) => {
  const onCollectData = async () => {
    const query = await DS.query(Card, c => c.description.contains('a'));
    console.log(query.length);
  };
  const onDeleteData = async () => {
    await DS.delete(Card, Predicates.ALL);
  };
  const onAddData = async () => {
    await DS.save(
      new Card({
        header: 'TanKhang' + Math.random() * 250,
        description: 'Are you oke 111  ',
      }),
    );
  };
  const onUpdateData = async () => {
    const cardItem = await DS.query(
      Card,
      '3696e289-247c-4a7e-940c-db5248075b80',
    );
    if (cardItem) {
      const updateCard = await DS.save(
        Card.copyOf(cardItem, updated => {
          updated.header = 'Doan Tan Khang';
        }),
      );
      console.log(updateCard);
    }
  };
  const onSavingRelationData = async () => {
    const card = await DS.save(
      new Card({
        header: 'Nguyen Thi Nho',
        description: 'Nho',
      }),
    );
    await DS.save(
      new CardDetail({
        question: 'What your name',
        answer: ['Khang', 'Nho', 'Xanh', 'Quang'],
        status: CardStatus.ACTIVE,
        card: card,
      }),
    );
  };
  const onGetRelationData = async () => {
    const card = await DS.query(CardDetail, c =>
      c.card.id.eq('dc863335-41ec-4f25-87c8-c34a37c8d22f'),
    );
    console.log(card);
  };
  //Delete Relation is the same delete obove
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

      <Pressable
        onPress={onDeleteData}
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
          Delete Data
        </Text>
      </Pressable>

      <Pressable
        onPress={onAddData}
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
          Add Data
        </Text>
      </Pressable>
      <Pressable
        onPress={onUpdateData}
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
          Update Data
        </Text>
      </Pressable>

      <Pressable
        onPress={onSavingRelationData}
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
          Saving Relations Data
        </Text>
      </Pressable>

      <Pressable
        onPress={onGetRelationData}
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
          Get Relations Data
        </Text>
      </Pressable>
    </View>
  );
};

export default DataStore;
