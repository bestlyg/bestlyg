import _dayjs from 'dayjs';
import * as _zustand from 'zustand';
import { shallow } from 'zustand/shallow';

export const zustand = _zustand as typeof _zustand & {
    shallow: typeof shallow;
};

zustand.shallow = shallow;

export const dayjs = _dayjs;
