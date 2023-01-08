#!/usr/bin/env bash

# rustup target list
# rustup target add x86_64-unknown-linux-gnu
# sudo apt-get install -qq x86_64-unknown-linux-gnu


cargo build --release --target=x86_64-unknown-linux-musl

rm -rf ~/Desktop/idl-check
cp ./target/x86_64-unknown-linux-musl/release/idl-check ~/Desktop/idl-check-1