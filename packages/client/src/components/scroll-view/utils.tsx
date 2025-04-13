import React from 'react';

export interface ScrollController {
    scrollTo: (position: number, options?: ScrollToOptions) => Promise<void>;
    scrollToTop: () => Promise<void>;
    scrollToBottom: (options?: { smooth?: boolean }) => Promise<void>;
    getScrollTop: () => number;
    getScrollBottom: () => number;
    refreshAnchor: () => void;
    isNearBottom: (threshold: number) => boolean;
    getContainerHeight: () => number;
    getContainer: () => HTMLDivElement;
    disableScroll: (className: string) => void;
    enableScroll: (className: string) => void;
}

export interface ScrollViewContextValue {
    containerRef: React.RefObject<HTMLDivElement | null>;
    controller: ScrollController;
}

export const ScrollViewContext = React.createContext<ScrollViewContextValue | null>(null);

export const ScrollViewProvider: React.FC<
    React.PropsWithChildren<{
        containerRef: React.RefObject<HTMLDivElement | null>;
        controller: ScrollController;
    }>
> = ({ containerRef, controller, children }) => {
    return (
        <ScrollViewContext.Provider value={{ containerRef, controller }}>
            {children}
        </ScrollViewContext.Provider>
    );
};

export const isAppleWebkit = (): boolean => {
    return /AppleWebKit/i.test(navigator.userAgent);
};

export const getChromeVersion = (): { major: number } | null => {
    const match = navigator.userAgent.match(/Chrome\/(\d+)/);
    return match ? { major: parseInt(match[1], 10) } : null;
};

export const isChromeAbove83 = (): boolean => {
    const chromeVersion = getChromeVersion();
    if (!chromeVersion) return true;
    return chromeVersion.major >= 83;
};

export enum ScrollPosition {
    TOP = 'top',
    BOTTOM = 'bottom',
    INNER = 'inner',
}
