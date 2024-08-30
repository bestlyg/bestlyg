import { WsProvider, ApiPromise, Keyring } from "@polkadot/api";
import "@polkadot/api-augment";
import { KeyringPair } from "@polkadot/keyring/types";
import type { FrameSystemAccountInfo } from "@polkadot/types/lookup";
import { u8aToString } from "@polkadot/util";
// import fs from "node:fs";

const WEB_SOCKET = "ws://127.0.0.1:9944";
const sleep = (t: number) => new Promise((r) => setTimeout(r, t));
const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

async function connect() {
  const wsProvider = new WsProvider(WEB_SOCKET);
  const api = await ApiPromise.create({
    provider: wsProvider,
    types: {},
  });
  await api.isReady;
  return api;
}

async function main() {
  const api = await connect();
  const value = await api.rpc.offchain.localStorageGet(
    "PERSISTENT",
    "ocw::onchain::tx::key"
  );
  const hexValue = value.toHex();
  const u8aValue = new Uint8Array(
    (hexValue.match(/.{1,2}/g) || []).map((byte) => parseInt(byte, 16))
  );
  const stringValue = u8aToString(u8aValue);
  console.log(`value in offchain storage: [${stringValue}]`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("err", err);
    process.exit(1);
  });
