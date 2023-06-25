import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Upload, Button, Space, message, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { isServer } from '@/src/utils';

function getImageData(image: HTMLImageElement) {
    if (isServer) return [];
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);
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
        image: isServer ? null : new Image(),
        blurPx: 0,
    });
    useEffect(() => {
        console.log('Input File', file);
        if (!file || !shadowRef.current) return;
        const url = URL.createObjectURL(file);
        const image = new Image();
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
