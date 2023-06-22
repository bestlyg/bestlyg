import React, { useState, useEffect } from 'react';
import { Upload, Button, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';

export function Image2Shadow() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, loadingActions] = useBoolean(false);
    useEffect(() => {
        console.log('Input File', file);
        if (file) {
            loadingActions.setTrue();
            const url = URL.createObjectURL(file);
            const image = new Image();
            image.src = url;
            new Promise<void>((resolve, reject) => {
                image.onload = () => {
                    console.log('image load success', image, image.width, image.height);
                    resolve();
                };
                image.onerror = e => {
                    console.log('image load error', e);
                    reject();
                    loadingActions.setFalse();
                };
            }).then(() => {
                const shadowDom = document.getElementById('shadow') as HTMLDivElement;
                shadowDom.style.marginBottom = image.height + 'px';
                const canvas = document.getElementById('canvas') as HTMLCanvasElement;
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                const imageData = ctx.getImageData(0, 0, image.width, image.height).data;
                const rgbaList: string[] = [];
                for (let i = 0; i < imageData.length; i += 4) {
                    const [r, g, b, a] = [
                        imageData[i],
                        imageData[i + 1],
                        imageData[i + 2],
                        imageData[i + 3],
                    ];
                    rgbaList.push(
                        `${(i / 4) % image.width}px ${Math.floor(
                            i / 4 / image.width
                        )}px  0px 1px rgba(${r}, ${g}, ${b}, ${a / 255})`
                    );
                }
                console.log('RGBA List', rgbaList);
                shadowDom.style.boxShadow = rgbaList.join(',');
                loadingActions.setFalse();
            });
        }
    }, [file]);
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
            <div>{loading ? 'loading' : 'done'}</div>

            <canvas id="canvas"></canvas>
            <div id="shadow" style={{ width: 0, height: 0 }}></div>
        </Space>
    );
}
