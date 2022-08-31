import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { update } from '../actions';

export const name = 'person';
export type State = {
  age: number;
};
const initialState: State = {
  age: 0,
};
export const slice = createSlice({
  name,
  initialState,
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
      state.age++;
    },
    addByNum: (state, action: PayloadAction<number>) => {
      state.age += action.payload;
    },
    minus: state => {
      state.age--;
    },
  },
  extraReducers: builder => {
    builder.addCase(actions.update, state => {
      state.age += 1;
    });
  },
});
export const actions = {
  ...slice.actions,
  update,
};
