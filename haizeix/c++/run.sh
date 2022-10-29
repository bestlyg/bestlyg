#! env /bin/bash
g++ ./main.cpp --std=c++11
./a.out < input
rm -rf ./a.out