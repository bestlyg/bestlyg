p=/Users/bytedance/projects/react-debug

p_react=$p/build/node_modules/react/umd/react.development.js
p_reactdom=$p/build/node_modules/react-dom/umd/react-dom.development.js

echo $p_react
cp -rf $p_react ./public/react.development.js
cp -rf $p_react.map ./public/react.development.js.map
cp -rf $p_reactdom ./public/react-dom.development.js
cp -rf $p_reactdom.map ./public/react-dom.development.js.map