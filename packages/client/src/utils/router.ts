import { ReactNode } from 'react';
import { RouteObject } from 'react-router';

export type RouteMap = {
    path: string;
    element?: ReactNode;
} & {
    [key: string]: RouteMap;
};

export function createRoutes(routeMap: RouteMap, parents: RouteMap[] = []): RouteObject {
    const { path, element, ...childrenRouteMap } = routeMap;
    const obj: RouteObject = {
        path,
        element,
        children: [],
    };
    if (routeMap.path.startsWith(':')) routeMap.path = `{${routeMap.path}}`;
    parents.push(routeMap);
    for (const key of Object.keys(childrenRouteMap)) {
        const item = childrenRouteMap[key];
        obj.children!.push(createRoutes(item, parents));
    }
    let finalPath = '/';
    for (const parent of parents) {
        if (parent.path.startsWith('/')) {
            finalPath = parent.path;
        } else if (finalPath === '/') {
            finalPath += parent.path;
        } else {
            finalPath += '/' + parent.path;
        }
    }
    parents.pop();
    routeMap.path = finalPath;
    return obj;
}

export function resolveRouteMap<T>(routeMap: T): {
    routes: RouteObject[];
    routeMap: T;
} {
    const routes = createRoutes(routeMap as any as RouteMap).children!;
    return { routes, routeMap };
}
