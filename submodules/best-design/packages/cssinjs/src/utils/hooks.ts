import { useRef } from 'react';

export function usePrevious<T>(val: T, compare = Object.is): T | undefined {
    const oldValRef = useRef<T>();
    const newValRef = useRef<T>();
    if (!compare(oldValRef.current, val)) {
        oldValRef.current = newValRef.current;
        newValRef.current = val;
    }
    return oldValRef.current;
}
