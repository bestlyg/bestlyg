#!/usr/bin/env bash

if [ x$1 != x ];then
    file=$1
else
    file=./script.cpp
fi

if [ "$2" == "d" ];then
    debug="-DDEBUG"
else
    debug=
fi

g++ $file --std=c++11 $debug
./a.out < input
