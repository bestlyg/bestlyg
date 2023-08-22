import React from 'react';
import styles from './styles.module.css';

export enum Color {
    RED = '#E60033',
    BLUE = '#2CA9E1',
    GREEN = '#88CB7F',
}

export function Bead({ color = Color.RED }: { color?: Color }) {
    return <div className={styles.ball} style={{ '--color': color }}></div>;
}
