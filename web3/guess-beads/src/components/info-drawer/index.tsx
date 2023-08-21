import { Descriptions, FloatButton, Drawer, Button } from 'antd';
import React from 'react';
import styles from './styles.module.css';
import { SettingOutlined } from '@ant-design/icons';
import { useStore } from '@/store';
import { useBoolean } from 'ahooks';
import { get_account_info } from '@/api';

export function InfoDrawer() {
    const { wallet, isSignedIn } = useStore();
    const [visible, visibleOpt] = useBoolean(!false);
    const signed = isSignedIn();
    return (
        <>
            <FloatButton icon={<SettingOutlined />} onClick={visibleOpt.setTrue} />
            <Drawer title="Info" placement="left" onClose={visibleOpt.setFalse} open={visible}>
                <Descriptions
                    title="Account"
                    column={1}
                    layout="vertical"
                    extra={
                        signed ? (
                            <Button
                                type="link"
                                onClick={() => {
                                    get_account_info().then(res => {
                                        console.log(res);
                                    });
                                }}
                            >
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
                                <Button type="link">Deposit</Button>
                            </>
                        ) : (
                            <Button type="link" onClick={() => wallet?.signIn()}>
                                SignIn
                            </Button>
                        )}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions
                    title="Environment"
                    column={1}
                    layout="vertical"
                    // extra={signed ? <SignOutButton /> : <SignInPrompt />}
                >
                    <Descriptions.Item label="network">{wallet?.network}</Descriptions.Item>
                </Descriptions>
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
