# 图像转阴影

<applications name="Image2Shadow" />

## 原理

先利用canvas获取到图片每一个点的颜色信息， 利用dom的`box-shadow`可以放置任意个阴影， 计算偏移后放置每一个像素点。

```tsx title="/src/components/Applications/image2shadow/index.tsx"
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Upload, Button, Space, message, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function getImageData(image: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    // 把图片绘制到canvas上
    ctx.drawImage(image, 0, 0, image.width, image.height);
    // 获取每一个像素点
    const imageData = ctx.getImageData(0, 0, image.width, image.height).data;
    return imageData;
}

export function Image2Shadow() {
    const [file, setFile] = useState<File | null>(null);
    const shadowRef = useRef<HTMLDivElement>();
    const [options, setOptions] = useState<{
        imageData: number[];
        image: HTMLImageElement;
        blurPx: number;
    }>({
        imageData: [],
        image: new Image(),
        blurPx: 0,
    });
    useEffect(() => {
        console.log('Input File', file);
        if (!file || !shadowRef.current) return;
        // 通过File对象，构造出url
        const url = URL.createObjectURL(file);
        const image = new Image();
        // 加载图片到Image对象中
        image.src = url;
        new Promise<void>((resolve, reject) => {
            image.onload = () => {
                console.log('image load success', image, image.width, image.height);
                message.success(
                    `image load success, width : ${image.width} height : ${image.height}`
                );
                resolve();
            };
            image.onerror = e => {
                console.log('image load error', e);
                message.error(`image load error, ${e.toString()}`);
                reject();
            };
        }).then(() => {
            // 加载成功后，通过canvas获取imageData
            setOptions({
                image,
                imageData: Array.from(getImageData(image)),
                blurPx: 0,
            });
        });
    }, [file]);

    useLayoutEffect(() => {
        if (!shadowRef.current) return;
        console.log('options', options);
        const { image, imageData } = options;
        const dom: HTMLDivElement = shadowRef.current;
        dom.style.marginRight = image.width + 'px';
        dom.style.marginBottom = image.height + 'px';
        const shadowlist: string[] = [];
        for (let i = 0; i < imageData.length; i += 4) {
            // imageData每4个为一组，保存着红绿蓝、透明度的信息。
            const [r, g, b, a] = [
                imageData[i],
                imageData[i + 1],
                imageData[i + 2],
                imageData[i + 3],
            ];
            const [widthOffset, heightOffset] = [
                (i / 4) % image.width,
                Math.floor(i / 4 / image.width),
            ];
            shadowlist.push(
                `${widthOffset}px ${heightOffset}px  ${
                    options.blurPx
                }px 1px rgba(${r}, ${g}, ${b}, ${a / 255})`
            );
        }
        dom.style.boxShadow = shadowlist.join(',');
    }, [options]);

    return (
        <Space direction="vertical">
            <Upload
                showUploadList={false}
                beforeUpload={file => {
                    setFile(file);
                    return false;
                }}
                maxCount={1}
                listType="picture"
            >
                <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            <InputNumber
                min={0}
                addonBefore="blurPx"
                addonAfter="px"
                value={options.blurPx}
                onChange={blurPx => {
                    setOptions({ ...options, blurPx });
                }}
            />
            <div ref={shadowRef} id="image2Shadow" style={{ width: 0, height: 0 }}></div>
        </Space>
    );
}

```