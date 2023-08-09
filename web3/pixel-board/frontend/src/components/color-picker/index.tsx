import iro from '@jaames/iro';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import { useBoolean } from 'ahooks';

export function useColorPicker({
    defaultColor = [255, 255, 255, 1],
    onChange,
}: {
    defaultColor?: number[];
    onChange: (v: number[]) => void;
}): {
    show: () => void;
    node: ReactNode;
} {
    const [color, setColor] = useState(defaultColor);
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
    return {
        show: () => visibleOpt.setTrue(),
        node: (
            <Modal
                title="ColorPicker"
                open={visible}
                onCancel={visibleOpt.setFalse}
                onOk={() => {
                    onChange(color);
                    visibleOpt.setFalse();
                }}
            >
                <div ref={colorPickerRef} />
            </Modal>
        ),
    };
}
