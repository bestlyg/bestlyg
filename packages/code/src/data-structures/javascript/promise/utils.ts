import { BestPromise } from './promise';

export const isBestPromise = (val: unknown): val is BestPromise<unknown> =>
  val instanceof BestPromise;
export const ASYNC = (fn: () => void) => setTimeout(fn, 0);
export enum PromiseState {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}
export interface BestPromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
}

export interface BestPromiseRejectedResult {
  status: 'rejected';
  reason: any;
}
