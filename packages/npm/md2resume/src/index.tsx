import '@ant-design/v5-patch-for-react-19';
import ReactDOM from 'react-dom/client';
import App from './app';
import './styles/global.less';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
