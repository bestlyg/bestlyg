import { useStore } from '@/store';
import { Button, View } from '@tarojs/components';
import React from 'react';
import './global.scss';

definePageConfig({
    navigationBarTitleText: 'Store 演示',
});
export default function Store() {
    const { state, dispatch, actions, getters } = useStore();
    const { state: store } = useStore();
    return (
        <View style={{ width: '100vw', height: '100vh' }}>
            <View>
                <View>Counter</View>
                <View>state : {state.counter.data}</View>
                <View>state * 2 : {getters.counter2}</View>
                <Button
                    onClick={() => {
                        dispatch(actions.counter.add());
                    }}
                >
                    add
                </Button>
                <Button
                    onClick={() => {
                        dispatch(actions.counter.asyncAdd(2));
                    }}
                >
                    asyncAdd
                </Button>
            </View>
            <View>
                <View>Person</View>
                {store.person.age}
            </View>
            <Button onClick={() => dispatch(actions.counter.update(1))}>update</Button>
        </View>
    );
}
