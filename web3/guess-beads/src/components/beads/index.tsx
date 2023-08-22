import { Spin } from 'antd';
import { useBoolean } from 'ahooks';
import React from 'react';
import cx from 'classnames';
import { Bead } from '@/components/bead';
import styles from './styles.module.css';

export function Beads() {
    const [beadVisible, beadVisibleOpt] = useBoolean(!false);
    const [loading, loadingOpt] = useBoolean(false);
    const onGuess = () => {
        if (loading) return;
        loadingOpt.setTrue();
        beadVisibleOpt.setFalse();
        console.log('On Guess');
        setTimeout(() => {
            loadingOpt.setFalse();
            beadVisibleOpt.setTrue();
        }, 1000);
    };
    return (
        <div className={styles.container}>
            <div className={cx(styles.item)}>
                <button
                    className={cx(styles.guess_btn)}
                    onClick={() => {
                        onGuess();
                    }}
                >
                    <Spin spinning={loading}>
                        <div className={styles.guess_btn_content}>GUESS</div>
                    </Spin>
                </button>
            </div>
            {new Array(8).fill(0).map((_, i) => (
                <div
                    key={i}
                    className={cx(
                        styles.item,
                        styles.bead,
                        styles[`bead${i + 1}`],
                        beadVisible && styles.bead_visible
                    )}
                >
                    <Bead />
                </div>
            ))}
        </div>
    );
}
