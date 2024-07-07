import { Input, Button, Space } from 'antd';
import { apiAtom, isConnectedAtom, connectingAtom, activeRouteAtom } from '../store';
import { useSetAtom, useAtom } from 'jotai';
import { WsProvider, ApiPromise } from '@polkadot/api';
import { routeMap } from '../routes';

export function Connect() {
    const [url, setUrl] = useState('ws://127.0.0.1:9944');
    const setIsConnected = useSetAtom(isConnectedAtom);
    const setApi = useSetAtom(apiAtom);
    const [connecting, setConnecting] = useAtom(connectingAtom);
    const setActiveRoute = useSetAtom(activeRouteAtom);
    async function handleConnect() {
        const wsProvider = new WsProvider(url);
        const api = await ApiPromise.create({
            provider: wsProvider,
            types: {},
        });
        await api.isReady;
        setApi(api);
        setIsConnected(true);
        setActiveRoute(routeMap.home);
        console.log(`${url} is connected.`);
    }
    return (
        <Space direction="vertical">
            <Input
                value={url}
                onChange={e => {
                    setUrl(e.target.value);
                }}
            />
            <Button
                loading={connecting}
                onClick={() => {
                    setConnecting(true);
                    handleConnect()
                        .catch(err => {
                            console.log('connect fail.');
                            console.error(err);
                        })
                        .finally(() => {
                            setConnecting(false);
                        });
                }}
            >
                Connect
            </Button>
        </Space>
    );
}
