import React, { useState } from 'react';
import { ASYNC } from '@/utils';

function Child1() {
    console.log('child1 render');
    return <div>child1</div>;
}
function Parent1() {
    const [v, setv] = useState(1);
    console.log('parent1 render1');
    return (
        <div
            onClick={() => {
                setv(v + 1);
            }}
        >
            parent1-{v}-<Child1 />
        </div>
    );
}
function Child2() {
    console.log('child2 render1');
    return <div>child2</div>;
}
function Parent2() {
    console.log('parent2 render');
    return (
        <div>
            parent2
            <Child2 />
        </div>
    );
}

export default function App() {
    console.log('app render', ASYNC);
    return (
        <div>
            <Parent1 />
            <Parent2 />
        </div>
    );
}
