#!/bin/sh

./build.sh

if [ $? -ne 0 ]; then
  echo ">> Error building contract"
  exit 1
fi

echo ">> Deploying contract"
# https://docs.near.org/tools/near-cli#near-dev-deploy
near deploy                                                                      \
  --wasmFile ./target/wasm32-unknown-unknown/release/bestlyg_pixel_board_contract.wasm             \
  --node_url https://near-testnet.infura.io/v3/f7c0b2130fd6470fbbdb7e12c0a17d7f  \
  --accountId bestlyg-pixel-board.testnet                                             \
  --force                                                                        \
  --initFunction init                                                            \
  --initArgs '{"owner_id":"bestlyg.testnet","row_size":20,"col_size":20}'        \
  --initGas 100000000000000