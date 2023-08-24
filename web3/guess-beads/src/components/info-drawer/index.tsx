import { Descriptions, FloatButton, Drawer, Button, Spin, Modal, InputNumber, message } from 'antd';
import { utils } from 'near-api-js';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { SettingOutlined } from '@ant-design/icons';
import { useStore } from '@/store';
import { useBoolean } from 'ahooks';
import {
    deposit_account_balance,
    get_account_balance,
    get_account_info,
    withdraw_account_balance,
} from '@/api';

export function InfoDrawer() {
    const { wallet, isSignedIn, account, setAccount } = useStore();
    const [visible, visibleOpt] = useBoolean(false);
    const [loading, loadingOpt] = useBoolean(false);
    const signed = isSignedIn();
    const onRefreshAccount = () => {
        loadingOpt.setTrue();
        get_account_balance()
            .then(res => {
                const newAccount = { ...account, balance: res };
                setAccount(newAccount);
            })
            .finally(() => {
                loadingOpt.setFalse();
            });
    };

    const modalDataRef = useRef({
        balance: utils.format.parseNearAmount('1'),
    });
    const onDeposit = () => {
        Modal.confirm({
            title: 'Deposit',
            content: (
                <InputNumber<string>
                    style={{ width: '100%' }}
                    addonAfter="NEAR"
                    min="0"
                    onChange={e => {
                        modalDataRef.current.balance = utils.format.parseNearAmount(e);
                    }}
                    defaultValue="1"
                    step="0.00000000000001"
                    stringMode
                />
            ),
            onOk: () => {
                return deposit_account_balance({
                    deposit: modalDataRef.current.balance,
                }).then(res => {
                    const newAccount = { ...account, balance: res };
                    setAccount(newAccount);
                });
            },
        });
    };
    const onWithdraw = () => {
        Modal.confirm({
            title: 'Deposit',
            content: (
                <InputNumber<string>
                    style={{ width: '100%' }}
                    addonAfter="NEAR"
                    min="0"
                    onChange={e => {
                        modalDataRef.current.balance = utils.format.parseNearAmount(e);
                    }}
                    defaultValue="1"
                    step="0.00000000000001"
                    stringMode
                />
            ),
            onOk: () => {
                return withdraw_account_balance({
                    balance: modalDataRef.current.balance,
                }).then(res => {
                    message.success('withdraw success.');
                    const newAccount = { ...account, balance: res };
                    setAccount(newAccount);
                });
            },
        });
    };
    return (
        <>
            <FloatButton icon={<SettingOutlined />} onClick={visibleOpt.setTrue} />
            <Drawer title="Info" placement="left" onClose={visibleOpt.setFalse} open={visible}>
                <Spin spinning={loading}>
                    <Descriptions
                        title="Account"
                        column={1}
                        layout="vertical"
                        extra={
                            signed ? (
                                <Button type="link" onClick={onRefreshAccount}>
                                    Refresh
                                </Button>
                            ) : null
                        }
                    >
                        {signed ? (
                            <>
                                <Descriptions.Item label="Account">
                                    {wallet.accountId}
                                </Descriptions.Item>
                                <Descriptions.Item label="Balance">
                                    {utils.format.formatNearAmount(account.balance.toString())}
                                    {` NEAR`}
                                </Descriptions.Item>
                            </>
                        ) : (
                            <>
                                <Descriptions.Item label="Account">Unknown</Descriptions.Item>
                            </>
                        )}
                        <Descriptions.Item label="Operation">
                            {signed ? (
                                <>
                                    <Button type="link" onClick={() => wallet?.signOut()}>
                                        SignOut
                                    </Button>
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            onDeposit();
                                        }}
                                    >
                                        Deposit
                                    </Button>
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            onWithdraw();
                                        }}
                                    >
                                        Withdraw
                                    </Button>
                                </>
                            ) : (
                                <Button type="link" onClick={() => wallet?.signIn()}>
                                    SignIn
                                </Button>
                            )}
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions
                        title="Rules"
                        column={1}
                        layout="vertical"
                        // extra={signed ? <SignOutButton /> : <SignInPrompt />}
                    >
                        <Descriptions.Item label="rule">
                            <div>
                                <div>Pick random 12 beads from 24 beads.</div>
                                <div>You need least 11 balance in your account.</div>
                                <div>Every time pick, you will cost 1 NEAR.</div>
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="Reward 100 NEAR">[0, 4, 8]</Descriptions.Item>
                        <Descriptions.Item label="Reward 50 NEAR">[0, 5, 7],[0, 6, 6]</Descriptions.Item>
                        <Descriptions.Item label="Reward 30 NEAR">[1, 3, 8],[2, 2, 8]</Descriptions.Item>
                        <Descriptions.Item label="Reward 20 NEAR">[1, 4, 7],[2, 3, 7]</Descriptions.Item>
                        <Descriptions.Item label="Reward 2 NEAR">
                            [1, 5, 6],[2, 4, 6],[3, 3, 6],[2, 5, 5],[4, 4, 4]
                        </Descriptions.Item>
                        <Descriptions.Item label="Reward -1 NEAR">[3, 4, 5]</Descriptions.Item>
                    </Descriptions>
                    <Descriptions
                        title="Environment"
                        column={1}
                        layout="vertical"
                        // extra={signed ? <SignOutButton /> : <SignInPrompt />}
                    >
                        <Descriptions.Item label="network">{wallet?.network}</Descriptions.Item>
                    </Descriptions>
                </Spin>
            </Drawer>
        </>
        // <div>123</div>
        // <Card className={styles.account} title="Account Info" bordered={false}>
        //     <Space direction="vertical">
        //         <div>Account Name : {wallet.accountId}</div>
        //         {/* <div>Balance : {wallet.accountId}</div> */}
        //     </Space>
        // </Card>
    );
}
