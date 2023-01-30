#!/usr/bin/env bash

if [ x$1 != x ];then
    file=$1
else
    file=./main.cpp
fi

if [ "$2" == "d" ];then
    debug="-DDEBUG"
else
    debug=
fi

g++ $file --std=c++17 -DLOCAL $debug -O2
./a.out < input
