import { ASYNC } from '@/utils';
import './styles/global.css';
import './styles/global.scss';
import './styles/global.less';
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { useCallback } from 'react';

const useStore = create<{
    value: number;
    setValue: (value: number) => void;
    name: string;
    setName: (name: string) => void;
}>((set, get, api) => {
    console.log('store create', api);
    return {
        value: 1,
        setValue: (value: number) => {
            console.log('setValue');
            set({ value });
        },
        name: '123',
        setName: (name: string) => {
            console.log('setName');
            set({ name });
        },
    };
});

export default function App() {
    console.log('app render');
    const { value, setValue } = useStore(
        store => ({
            value: store.name,
            setValue: store.setName,
        }),
        shallow
    );
    return (
        <div>
            <Comp1 />
            <button onClick={() => setValue(value + 'a')}>add</button>
        </div>
    );
}

function Comp1() {
    console.log('comp1 render');
    const { value, setValue } = useStore(store => ({
        value: store.value,
        setValue: store.setValue,
    }));
    return (
        <div>
            Comp1 - {value} - <button onClick={() => setValue(value + 1)}>add</button>
        </div>
    );
}
