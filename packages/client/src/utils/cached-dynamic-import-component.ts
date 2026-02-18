import React from 'react';
import { IdleTaskQueue } from './idle-task-queue';

const taskQueue = new IdleTaskQueue();

function DefaultFallback() {
    return React.createElement(
        'div',
        { className: 'flex items-center justify-center' },
        'Loading...',
    );
}
/**
 * 缓存动态导入的组件，后续增加路由探测时会增加node端读取路由文件，此时该函数也会被node所读取到
 * 考虑到utils是以ts为结尾，替换文件后缀后会使commit信息变化，使用React.createElement的方式创建组件
 * 在首次加载完后，会把组件存在CachedComponent中，第二次不会再次调用import函数，直接发回CachedComponent
 * 该函数会在引入在路由的时候直接被调用，每一个路由只会调用一次该函数
 * @param load 动态加载组件的函数
 */
export function cachedDynamicImportComponent(
    load: () => Promise<{ default: React.ComponentType<any> }>,
    fallback: React.ReactNode = React.createElement(DefaultFallback),
) {
    // 如果不为null，表明请求过一次，已经缓存了
    let CachedComponent: React.ComponentType | null = null;
    // 封装一次load函数，获取到实际的组件用于缓存
    function dynamicImport() {
        return load().then((mod) => {
            CachedComponent = mod.default;
            return mod;
        });
    }
    // 仅在浏览器端执行，该函数会因为node端需要路由猜测，所以该文件在node端也会被执行
    // 暂时先禁用
    globalThis.window?.addEventListener('load', () => {
        // console.log('ON LOAD');
        taskQueue.addTaskAndRun(dynamicImport);
    });
    // 实际被渲染的组件
    function DynamicImportComponent(props: any) {
        if (CachedComponent) return React.createElement(CachedComponent, { ...props });
        const Component = React.lazy(dynamicImport);
        return React.createElement(
            React.Suspense,
            {
                fallback,
            },
            React.createElement(Component, { ...props }),
        );
    }
    // 挂载一下本身的import函数方便后期处理import
    DynamicImportComponent.load = load;
    return DynamicImportComponent;
}
