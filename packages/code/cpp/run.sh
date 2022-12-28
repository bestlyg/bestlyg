#! env /bin/bash
g++ ./script.cpp --std=c++11
./a.out < input
rm -rf ./a.out