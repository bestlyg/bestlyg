import iro from '@jaames/iro';
import React, { useEffect, useRef } from 'react';
import { Button, Modal } from 'antd';
import { useBoolean } from 'ahooks';

export function ColorPicker({
    color,
    setColor,
}: {
    color: number[];
    setColor: (v: number[]) => void;
}) {
    const [visible, visibleOpt] = useBoolean();
    const colorPickerRef = useRef(null);
    const colorPickerInstanceRef = useRef(null as iro.ColorPicker);
    useEffect(() => {
        if (!colorPickerRef.current) return;
        const [r, g, b, a] = color;
        const colorPicker = (colorPickerInstanceRef.current = new (iro.ColorPicker as any)(
            colorPickerRef.current,
            {
                color: { r, g, b, a },
            }
        ));
        colorPicker.on('color:change', function (color: any) {
            //将当前颜色记录为十六进制字符串
            const { r, g, b, a } = color.rgba;
            setColor([r, g, b, a]);
        });
    }, [visible]);
    return (
        <>
            <Button onClick={visibleOpt.setTrue}>Set Color</Button>
            <Modal
                title="ColorPicker"
                open={visible}
                onCancel={visibleOpt.setFalse}
                onOk={() => {
                    visibleOpt.setFalse();
                }}
            >
                <div ref={colorPickerRef} />
            </Modal>
        </>
    );
}
