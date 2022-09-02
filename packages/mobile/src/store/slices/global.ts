import { cloneDeep } from 'lodash';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { setStorage } from '@/utils';
import { services } from '@/services';
import { persist } from '../utils';

export const name = 'global';
const login = createAsyncThunk(
  name + '/asyncAdd',
  async (data: { code: string; encryptedData: string; iv: string }) => services.global.login(data)
);

const load = persist.set(name);
export type State = {
  login: boolean;
  accessToken: string;
  avatar: string;
  createTime: string;
  deleted: boolean;
  gender: number;
  name: string;
  roleKey: number;
  updateTime: string;
  wechatOpenId: string;
  _id: string;
};
const initialState: State = {
  login: false,
  accessToken: '',
  avatar: '',
  createTime: '',
  deleted: false,
  gender: 0,
  name: '',
  roleKey: 0,
  updateTime: '',
  wechatOpenId: '',
  _id: '',
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
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.login = true;
      Object.entries(action.payload).forEach(([k, v]) => (state[k] = v));
      setStorage({
        accessToken: action.payload.accessToken,
      });
      load(state);
    });
  },
});
export const actions = {
  ...slice.actions,
  login,
};
