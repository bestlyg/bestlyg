import { App } from '/component.js';

const btn = document.createElement('button');
btn.innerText = 'click to hydrate';
btn.onclick = () => {
    console.log('active hydrate');
    ReactDOM.hydrateRoot(document.getElementById('root'), React.createElement(App));
};

document.body.appendChild(btn);