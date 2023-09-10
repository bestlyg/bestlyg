import { WsProvider, ApiPromise, Keyring } from "@polkadot/api";
import "@polkadot/api-augment";
import { KeyringPair } from "@polkadot/keyring/types";
import type { FrameSystemAccountInfo } from "@polkadot/types/lookup";
// import fs from "node:fs";

const WEB_SOCKET = "ws://127.0.0.1:9944";
const sleep = (t: number) => new Promise((r) => setTimeout(r, t));
async function connect() {
  const wsProvider = new WsProvider(WEB_SOCKET);
  const api = await ApiPromise.create({
    provider: wsProvider,
    types: {},
  });
  await api.isReady;
  return api;
}

async function getConst(api: ApiPromise) {
  const existentialDeposit =
    await api.consts.balances.existentialDeposit.toHuman();
  return existentialDeposit;
}

async function getFreeBalance(api: ApiPromise, address: string) {
  const {
    data: { free },
  }: FrameSystemAccountInfo = await api.query.system.account(address);
  return free;
}
async function transfer(
  api: ApiPromise,
  alice: KeyringPair,
  bob: string,
  amount: number
) {
  await api.tx.balances.transfer(bob, amount).signAndSend(alice, (res) => {
    // console.log("Tx status: ", res);
  });
}

async function getMetadata(api: ApiPromise) {
  const metadata = await api.rpc.state.getMetadata();
  return metadata.toString();
}

// async function subscribe(api: ApiPromise, address: string) {
//   await api.query.system.account(address, (info) => {
//     const free = info.data.free;
//     console.log("free balance is: ", free.toHuman());
//   });
// }

async function subscribe(api: ApiPromise) {
  await api.query.system.events((events) => {
    console.log(`${"=".repeat(20)}Record Event Start${"=".repeat(20)}`);
    events.forEach((event) => {
      console.log("index = ", event.event.index.toHuman());
      console.log("data = ", event.event.data.toHuman());
    });
    console.log(`${"=".repeat(20)}Record Event End${"=".repeat(20)}`);
  });
}

async function main() {
  const api = await connect();
  // 获取地址
  const keyring = new Keyring({ type: "sr25519" });
  const alice = keyring.addFromUri("//Alice");
  const bob = keyring.addFromUri("//Bob");
  // 订阅事件
  await subscribe(api);
  // balance获取
  let alice_balance = await getFreeBalance(api, alice.address);
  let bob_balance = await getFreeBalance(api, bob.address);
  console.log(
    `alice_balance = ${alice_balance.toHuman()}, bob_balance = ${bob_balance.toHuman()}`
  );
  await transfer(api, alice, bob.address, 10 ** 10 + 1);
  await sleep(10 * 1000);
  alice_balance = await getFreeBalance(api, alice.address);
  bob_balance = await getFreeBalance(api, bob.address);
  console.log(
    `alice_balance = ${alice_balance.toHuman()}, bob_balance = ${bob_balance.toHuman()}`
  );

  // 获取 metadata
  // const metadata = await getMetadata(api);
  // console.log("===> metadata");
  // console.log(metadata);
  // fs.writeFileSync("./metadata.json", metadata);
  await sleep(50 * 1000);
  console.log("main");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("err", err);
    process.exit(1);
  });
