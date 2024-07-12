import { useSetAtom, useAtomValue } from 'jotai';
import { activeRouteAtom, userListAtom } from '../store';
import { routeMap } from '../routes';
import { Button, List, Space } from 'antd';

export function Home() {
    const setActiveRoute = useSetAtom(activeRouteAtom);
    const userList = useAtomValue(userListAtom);
    return (
        <Space direction="vertical" className="max-h-200px w-[200px]">
            {userList.length ? (
                <List
                    itemLayout="horizontal"
                    dataSource={userList}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.userName}
                                description={
                                    <div className="truncate">{item.keyringPair.address}</div>
                                }
                            />
                        </List.Item>
                    )}
                />
            ) : null}
            <Button
                className="w-full"
                type="primary"
                onClick={() => {
                    setActiveRoute(routeMap['create-account']);
                }}
            >
                Create Account
            </Button>
        </Space>
    );
}
