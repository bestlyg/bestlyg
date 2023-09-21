rm -rf public
mkdir public

basepath=/Users/bytedance/projects/react-debug

libs=("react" "react-dom")

for lib in ${libs[@]}
do
   libpath=$basepath/build/node_modules/$lib/umd/$lib.development.js
   echo "Copy $lib.development.js from $libpath"
   cp -rf $libpath ./public/$lib.development.js
   echo "Copy $lib.development.js.map from $libpath.map"
   cp -rf $libpath.map ./public/$lib.development.js.map
done