import { ReactNode } from 'react';
import { RouteObject } from 'react-router';
// import { cachedDynamicImportComponent } from 'src/shared/cached-dynamic-import-component'
// import { LayoutH5 } from 'src/client/components/LayoutH5'
// import LayoutPC from '../components/LayoutPC'

// const Entry = cachedDynamicImportComponent(() => import('src/client/pages/entry'))
// const HomePage = cachedDynamicImportComponent(() => import('src/client/pages/home'))
// const ReportPage = cachedDynamicImportComponent(() => import('src/client/pages/report'))
// const AllPackages = cachedDynamicImportComponent(() => import('src/client/pages/allPackages'))
// const OrderSubmit = cachedDynamicImportComponent(() => import('src/client/pages/orderSubmit'))
// const OrderList = cachedDynamicImportComponent(() => import('src/client/pages/orderList'))
// const OrderDetails = cachedDynamicImportComponent(() => import('src/client/pages/orderDetails'))
// const ReportingService = cachedDynamicImportComponent(() => import('src/client/pages/packageDetail'))
// const Agreement = cachedDynamicImportComponent(() => import('src/client/pages/agreement'))

// const IndustryOrders = cachedDynamicImportComponent(() => import('src/client/pages/admin/industryOrders'))
// const ReportManagement = cachedDynamicImportComponent(() => import('src/client/pages/admin/reportManagement'))
// const PackageManagement = cachedDynamicImportComponent(() => import('src/client/pages/admin/packageManagement'))
// const AuthCodeManagement = cachedDynamicImportComponent(() => import('src/client/pages/admin/authCodeManagement'))

// export const routeMap = {
//   path: '/',
//   entry: {
//     path: '/',
//     element: <Entry />,
//   },
//   h5: {
//     path: '/',
//     element: <LayoutH5 />,
//     home: {
//       path: 'home',
//       element: <HomePage />,
//     },
//     report: { path: 'report', element: <ReportPage /> },
//     order: {
//       path: 'order',
//       list: {
//         path: 'list',
//         element: <OrderList />,
//       },
//       submit: {
//         path: 'submit',
//         element: <OrderSubmit />,
//       },
//       detail: {
//         path: ':id',
//         element: <OrderDetails />,
//       },
//     },
//     agreement: {
//       path: 'agreement',
//       element: <Agreement />,
//     },
//     package: {
//       path: 'package',
//       detail: {
//         path: 'detail',
//         element: <ReportingService />,
//       },
//       list: {
//         path: 'list',
//         element: <AllPackages />,
//       },
//     },
//   },
//   management: {
//     path: '/management',
//     element: <LayoutPC />,
//     order: {
//       path: 'order',
//       industryOrders: {
//         path: 'industry-orders',
//         element: <IndustryOrders />,
//       },
//       reportManagement: {
//         path: 'report-management',
//         element: <ReportManagement />,
//       },
//     },
//     package: {
//       path: 'package',
//       management: {
//         path: 'management',
//         element: <PackageManagement />,
//       },
//     },
//     authCode: {
//       path: 'auth-code-management',
//       element: <AuthCodeManagement />,
//     },
//   },
// }

export type RouteItem = {
    path: string;
    element?: ReactNode;
};

export type RouteMap = RouteItem & Record<string, RouteItem>;

export function createRoutes(routeMap: RouteMap, parents: RouteMap[] = []): RouteObject {
    const obj: RouteObject = {
        path: routeMap.path,
        element: routeMap.element,
        children: [],
    };
    if (routeMap.path.startsWith(':')) routeMap.path = `{${routeMap.path}}`;
    parents.push(routeMap);
    for (const key of Object.keys(routeMap)) {
        if (key === 'path' || key === 'element') continue;
        const item = routeMap[key] as RouteMap;
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

// export const routes = createRoutes(routeMap as any as RouteMap).children!;
