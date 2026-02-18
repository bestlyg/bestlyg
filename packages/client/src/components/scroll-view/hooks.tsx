import React, { useCallback, useMemo } from 'react';
import { isAppleWebkit, isChromeAbove83, ScrollController, ScrollPosition } from './utils';
import { debounce } from 'lodash';
import styles from './scroll-view.module.less';
import { ResizingProps } from './resizing';
import { useDebounceFn } from 'ahooks';

export const useResize = ({
    controller,
    enable = true,
}: {
    enable?: boolean;
    controller: ScrollController;
}) => {
    // 容差阈值（单位：像素）
    const SCROLL_TOLERANCE = 10;
    const handleResize: ResizingProps['onResize'] = ({ current, previous }) => {
        if (!enable) return;
        const scrollBottom = controller.getScrollBottom();
        const prevHeight = previous?.offsetHeight;
        const currentHeight = current?.offsetHeight;
        if (
            currentHeight &&
            prevHeight &&
            !(scrollBottom >= SCROLL_TOLERANCE + (currentHeight - prevHeight))
        ) {
            controller.scrollToBottom();
        }
    };

    return { handleResize };
};

// Custom hooks
export const useScrollController = ({
    scrollStatusRef,
    onBeforeScroll,
    onAfterScroll,
    reverse,
}: {
    scrollStatusRef: React.RefObject<ScrollPosition>;
    onBeforeScroll?: () => void;
    onAfterScroll?: () => void;
    reverse: boolean;
}): {
    containerRef: React.RefObject<HTMLDivElement | null>;
    controller: ScrollController;
} => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const isTouchingRef = React.useRef(false);

    const getContainer = (): HTMLDivElement => {
        if (!ref.current) throw new Error('Not found ScrollView ref instance');
        return ref.current;
    };

    const getScrollPosition = (position: number) => {
        const container = getContainer();
        return reverse ? container.scrollHeight - container.offsetHeight + position : position;
    };

    const getRelativePosition = (position: number) => {
        const container = getContainer();
        return reverse ? position - (container.scrollHeight - container.offsetHeight) : position;
    };

    const clampScrollPosition = (position: number): number => {
        const container = getContainer();
        if (isAppleWebkit()) {
            return reverse
                ? Math.max(position, container.offsetHeight - container.scrollHeight + 1)
                : Math.min(position, container.scrollHeight - container.offsetHeight - 1);
        }
        return position;
    };

    const getCurrentScrollTop = (): number => {
        const container = getContainer();
        return reverse && !isChromeAbove83()
            ? container.scrollTop - (container.scrollHeight - container.offsetHeight)
            : container.scrollTop;
    };

    const scrollToPosition = (position: number, options?: ScrollToOptions): void => {
        const container = getContainer();
        const clampedPosition = clampScrollPosition(
            reverse && !isChromeAbove83()
                ? position + (container.scrollHeight - container.offsetHeight)
                : position,
        );

        onBeforeScroll?.();
        if (options) {
            container.scrollTo({ top: clampedPosition, ...options });
        } else {
            container.scrollTop = clampedPosition;
        }
        onAfterScroll?.();
    };

    const scrollTo = async (position: number, options?: ScrollToOptions): Promise<void> => {
        if (!isTouchingRef.current) {
            scrollToPosition(getRelativePosition(position), options);
            return new Promise((resolve) => {
                requestAnimationFrame(() => resolve());
            });
        }
    };

    const scrollToTop = async (): Promise<void> => scrollTo(0);

    const scrollToBottom = async (options: { smooth?: boolean } = {}): Promise<void> => {
        const { smooth = false } = options;
        const container = getContainer();
        await scrollTo(getScrollPosition(container.scrollHeight - container.offsetHeight), {
            behavior: smooth ? 'smooth' : undefined,
        });
    };

    const getScrollTop = (): number => {
        const container = ref.current;
        if (!container) return 0;
        const { scrollHeight, offsetHeight } = container;
        const currentScrollTop = getCurrentScrollTop();
        return reverse ? scrollHeight - (offsetHeight + -currentScrollTop) : currentScrollTop;
    };

    const getScrollBottom = (): number => {
        const container = ref.current;
        return container ? container.scrollHeight - getScrollTop() - container.offsetHeight : 0;
    };

    React.useEffect(() => {
        const container = ref.current;
        if (!container) return;

        const handleTouchStart = (): void => {
            isTouchingRef.current = true;
        };
        const handleTouchEnd = (): void => {
            isTouchingRef.current = false;
        };

        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return {
        containerRef: ref,
        controller: {
            scrollTo,
            scrollToTop,
            scrollToBottom,
            getScrollTop,
            getScrollBottom,
            refreshAnchor: () => {
                scrollStatusRef.current === ScrollPosition.TOP
                    ? scrollToTop()
                    : scrollStatusRef.current === ScrollPosition.BOTTOM && scrollToBottom();
            },
            isNearBottom: (threshold: number) => getScrollBottom() <= threshold,
            getContainerHeight: () => getContainer().offsetHeight,
            getContainer,
            disableScroll: (className?: string) => {
                isTouchingRef.current = true;
                ref.current?.classList.add(className ?? styles['disable-scroll']);
            },
            enableScroll: (className?: string) => {
                isTouchingRef.current = false;
                ref.current?.classList.remove(className ?? styles['disable-scroll']);
            },
        },
    };
};

export interface ScrollbarVisibleOptions {
    onVisibleChange?: (visible: boolean) => void;
}

export const useScrollbarVisible = ({ onVisibleChange }: ScrollbarVisibleOptions) => {
    const visibleRef = React.useRef(false);
    const updateVisibility = (visible: boolean) => {
        if (visible !== visibleRef.current) {
            visibleRef.current = visible;
            onVisibleChange?.(visible);
        }
    };

    const { run: hide } = useDebounceFn(
        () => {
            updateVisibility(false);
        },
        { leading: false, trailing: true, wait: 300 },
    );

    const onScroll = React.useCallback(() => {
        if (!visibleRef.current) {
            updateVisibility(true);
        }
        hide();
    }, []);

    return { onScroll };
};

export const useCustomScrollbar = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const debouncedHide = useMemo(
        () => debounce(() => setIsVisible(false), 300, { leading: false, trailing: true }),
        [],
    );
    // 滚动事件处理函数
    const onScroll = useCallback(() => {
        // 立即显示指示器（如果当前不可见）
        if (!isVisible) {
            setIsVisible(true);
        }

        // 重置防抖计时器
        debouncedHide();
    }, [isVisible, debouncedHide]);

    return {
        className: isVisible ? styles.showScrollbarThumb : '',
        onScroll,
    };
};
