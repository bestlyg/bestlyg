import React from 'react';
import { ButtonProps } from './interface';

export default function Button(props: React.PropsWithChildren<ButtonProps>) {
    console.log('button render', props);
    return <div>button</div>;
}
