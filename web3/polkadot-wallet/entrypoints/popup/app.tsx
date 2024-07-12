import { useAtom, useAtomValue } from 'jotai';
import { activeRouteAtom, isConnectedAtom } from './store';
import { routeMap } from './routes';
import { useLayoutEffect, useMemo } from 'react';

function App() {
    const isConnected = useAtomValue(isConnectedAtom);
    const [activeRoute, setActiveRoute] = useAtom(activeRouteAtom);
    useMemo(() => {
        if (!isConnected) {
            setActiveRoute(routeMap['connect']);
        }
    }, [isConnected]);
    return <activeRoute.Component />;
}

export default App;
