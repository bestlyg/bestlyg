import { useAtom, useSetAtom } from 'jotai';
import { activeRouteAtom, isConnectedAtom, accountsAtom } from './store';
import { routeMap } from './routes';
import { useMemo } from 'react';
import { sendMessage } from './utils';

function App() {
    const setAccounts = useSetAtom(accountsAtom);
    const [isConnected, setIsConnected] = useAtom(isConnectedAtom);
    useEffect(() => {
        sendMessage('get.isConnected').then(res => {
            setIsConnected(res);
        });
    }, []);
    const [activeRoute, setActiveRoute] = useAtom(activeRouteAtom);
    useMemo(() => {
        if (!isConnected) {
            setActiveRoute(routeMap['connect']);
        } else {
            sendMessage('get.accounts').then(accounts => {
                console.log('===> getaccounts', accounts);
                setAccounts(accounts);
                setActiveRoute(routeMap['home']);
            });
        }
    }, [isConnected]);
    return <activeRoute.Component />;
}

export default App;
