import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

const resolve = (...p) => path.resolve(__dirname, '../', ...p);

const delay = t =>
    new Promise<void>(r => {
        setTimeout(() => {
            r();
        }, t);
    });

const sendFile = ({ req, res, filepath, delayTime }) => {
    delay(delayTime).then(() => {
        const html = fs.readFileSync(resolve(filepath));
        res.status(200)
            .setHeader('content-type', 'text/html; charset=UTF-8')
            .setHeader('content-length', html.length)
            .end(html);
    });
};

// console.log(path.resolve(__dirname, './main.ts'));
console.log(require.resolve('react'));

const app = express();
const port = 9001;

app.get('/react.js', (req, res) => {
    res.setHeader('content-type', 'application/javascript; charset=UTF-8');
    const readStream = fs.createReadStream(
        path.resolve(path.dirname(require.resolve('react')), 'umd/react.development.js')
    );
    readStream.pipe(res);
});

app.get('/bundle.js', (req, res) => {
    res.setHeader('content-type', 'application/javascript; charset=UTF-8');
    res.send(`
import React from '/react';
console.log(React);
`);
});

app.get('/', (_: unknown, res: express.Response) => {
    res.send(`
    `);
});

app.listen(port, () => {
    console.log('app listening port ' + port);
    console.log('react version: ' + React.version);
});

function App() {
    const [v, setV] = React.useState(1);
    return React.createElement(
        'div',
        {
            onClick: () => {
                setV(v + 1);
            },
        },
        '[',
        v + '',
        ']'
    );
}
