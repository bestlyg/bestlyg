import { noop } from '@/utils';
import { useToggle, useSafeState, useBoolean, useMemoizedFn, useCreation } from 'ahooks';

export enum OpType {
    CREATE,
    EDIT,
}
export interface OpProps<T extends any = any> {
    type: OpType;
    setType: (value: OpType) => void;
    toggleType: () => void;
    setCreateType: () => void;
    setEditType: () => void;
    isCreateType: boolean;
    isEditType: boolean;
    payload: T | null;
    setPayload: (payload: null) => void;
    // visible
    visible: boolean;
    toggleVisible: () => void;
    setVisible: (value: boolean) => void;
    showVisible: () => void;
    hiddenVisible: () => void;
    // ops
    onShow: (data?: {
        payload?: T | null | undefined;
        type?: OpType | undefined;
        data?: unknown;
    }) => void;
    onHidden: (data?: { data: unknown }) => void;
}
export function useOp<T extends any = any>({
    visible: _visible = false,
    payload: _payload = null,
    afterShow = noop,
    afterHidden = noop,
    beforeShow = noop,
    beforeHidden = noop,
}: {
    visible?: boolean;
    payload?: T | null;
    afterShow?: (data: unknown) => void;
    afterHidden?: (data: unknown) => void;
    beforeShow?: (data: unknown) => void;
    beforeHidden?: (data: unknown) => void;
} = {}): OpProps<T> {
    const [
        type,
        { toggle: toggleType, set: setType, setLeft: setCreateType, setRight: setEditType },
    ] = useToggle(OpType.CREATE, OpType.EDIT);
    const isCreateType = useCreation(() => type === OpType.CREATE, [type]);
    const isEditType = useCreation(() => type === OpType.EDIT, [type]);
    const [payload, setPayload] = useSafeState(_payload);
    const [
        visible,
        { toggle: toggleVisible, set: setVisible, setTrue: showVisible, setFalse: hiddenVisible },
    ] = useBoolean(_visible);
    const onShow = useMemoizedFn(
        ({
            payload = null,
            type = OpType.CREATE,
            data,
        }: { payload?: T | null; type?: OpType; data?: unknown } = {}) => {
            beforeShow(data);
            showVisible();
            setPayload(payload);
            setType(type);
            afterShow(data);
        }
    );
    const onHidden = useMemoizedFn(({ data }: { data?: unknown } = {}) => {
        beforeHidden(data);
        hiddenVisible();
        afterHidden(data);
    });
    return {
        // type
        type,
        setType,
        toggleType,
        setCreateType,
        setEditType,
        isCreateType,
        isEditType,
        // payload
        payload,
        setPayload,
        // visible
        visible,
        toggleVisible,
        setVisible,
        showVisible,
        hiddenVisible,
        // ops
        onShow,
        onHidden,
    };
}
