import React from 'react';
import { Point24 } from './point24';
import { Image2Shadow } from './image2shadow';

const data: Record<string, React.FC<any>> = { Point24, Image2Shadow };

export function Applications({ name }: { name: string }) {
    const App = data[name];
    if (!App) return null;
    return <App />;
}
