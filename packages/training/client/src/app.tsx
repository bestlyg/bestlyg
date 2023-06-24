import React, { useState } from 'react';
import { ASYNC } from '@/utils';

function Child1() {
    console.log('child1 render');
    return <div>child1</div>;
}

function Child2() {
    console.log('child2 render');
    return <div>child2</div>;
}

function Parent1() {
    const [v1, setv1] = useState(1);
    const [v2, setv2] = useState(1);
    console.log('parent1 render1');
    return (
        <div
            onClick={async () => {
                setTimeout(() => {
                    setv1((c) => c + 1);
                    setv1((c) => c + 1);
                }, 0);
                setv2((c) => c + 1);
            }}
        >
            parent1-{v1}-{v2}-<Child1 />-<Child2 />
        </div>
    );
}
// function Parent2() {
//     console.log('parent2 render');
//     return (
//         <div>
//             parent2
//             <Child2 />
//         </div>
//     );
// }

export default function App() {
    console.log('app render', ASYNC);
    return (
        <div>
            <Parent1 />
            {/* <Parent2 /> */}
        </div>
    );
}
