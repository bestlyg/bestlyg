#!/usr/bin/env bash

hookName="$(basename "$0")"
sysName=$(uname -s)

list=$( 
    git status -s |          # 获取git文件状态列表
    grep -E "^[AM]{1}  .*" | # 获取列表中修改和新增的文件
    grep -E "\.proto$" |     # 获取列表中.proto结尾的文件
    awk '{print $2}' |       # 去除前面的AM
    sed "s/^/.\/&/g"         # 在文件前面增加./拼接路径
)
echo "===[LIST]==="
echo "$list"

if [[ ${sysName} == "Darwin" ]]; then
    sysTag=Darwin
elif [[ ${sysName} == "Linux" ]]; then
    sysTag=Linux
else
    echo "unknown system"
    exit 1
fi

./scripts/idl-check-$sysTag --includes ./idl --inputs $list