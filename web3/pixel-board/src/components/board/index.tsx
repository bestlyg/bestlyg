import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Context } from '@/context';
import { useBoolean, useRequest } from 'ahooks';
import { Spin, Space, Button, message } from 'antd';
import { useApi } from '@/api';
import cx from 'classnames';
import { ChromePicker } from 'react-color';
import styles from './styles.module.css';
import { useColorPicker } from '@/components/color-picker';
import iro from '@jaames/iro';

export interface Cell {
    color: number[];
    pos: number[];
}
export type Board = Cell[][];

export function Board() {
    const api = useApi();
    const [borderDisabled, borderDisabledOpt] = useBoolean(false);
    const { data, loading, refresh } = useRequest(() => api.get_board_metadata());
    const board: Board = useMemo(() => {
        if (!data) return [];
        const res: Board = [];
        for (const item of data.data) {
            let row = res[item.pos[0]];
            if (!row) res[item.pos[0]] = row = [];
            row[item.pos[1]] = { color: item.color, pos: item.pos };
        }
        return res;
    }, [data]);
    useEffect(() => {
        console.log('board', board);
    }, [board]);
    const [selectCell, setSelectCell] = useState<Record<number, Record<number, Cell>>>({});
    useEffect(() => {
        if (!data) {
            setSelectCell({});
        }
    }, [data]);
    const [color, setColor] = useState([255, 255, 255, 1]);
    const { show: showColorPicker, node: ColorPickerNode } = useColorPicker({
        onChange: v => setColor(v),
    });
    return (
        <Space direction="vertical" style={{ marginTop: 20 }}>
            {ColorPickerNode}
            {loading ? (
                <Spin />
            ) : (
                <>
                    <Space>
                        <Button onClick={showColorPicker}>Set Color</Button>
                        <Button onClick={() => setSelectCell({})}>Clear</Button>
                        <Button onClick={() => refresh()}>Refresh</Button>
                        <Button
                            onClick={() => {
                                const info = [];
                                for (const row of Object.values(selectCell)) {
                                    for (const cell of Object.values(row)) {
                                        info.push(cell);
                                    }
                                }
                                borderDisabledOpt.setTrue();
                                api.set_board(info)
                                    .then(() => {
                                        message.success('set color successfully');
                                        setSelectCell({});
                                    })
                                    .catch(err => {
                                        message.success('set color error');
                                        console.error(err);
                                    })
                                    .finally(() => {
                                        borderDisabledOpt.setFalse();
                                    });
                            }}
                        >
                            Submit
                        </Button>
                    </Space>
                    <div
                        onClick={showColorPicker}
                        className={styles.current_color}
                        style={{
                            backgroundColor: `rgba(${color.join(',')})`,
                        }}
                    >
                        Current Color
                    </div>
                    <Spin spinning={borderDisabled}>
                        <div
                            className={styles.board}
                            style={
                                {
                                    '--row_size': data.size[0] ?? 0,
                                    '--col_size': data.size[1] ?? 0,
                                } as any
                            }
                        >
                            {board.map((row, i) =>
                                row.map((cell, j) => {
                                    const [r, g, b, a] = selectCell?.[i]?.[j]?.color ??
                                        cell.color ?? [0, 0, 0, 1];
                                    const style: any = {
                                        '--r': r,
                                        '--g': g,
                                        '--b': b,
                                        '--a': a,
                                    };
                                    const key = `${i}:${j}`;
                                    return (
                                        <div
                                            className={cx(styles.cell)}
                                            key={key}
                                            style={style}
                                            onClick={() => {
                                                const newSelectCell = { ...selectCell };
                                                if (!newSelectCell[i]) newSelectCell[i] = {};
                                                if (!newSelectCell[i][j])
                                                    newSelectCell[i][j] = {
                                                        color: [],
                                                        pos: [i, j],
                                                    };
                                                newSelectCell[i][j].color = color;
                                                setSelectCell(newSelectCell);
                                            }}
                                        >
                                            {/* {`${i}:${j}`} */}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </Spin>
                </>
            )}
        </Space>
    );
}
