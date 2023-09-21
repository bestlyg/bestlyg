import { ASYNC } from '@/utils';
import './styles/global.css'
import './styles/global.scss'
import './styles/global.less'

export default function App() {
    console.log('app render', ASYNC);
    return <div>app render</div>;
}
