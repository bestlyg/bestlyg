import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Space, Button, Typography, Checkbox, Divider } from 'antd';

export function RandomItem() {
    const [data, setData] = useState(new Map());
    const [checkedList, setCheckedList] = useState([]);
    useEffect(() => {
        const doc = document.querySelector('.markdown');
        if (!doc) return;
        // let currentKey = null;
        let currentList = [];
        const map = new Map();
        Array.from(doc.children)
            .filter(dom => {
                const tagName = dom.tagName.toLowerCase();
                return tagName === 'h2' || tagName === 'h3';
            })
            .forEach(dom => {
                const tagName = dom.tagName.toLowerCase();
                if (tagName === 'h2') {
                    // currentKey = dom;
                    currentList = [];
                    map.set(dom, currentList);
                } else if (tagName === 'h3') {
                    currentList.push(dom);
                }
            });
        setData(map);
        setCheckedList(Array.from(map.values()).map(arr => arr.map(dom => dom.innerText)));
    }, []);
    const [cur, setCur] = useState(null);
    // console.log({ data, checkedList, cur });
    return (
        <Space direction="vertical">
            <Typography.Title level={1}>
                {cur?.[0]?.innerText} - {cur?.[1]?.innerText}
            </Typography.Title>
            <Space>
                <Button
                    size="large"
                    type="primary"
                    onClick={() => {
                        const dataToArr = Array.from(data.entries());
                        const picked = _.sample(
                            dataToArr.filter((_, index) => {
                                return checkedList[index].length;
                            }),
                        );
                        const index = dataToArr.indexOf(picked);
                        setCur([
                            picked[0],
                            _.sample(
                                picked[1].filter(dom => {
                                    return checkedList[index].includes(dom.innerText);
                                }),
                            ),
                        ]);
                    }}
                >
                    Random
                </Button>
                <Button
                    size="large"
                    type="primary"
                    onClick={() => {
                        cur?.[1]?.scrollIntoView?.({ behavior: 'smooth' });
                    }}
                >
                    Go
                </Button>
            </Space>
            {Array.from(data.entries()).map(([dom, children], index) => {
                const options = children.map(dom => dom.innerText);
                return (
                    <Space direction="vertical" key={dom.innerText} style={{ width: '100%' }}>
                        <Divider />
                        <Checkbox
                            indeterminate={
                                checkedList[index].length > 0 &&
                                checkedList[index].length < options.length
                            }
                            onChange={e => {
                                const newCheckedList = [...checkedList];
                                newCheckedList[index] = e.target.checked ? options : [];
                                setCheckedList(newCheckedList);
                            }}
                            checked={options.length === checkedList[index].length}
                        >
                            {dom.innerText}
                        </Checkbox>
                        <Checkbox.Group
                            options={options}
                            value={checkedList[index]}
                            onChange={newList => {
                                const newCheckedList = [...checkedList];
                                newCheckedList[index] = newList;
                                setCheckedList(newCheckedList);
                            }}
                        />
                    </Space>
                );
            })}
        </Space>
    );
}
