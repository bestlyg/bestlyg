import { WsProvider, ApiPromise, Keyring } from '@polkadot/api';
import '@polkadot/api-augment';
import { KeyringPair } from '@polkadot/keyring/types';
import type { FrameSystemAccountInfo } from '@polkadot/types/lookup';
// import fs from "node:fs";

const WEB_SOCKET = 'ws://127.0.0.1:9944';
const sleep = (t: number) => new Promise(r => setTimeout(r, t));
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

async function connect() {
    const wsProvider = new WsProvider(WEB_SOCKET);
    const api = await ApiPromise.create({
        provider: wsProvider,
        types: {},
    });
    await api.isReady;
    return api;
}
async function doSomething(api: ApiPromise, alice: KeyringPair, something: number) {
    await api.tx.templateModule.doSomething(something).signAndSend(alice, res => {
        // console.log('Tx status: ', res);
    });
}
async function getSomething(api: ApiPromise) {
    // await api.query.templateModule
    return await api.query.templateModule.something();
}

async function subscribe(api: ApiPromise) {
    await api.query.system.events(events => {
        console.log(`${'='.repeat(20)}Record Event Start${'='.repeat(20)}`);
        events.forEach(event => {
            console.log('index = ', event.event.index.toHuman());
            console.log('data = ', event.event.data.toHuman());
        });
        console.log(`${'='.repeat(20)}Record Event End${'='.repeat(20)}`);
    });
}

async function main() {
    const api = await connect();
    // 获取地址
    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice');
    // 订阅事件
    await subscribe(api);
    // balance获取
    const something = random(0, 1000);
    console.log(`Create random something = ${something}`);
    // 存储
    doSomething(api, alice, something);
    await sleep(10 * 1000);
    // 获取链上状态
    const res = await getSomething(api);
    console.log(`The state of something = ${res}`);
    await sleep(10 * 1000);
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch(err => {
        console.error('err', err);
        process.exit(1);
    });
