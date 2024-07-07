import { Connect } from './pages/connect';
import { Home } from './pages/home';
import { CreateAccount } from './pages/create-account';

export interface Route {
    key: string;
    Component: React.FC;
}

export const routes: Route[] = [
    { key: 'home', Component: Home },
    { key: 'connect', Component: Connect },
    { key: 'create-account', Component: CreateAccount },
];

export const routeMap = routes.reduce((map, route) => {
    map[route.key] = route;
    return map;
}, {} as Record<string, Route>);
