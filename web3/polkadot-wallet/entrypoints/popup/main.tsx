import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import '@unocss/reset/normalize.css';
import 'virtual:uno.css';
import './style.css';

const root = document.getElementById('root')!;

root.style.width = 'fit-content';
root.style.height = 'fit-content';

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
