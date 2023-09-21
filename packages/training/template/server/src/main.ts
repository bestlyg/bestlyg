import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

const resolve = (...p) => path.resolve(__dirname, '../', ...p);
const delay = t => new Promise<void>(r => setTimeout(() => r(), t));

const app = express();
const port = 3001;

app.get('/', (_: unknown, res: express.Response) => {
    res.send(`app`);
});

app.listen(port, () => {
    console.log('app listening port ' + port);
    console.log('react version: ' + React.version);
});
