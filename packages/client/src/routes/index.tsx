import { createBrowserRouter, RouterProvider as InternalRouterProvider } from 'react-router';
import { routes } from './route-map';

export const router = createBrowserRouter(routes);

export function RouterProvider() {
    return <InternalRouterProvider router={router} />;
}

export * from './route-map';
