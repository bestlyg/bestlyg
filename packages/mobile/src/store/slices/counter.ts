import { cloneDeep } from 'lodash';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { update } from '../actions';
import { persist } from '../utils';

const asyncAdd = createAsyncThunk('user/asyncAdd', async (value: number) =>
  new Promise(resolve => {
    setTimeout(resolve, 1000);
  }).then(() => value)
);
export const name = 'counter';
const load = persist.set(name);
export type State = {
  data: number;
};
const initialState: State = {
  data: 0,
};
export const slice = createSlice({
  name,
  initialState: cloneDeep(initialState),
  reducers: {
    reset: state => {
      const clone = cloneDeep(initialState);
      Object.keys(initialState).forEach(key => {
        state[key] = clone[key];
      });
    },
    persist: (state, action: PayloadAction<State>) => {
      Object.keys(initialState).forEach(key => {
        state[key] = action.payload[key];
      });
    },
    add: state => {
      state.data++;
      load(state);
    },
    addByNum: (state, action: PayloadAction<number>) => {
      state.data += action.payload;
    },
    minus: state => {
      state.data--;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(actions.update, state => {
        state.data += 1;
      })
      .addCase(asyncAdd.fulfilled, (state, action) => {
        state.data += action.payload;
        load(state);
      });
  },
});
export const actions = {
  ...slice.actions,
  update,
  asyncAdd,
};
