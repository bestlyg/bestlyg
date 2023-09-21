const fs = require('fs');
const path = require('path');
const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');

const { App } = require('./component.server.js');

const resolve = (...p) => path.resolve(__dirname, ...p);

const app = express();
const port = 9001;

console.log(resolve(require.resolve('react'), '../umd', 'react.development.js'));

app.get('/react.js', (_, res) => {
    res.setHeader('content-type', 'application/javascript; charset=utf-8');
    fs.createReadStream(resolve(require.resolve('react'), '../umd', 'react.development.js')).pipe(
        res
    );
});

app.get('/react-dom.js', (_, res) => {
    res.setHeader('content-type', 'application/javascript; charset=utf-8');
    fs.createReadStream(
        resolve(require.resolve('react-dom'), '../umd', 'react-dom.development.js')
    ).pipe(res);
});

app.get('/bundle.js', (_, res) => {
    res.setHeader('content-type', 'application/javascript; charset=utf-8');
    fs.createReadStream(resolve('bundle.js')).pipe(res);
});

app.get('/component.js', (_, res) => {
    res.setHeader('content-type', 'application/javascript; charset=utf-8');
    fs.createReadStream(resolve('component.client.js')).pipe(res);
});

app.get('/', (req, res) => {
    res.setHeader('content-type', 'text/html; charset=utf-8');
    let fileToString = fs.readFileSync(resolve('index.html')).toString();
    fileToString = fileToString.replace(
        '{{body}}',
        `
    <div id="root"> ${renderToString(React.createElement(App))}</div>
    <script src="/bundle.js" defer type="module"></script>
    `
    );
    res.send(fileToString);
});

app.listen(port, () => {
    console.log('App listening : ' + port);
});
