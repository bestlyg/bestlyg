import { ASYNC, DPR } from '@/utils';
import { Canvas } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useCreation } from 'ahooks';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import drawQrcode from './weapp.qrcode.esm.js';

export interface QRCodeProps {
    id: string;
    width: number;
    height: number;
    className?: string;
    style?: React.CSSProperties;
}
export interface QRCodeOptions {
    /** 二维码的计算模式，默认值-1 */
    typeNumber?: number;
    /** 非必须，二维码纠错级别，默认值为高级，取值：{ L: 1, M: 0, Q: 3, H: 2 } */
    correctLevel?: number;
    /** 非必须，二维码背景颜色，默认值白色 #ffffff */
    background?: string;
    /** 非必须，二维码前景色，默认值黑色 #000000 */
    foreground?: string;
    /** 在 canvas 上绘制图片，层级高于二维码 */
    image?: { imageResource: string; dx: number; dy: number; dWidth: number; dHeight: number };
    /** 空白内边距 默认20 */
    padding?: number;
    /** 内边距颜色 默认与background一致 */
    paddingColor?: string;
}
export interface QRCodeRef {
    render: (str: string, options?: QRCodeOptions) => Promise<void>;
    toString: (needRender: boolean, str?: string, options?: QRCodeOptions) => Promise<string>;
    preview: (needRender: boolean, str?: string, options?: QRCodeOptions) => void;
}
export const QRCode = forwardRef<QRCodeRef, QRCodeProps>(function QRCode(
    { id, className = '', style = {}, width, height }: QRCodeProps,
    ref,
) {
    const nodeRef = useRef<any>();
    const query = useCreation(() => Taro.createSelectorQuery(), []);
    function render(str: string, options?: QRCodeOptions) {
        return new Promise<void>(resolve => {
            query
                .select(`#${id}`)
                .fields({
                    node: true,
                    size: true,
                })
                .exec(res => {
                    nodeRef.current = res[0].node;
                    drawQrcode({
                        ...options,
                        canvas: res[0].node,
                        width: width * DPR,
                        height: height * DPR,
                        canvasId: id,
                        text: str,
                    });
                    resolve();
                });
        });
    }
    function toString(needRender: boolean, str?: string, options?: QRCodeOptions) {
        return ASYNC.then(() => {
            if (needRender) {
                return render(str + '', options);
            }
        })
            .then(() => Taro.canvasToTempFilePath({ canvasId: id, canvas: nodeRef.current }))
            .then(res => res.tempFilePath);
    }
    function preview(needRender: boolean, str?: string, options?: QRCodeOptions) {
        return toString(needRender, str, options).then(res =>
            Taro.previewImage({ current: res, urls: [res] }),
        );
    }
    useImperativeHandle(ref, () => ({ render, preview, toString }));
    return (
        <Canvas
            id={id}
            type="2d"
            className={className}
            style={{ width: Taro.pxTransform(width), height: Taro.pxTransform(height), ...style }}
        />
    );
});
