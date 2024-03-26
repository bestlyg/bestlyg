import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from '@/app';

// const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });

// Setup on page load
// window.onload = async () => {
//   const isSignedIn = await wallet.startUp()
//   console.log("wallet", window.wallet = wallet);
//   ReactDOM.render(
//     <App isSignedIn={isSignedIn} contractId={CONTRACT_ADDRESS} wallet={wallet} />,
//     document.getElementById('root')
//   );
// }

const dom = document.createElement('div');
document.body.appendChild(dom);

const container = createRoot(dom);

container.render(<App />);
