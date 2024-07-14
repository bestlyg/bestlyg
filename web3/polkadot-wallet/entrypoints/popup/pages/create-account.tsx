import { mnemonicGenerate } from '@polkadot/util-crypto';
import { Button, Space, Input } from 'antd';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { accountsAtom, activeRouteAtom } from '../store';
import { routeMap } from '../routes';
import { sendMessage } from '../utils';

async function handleCopy(text: string) {
    await navigator.clipboard.writeText(text);
}
export function CreateAccount() {
    const [mnemonic, setMnemonic] = useState<null | string>(null);
    const setAccounts = useSetAtom(accountsAtom);
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
                        onClick={async () => {
                            const accounts = await sendMessage('create-account', {
                                userName,
                                mnemonic,
                            });
                            console.log('create-accounts', accounts);
                            setAccounts(accounts);
                            setActiveRoute(routeMap['home']);
                            console.log('Create account success.');
                        }}
                    >
                        Create account from the mnemonic
                    </Button>
                </>
            )}
        </Space>
    );
}
