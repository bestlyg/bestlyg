/**
 * 注意，这里没有设置 icon 的默认大小，你需要手动设置
 * 现在支持通过 color 属性设置颜色，如不提供则使用图标原本的颜色
 *
 * 技巧：
 * 1. 让 icon 支持深浅主题的方法：找到 fill 或者 stroke 属性，将其改为 fill="currentColor" 或者 stroke="currentColor"
 * 2. 去掉 svg 根标签中的 width 和 height 属性，SvgIcon 会使用 className 来设置
 *
 * 从 iconfont 中添加 Icon 的方法：https://mk70znjkuv.feishu.cn/wiki/B3UMwNOJ1iFX4mkpVJRcG55inub#X6DqdYtg2ofEgKx505xcnH9Mnoh
 */

import { forwardRef } from 'react';
import clsx from 'clsx';

export const SvgIcon = forwardRef(function SvgIconInner(
    {
        icon,
        ...restProps
    }: { icon: string } & React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
    ref: React.Ref<HTMLDivElement>,
) {
    return (
        <div
            {...restProps}
            className={clsx('flex items-center justify-center', restProps.className)}
            ref={ref}
            dangerouslySetInnerHTML={{ __html: icon }}
        />
    );
});

function hasExplicitIconSize(className?: string) {
    return className ? /(?:^|\s)(?:size-|w-|h-)/.test(className) : false;
}

/** 默认跟随 font-size，显式传入 size/w/h 时使用调用方尺寸，另外这里大小会自适应 */
export const SvgIconContain = forwardRef(function SvgIconInner(
    { icon, className, ...restProps }: { icon: string; className?: string },
    ref: React.Ref<HTMLDivElement>,
) {
    return (
        <div
            className={clsx(!hasExplicitIconSize(className) && 'size-[1em]', className)}
            {...restProps}
            ref={ref}
            dangerouslySetInnerHTML={{
                __html: icon.replace(
                    /<svg([^>]*)>/g,
                    '<svg$1 style="width: 100%; height: 100%; object-fit: contain;">',
                ),
            }}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        />
    );
});
