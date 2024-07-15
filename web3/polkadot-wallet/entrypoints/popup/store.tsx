import { atom } from 'jotai';
import { ApiPromise } from '@polkadot/api';
import { Route, routeMap } from './routes';
import { KeyringPair } from '@polkadot/keyring/types';

export const connectingAtom = atom(false);

export const isConnectedAtom = atom(false);

export const apiAtom = atom<ApiPromise | null>(null);

export const accountsAtom = atom<{ keyringPair: KeyringPair; balance?: string }[]>([]);

export const activeRouteAtom = atom<Route>(routeMap['home']);
