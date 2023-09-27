import * as core from '@best/core/src';

export interface StoreProps {
    value: number;
    setValue: (value: number) => void;
}

export const useStore = core.deps.zustand.create<StoreProps>((set, get) => {
    return {
        value: 0,
        setValue: value => set({ value }),
    };
});
