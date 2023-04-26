// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const CardStatus = {
  "ACTIVE": "ACTIVE",
  "INACTIVE": "INACTIVE"
};

const { Card, CardDetail } = initSchema(schema);

export {
  Card,
  CardDetail,
  CardStatus
};