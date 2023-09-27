import { ReactNode } from 'react';

export interface Demo {
    title: string;
    subtitle: string;
    Component: ReactNode;
}

export interface Component {
    title: string;
    subtitle: string;
    demos: Demo[];
}
