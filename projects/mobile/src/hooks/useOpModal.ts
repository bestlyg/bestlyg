import { useState, useCallback, useRef, useEffect } from 'react';
import { isFunction } from 'lodash';
import { useToggle, useBoolean } from 'ahooks';
import { noop } from '@/utils';

export enum OpModalType {
  CREATE,
  EDIT,
}
export interface OpModal<T extends any = {}> {
  type: OpModalType;
  visible: boolean;
  payload: T;
  onCreate: () => void;
  onEdit: (payload: T) => void;
  onHidden: () => void;
  onOpen: (fn: () => void) => void;
}
export const useOpModal = <T extends any = {}>(initVisible = false) => {
  const [type, { setLeft, setRight }] = useToggle(OpModalType.CREATE, OpModalType.EDIT);
  const [visible, { setTrue, setFalse }] = useBoolean(initVisible);
  const [payload, _setPayload] = useState({} as T);
  const setPayload = useCallback((payload: T) => {
    if (isFunction(payload)) _setPayload(() => payload);
    else _setPayload(payload);
  }, []);
  const openRef = useRef<() => void>(noop);
  useEffect(() => {
    visible && openRef.current();
  }, [visible]);
  return {
    type,
    visible,
    payload,
    onCreate: useCallback(() => {
      setLeft();
      setTrue();
    }, [setLeft, setTrue]),
    onEdit: useCallback(
      (payload: T) => {
        setPayload(payload);
        setRight();
        setTrue();
      },
      [setPayload, setRight, setTrue]
    ),
    onHidden: setFalse(),
    onOpen: useCallback((fn: () => void) => {
      openRef.current = fn;
    }, []),
  };
};
