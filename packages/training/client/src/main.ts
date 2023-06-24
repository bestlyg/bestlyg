import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from '@/app';

console.log(React)
console.log(ReactDOM)

const dom = document.createElement('div');
document.body.appendChild(dom);

const container = createRoot(dom);

container.render(<App />);
