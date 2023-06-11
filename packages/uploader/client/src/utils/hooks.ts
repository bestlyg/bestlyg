import { useCallback, useState, useRef } from 'react';

export function useUpdate() {
    const [state, setState] = useState(false);
    const updateRef = useRef(() => {});
    updateRef.current = () => setState(!state);
    return useCallback(() => updateRef.current(), []);
}
