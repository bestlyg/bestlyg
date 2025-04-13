import React from 'react';
import { ScrollController, ScrollPosition, ScrollViewProvider } from './utils';
import { debounce } from 'lodash';
import { useScrollController, useResize, useScrollbarVisible } from './hooks';
import clsx from 'clsx';
import { Resizing } from './resizing';
import styles from './scroll-view.module.less'

export interface ScrollViewProps {
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode | ((controller: ScrollController) => React.ReactNode);
    scrollableClassName?: string;
    childrenWrapperClassName?: string;
    after?: React.ReactNode | ((controller: ScrollController) => React.ReactNode);
    before?: React.ReactNode | ((controller: ScrollController) => React.ReactNode);
    innerBefore?: React.ReactNode | ((controller: ScrollController) => React.ReactNode);
    reverse?: boolean;
    reachTopThreshold?: number;
    onReachTop?: () => void;
    onLeaveTop?: () => void;
    reachBottomThreshold?: number;
    onReachBottom?: () => void;
    onLeaveBottom?: () => void;
    showScrollbar?: boolean;
    autoShowScrollbar?: boolean;
    onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
    bottomAttaching?: boolean;
}

export const ScrollView = React.forwardRef<ScrollController, ScrollViewProps>((props, ref) => {
    const {
        before,
        style,
        className,
        children,
        scrollableClassName,
        childrenWrapperClassName,
        after,
        innerBefore,
        reachTopThreshold,
        onReachTop,
        onLeaveTop,
        reachBottomThreshold,
        onReachBottom,
        onLeaveBottom,
        showScrollbar,
        autoShowScrollbar,
        onScroll,
        reverse = false,
        bottomAttaching = false,
        ...restProps
    } = props;

    const defaultPosition: ScrollPosition = reverse ? ScrollPosition.BOTTOM : ScrollPosition.TOP;
    const scrollStatusRef = React.useRef<ScrollPosition>(defaultPosition);

    const isScrollingRef = React.useRef(false);
    const scrollController = useScrollController({
        reverse,
        scrollStatusRef,
        onBeforeScroll: () => {
            isScrollingRef.current = true;
        },
    });

    const { getScrollTop, getScrollBottom } = scrollController.controller;
    const isNearTopRef = React.useRef(false);
    const isNearBottomRef = React.useRef(false);

    const { onScroll: handleScrollbarVisibility } = useScrollbarVisible({
        onVisibleChange: visible => {
            const dom = scrollController.ref.current;
            if (!dom) return;
            if (visible) {
                dom.classList.add(styles.showScrollbarThumb);
            } else {
                dom.classList.remove(styles.showScrollbarThumb);
            }
        },
    });

    React.useImperativeHandle(ref, () => scrollController.controller, [
        scrollController.controller,
    ]);

    const updateScrollStatus = React.useMemo(
        () =>
            debounce((position: ScrollPosition) => {
                scrollStatusRef.current = position;
            }, 100),
        [],
    );

    const { handleResize } = useResize({
        controller: scrollController.controller,
        enable: !reverse && bottomAttaching,
    });

    const handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
        const isScrolling = isScrollingRef.current;
        isScrollingRef.current = false;

        if (!event.currentTarget) return;
        onScroll?.(event);

        const { offsetHeight } = event.currentTarget;
        const topThreshold = reachTopThreshold ?? offsetHeight;
        const bottomThreshold = reachBottomThreshold ?? offsetHeight;

        // Check if reached top
        if (getScrollTop() < topThreshold) {
            if (!isNearTopRef.current) {
                isNearTopRef.current = true;
                onReachTop?.();
            }
        } else {
            if (isNearTopRef.current) {
                isNearTopRef.current = false;
                onLeaveTop?.();
            }
        }

        // Check if reached bottom
        if (getScrollBottom() < bottomThreshold) {
            if (!isNearBottomRef.current) {
                isNearBottomRef.current = true;
                onReachBottom?.();
            }
        } else {
            if (isNearBottomRef.current) {
                isNearBottomRef.current = false;
                onLeaveBottom?.();
            }
        }

        // Update scroll position status
        scrollStatusRef.current = ScrollPosition.INNER;
        if (getScrollTop() <= 0 && getScrollBottom() <= 0) {
            updateScrollStatus(defaultPosition);
        } else if (getScrollTop() <= 0) {
            updateScrollStatus(ScrollPosition.TOP);
        } else if (getScrollBottom() <= 0) {
            updateScrollStatus(ScrollPosition.BOTTOM);
        } else {
            updateScrollStatus(ScrollPosition.INNER);
        }

        if (!isScrolling) {
            handleScrollbarVisibility();
        }
    };

    const renderContent = (): React.ReactNode => {
        const content =
            typeof children === 'function' ? children(scrollController.controller) : children;
        if (reverse) {
            return content;
        }
        return (
            <Resizing onResize={handleResize}>
                {resizeRef => (
                    <div
                        ref={resizeRef}
                        className={clsx(
                            styles.childrenWrapper,
                            'children-wrapper',
                            childrenWrapperClassName,
                        )}
                    >
                        {content}
                    </div>
                )}
            </Resizing>
        );
    };

    return (
        <ScrollViewProvider
            containerRef={scrollController.ref}
            controller={scrollController.controller}
        >
            <div className={clsx(styles.scrollView, className)} style={style}>
                {before && (
                    <div className={styles.before}>
                        {typeof before === 'function'
                            ? before(scrollController.controller)
                            : before}
                    </div>
                )}

                <div className={clsx(styles.content)}>
                    <div
                        ref={scrollController.ref}
                        className={clsx(styles.scrollable, scrollableClassName, {
                            [styles.reverse]: reverse,
                            [styles.showScrollbar]: showScrollbar,
                            [styles.autoShowScrollbar]: autoShowScrollbar,
                        })}
                        onScroll={handleScroll}
                        {...restProps}
                    >
                        {renderContent()}
                        {/* 内部前置内容 */}
                        {innerBefore && (
                            <div className={styles.before}>
                                {typeof innerBefore === 'function'
                                    ? innerBefore(scrollController.controller)
                                    : innerBefore}
                            </div>
                        )}
                    </div>
                </div>

                {after && (
                    <div className={clsx(styles.after)}>
                        {typeof after === 'function' ? after(scrollController.controller) : after}
                    </div>
                )}
            </div>
        </ScrollViewProvider>
    );
});
