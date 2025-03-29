import {
    createBrowserRouter,
    RouterProvider as InternalRouterProvider,
    RouteObject,
} from 'react-router';
import { createRoutes, RouteMap } from '@bestlyg/common/client';
import { routeMap } from './route-map';

export const routes = createRoutes(routeMap as any as RouteMap).children!;

export const router = createBrowserRouter(routes as any as RouteObject[]);

export function RouterProvider() {
    return <InternalRouterProvider router={router} />;
}

export * from './route-map';
