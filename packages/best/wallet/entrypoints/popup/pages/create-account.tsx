import { Keyring } from '@polkadot/keyring';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { Button, Space, Input } from 'antd';
import { useAtom, useSetAtom } from 'jotai';
import { useState } from 'react';
import { userListAtom, activeRouteAtom } from '../store';
import { routeMap } from '../routes';

async function handleCopy(text: string) {
    await navigator.clipboard.writeText(text);
}
export function CreateAccount() {
    const [mnemonic, setMnemonic] = useState<null | string>(null);
    const [userList, setUserList] = useAtom(userListAtom);
    const setActiveRoute = useSetAtom(activeRouteAtom);
    const [userName, setUserName] = useState('username');
    return (
        <Space direction="vertical">
            <Input
                value={userName}
                onChange={e => {
                    setUserName(e.target.value);
                }}
            />
            {mnemonic && <div className="">{mnemonic}</div>}
            <Button
                onClick={() => {
                    setMnemonic(mnemonicGenerate(12));
                }}
            >
                Create random mnemonic
            </Button>
            {mnemonic && (
                <>
                    <Button
                        onClick={() => {
                            handleCopy(mnemonic).then(
                                () => {
                                    console.log('Copy to clickboard success.');
                                },
                                err => {
                                    console.log('Copy to clickboard fail.');
                                    console.error(err);
                                }
                            );
                        }}
                    >
                        Copy the mnemonic
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => {
                            const keyring = new Keyring();
                            const newPair = keyring.addFromUri(mnemonic);
                            setUserList([...userList, { keyringPair: newPair, userName }]);
                            console.log('Create account success.');
                            setActiveRoute(routeMap['home']);
                        }}
                    >
                        Create account from the mnemonic
                    </Button>
                </>
            )}
        </Space>
    );
}
