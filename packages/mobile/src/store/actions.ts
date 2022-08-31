import { createAction } from '@reduxjs/toolkit';

export const create = createAction<any>('create');
export const remove = createAction<any>('remove');
export const update = createAction<any>('update');
export const select = createAction<any>('select');
