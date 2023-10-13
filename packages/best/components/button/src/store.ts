import { zustand } from '@best/core/src/deps';

export interface StoreProps {
    value: number;
    setValue: (value: number) => void;
}

export const useStore = zustand.create<StoreProps>((set, _, _1) => {
    return {
        value: 0,
        setValue: value => set({ value }),
    };
});
