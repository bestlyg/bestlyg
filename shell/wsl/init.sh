#!/bin/bash

# 换国内源
sudo cp /etc/apt/sources.list /etc/apt/sources_init.list
sudo cp ./sources.list /etc/apt/sources.list
# 更新
sudo apt update
sudo apt upgrade
# c/c++
sudo apt install build-essential

