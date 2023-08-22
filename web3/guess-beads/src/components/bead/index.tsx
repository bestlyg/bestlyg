import React from 'react';
import styles from './styles.module.css';
import { Color } from '@/utils';

export function Bead({ color = Color.Red }: { color?: Color }) {
    return <div className={styles.ball} style={{ '--color': color }}></div>;
}
