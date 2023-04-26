import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";

export enum CardStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}



type EagerCard = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Card, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly header?: string | null;
  readonly description?: string | null;
  readonly detail?: CardDetail | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly cardDetailId?: string | null;
}

type LazyCard = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Card, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly header?: string | null;
  readonly description?: string | null;
  readonly detail: AsyncItem<CardDetail | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly cardDetailId?: string | null;
}

export declare type Card = LazyLoading extends LazyLoadingDisabled ? EagerCard : LazyCard

export declare const Card: (new (init: ModelInit<Card>) => Card) & {
  copyOf(source: Card, mutator: (draft: MutableModel<Card>) => MutableModel<Card> | void): Card;
}

type EagerCardDetail = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CardDetail, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly question?: string | null;
  readonly answer?: (string | null)[] | null;
  readonly status: CardStatus | keyof typeof CardStatus;
  readonly card?: Card | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly cardDetailCardId?: string | null;
}

type LazyCardDetail = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CardDetail, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly question?: string | null;
  readonly answer?: (string | null)[] | null;
  readonly status: CardStatus | keyof typeof CardStatus;
  readonly card: AsyncItem<Card | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly cardDetailCardId?: string | null;
}

export declare type CardDetail = LazyLoading extends LazyLoadingDisabled ? EagerCardDetail : LazyCardDetail

export declare const CardDetail: (new (init: ModelInit<CardDetail>) => CardDetail) & {
  copyOf(source: CardDetail, mutator: (draft: MutableModel<CardDetail>) => MutableModel<CardDetail> | void): CardDetail;
}