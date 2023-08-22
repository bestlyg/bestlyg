import { Spin, message } from 'antd';
import { useBoolean } from 'ahooks';
import React, { useState } from 'react';
import cx from 'classnames';
import { Bead } from '@/components/bead';
import styles from './styles.module.css';
import { guess_beads } from '@/api';
import { Color } from '@/utils';
import { useStore } from '@/store';

function computeTransform(index: number) {
    const row = Math.floor(index / 4);
    const offsetY = (row - 1) * -1;
    const col = index % 4;
    const offsetX = (col - 2 >= 0 ? col - 1 : col - 2) * -1;
    return `translate(calc(var(--tf-size) * ${offsetX}), calc(var(--tf-size) * ${offsetY}))`;
}

export function Beads() {
    const { setAccount } = useStore();
    const [beadVisible, beadVisibleOpt] = useBoolean(!false);
    const [loading, loadingOpt] = useBoolean(false);
    const [pickList, setPickList] = useState(new Array(12).fill(Color.Red));
    const onGuess = () => {
        if (loading) return;
        loadingOpt.setTrue();
        beadVisibleOpt.setFalse();
        console.log('On Guess');
        guess_beads()
            .then(res => {
                const newAccount = { balance: res.balance };
                setAccount(newAccount);
                setPickList(res.pick_list);
                setTimeout(() => {
                    message.success(`You get ${res.benefits} NEAR.`);
                }, 1000);
            })
            .finally(() => {
                loadingOpt.setFalse();
                beadVisibleOpt.setTrue();
            });
        // setTimeout(() => {
        //     loadingOpt.setFalse();
        //     beadVisibleOpt.setTrue();
        // }, 3000);
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
            {pickList.map((item, i) => (
                <div
                    key={i}
                    className={cx(styles.item, styles.bead, beadVisible && styles.bead_visible)}
                    style={{
                        gridArea: `bead${i + 1}`,
                        transform: beadVisible ? undefined : computeTransform(i),
                        transition: `all ${0.3 + 0.2 * i}s ease-out`,
                    }}
                >
                    <Bead color={item} />
                </div>
            ))}
        </div>
    );
}
