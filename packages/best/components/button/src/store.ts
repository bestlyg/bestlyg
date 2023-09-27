import { zustand } from '@best/core/src/deps';

export interface StoreProps {
    value: number;
    setValue: (value: number) => void;
}

export const useStore = zustand.create<StoreProps>((set, get, api) => {
    return {
        value: 0,
        setValue: value => set({ value }),
    };
});
