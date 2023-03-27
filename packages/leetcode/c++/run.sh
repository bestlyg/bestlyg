#!/usr/bin/env bash

if [ x$2 != x ];then
    file=$2
else
    file=./main.cpp
fi

if [ "$1" == "d" ];then
    debug="-DDEBUG"
else
    debug=
fi

g++ $file --std=c++17 -DLOCAL $debug -O2
./a.out < input
