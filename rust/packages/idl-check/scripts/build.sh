#!/usr/bin/env bash

# rustup target list
# rustup target add x86_64-unknown-linux-gnu
# sudo apt-get install -qq x86_64-unknown-linux-gnu

sysName=$(uname -s)
if [[ $1 != "" ]]; then
    sysName=$1
fi
echo "sysName = $sysName"

build () {
    echo "build $1"
    if [[ $1 == "Darwin" ]]; then
        sysTag=Darwin
        target=x86_64-apple-darwin
    elif [[ $1 == "Linux" ]]; then
        sysTag=Linux
        target=x86_64-unknown-linux-gnu
        # target=x86_64-unknown-linux-musl
    else
        echo "unknown system"
        exit 1
    fi
    
    rm -rf ./target/$sysTag
    cargo build --release --target $target --target-dir ./target/$sysTag
    cp ./target/$sysTag/release/idl-check ../idl-check-demo/scripts/idl-check-$sysTag
}

targetList=("Darwin" "linux")

if [[ $1 == "All" ]]; then 
    for target in ${targetList[*]} 
    do
        build $target
    done
else 
    build $sysName
fi