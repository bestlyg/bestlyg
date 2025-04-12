import React, { useRef, useMemo, useLayoutEffect, forwardRef, ReactNode, useEffect } from 'react'
import { debounce, DebouncedFunc } from 'lodash'
import classNames from 'classnames'
import { ResizingProps, ScrollController, ScrollPosition, ScrollViewContextValue, ScrollViewProps } from './types'
import { useScrollController } from './useScrollController'
import { useAutoScrollToBottom } from './useAutoScrollToBottom'

// Styles
const styles = {
  scrollView: 'scroll-view-_F_xCn',
  after: 'after-DGT_a7',
  scrollable: 'scrollable-PMdv92 overflow-y-auto overflow-x-hidden h-full px-1 pb-2 pt-1 md:px-2 md:pb-4',
  childrenWrapper: 'children-wrapper',
} as const

// Helper functions
export const isAppleWebkit = (): boolean => {
  return /AppleWebKit/i.test(navigator.userAgent)
}

export const getChromeVersion = (): { major: number } | null => {
  const match = navigator.userAgent.match(/Chrome\/(\d+)/)
  return match ? { major: parseInt(match[1], 10) } : null
}

export const isChromeAbove83 = (): boolean => {
  const chromeVersion = getChromeVersion()
  if (!chromeVersion) return true
  return chromeVersion.major >= 83
}

// Context
export const ScrollViewContext = React.createContext<ScrollViewContextValue | null>(null)

// Components
const ScrollViewProvider: React.FC<{
  containerRef: React.RefObject<HTMLDivElement>
  controller: ScrollController
  children: ReactNode
}> = ({ containerRef, controller, children }) => {
  return <ScrollViewContext.Provider value={{ containerRef, controller }}>{children}</ScrollViewContext.Provider>
}

const Resizing: React.FC<ResizingProps> = ({ children, onResize }) => {
  const ref = useRef<HTMLDivElement>(null)
  const prevSizeRef = useRef<DOMRectReadOnly & { offsetWidth: number; offsetHeight: number }>()
  const callbackRef = useRef(onResize)

  useLayoutEffect(() => {
    callbackRef.current = onResize
  }, [onResize])

  useLayoutEffect(() => {
    if (!window.ResizeObserver) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries.find((e) => e.target === ref.current)
      if (!entry) return

      const { offsetWidth, offsetHeight } = entry.target as HTMLDivElement

      const contentRect = entry.contentRect

      const currentSize = {
        ...contentRect,
        offsetWidth,
        offsetHeight,
      }

      callbackRef.current?.({
        current: currentSize,
        previous: prevSizeRef.current,
        target: entry.target,
      })
      prevSizeRef.current = currentSize
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        callbackRef.current?.({
          current: {
            offsetHeight: 0,
            offsetWidth: 0,
            height: 0,
            width: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            x: 0,
            y: 0,
            toJSON: () => '',
          },
          previous: prevSizeRef.current,
          target: ref.current,
        })
      }
      observer.disconnect()
    }
  }, [])

  return children(ref)
}

const ScrollView = forwardRef<ScrollController, ScrollViewProps>((props) => {
  const {
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
    ...restProps
  } = props

  const defaultPosition = ScrollPosition.TOP
  const scrollStatusRef = useRef<ScrollPosition>(defaultPosition)
  const isScrollingRef = useRef(false)
  const scrollController = useScrollController({
    scrollStatusRef,
    onBeforeScroll: () => {
      isScrollingRef.current = true
    },
  })

  const { getScrollTop, getScrollBottom } = scrollController.controller
  const isNearTopRef = useRef(false)
  const isNearBottomRef = useRef(false)

  const updateScrollStatus = useMemo(
    (): DebouncedFunc<(position: ScrollPosition) => void> =>
      debounce((position: ScrollPosition) => {
        scrollStatusRef.current = position
      }, 100),
    [],
  )

  const { handleResize } = useAutoScrollToBottom({
    controller: scrollController.controller,
  })

  useEffect(() => {
    function handleScrollToBottom() {
      scrollController.controller.scrollToBottom()
    }
    function handleScrollToTop() {
      scrollController.controller.scrollToTop()
    }
    document.addEventListener('scroll-to-bottom', handleScrollToBottom)
    document.addEventListener('scroll-to-top', handleScrollToTop)
    return () => {
      document.removeEventListener('scroll-to-bottom', handleScrollToBottom)
      document.removeEventListener('scroll-to-top', handleScrollToTop)
    }
  }, [])

  const handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    // const wasScrolling = isScrollingRef.current
    isScrollingRef.current = false

    if (!event.currentTarget) return
    onScroll?.(event)

    const { offsetHeight } = event.currentTarget
    const topThreshold = reachTopThreshold ?? offsetHeight
    const bottomThreshold = reachBottomThreshold ?? offsetHeight

    // Check if reached top
    if (getScrollTop() < topThreshold) {
      if (!isNearTopRef.current) {
        isNearTopRef.current = true
        onReachTop?.()
      }
    } else if (isNearTopRef.current) {
      isNearTopRef.current = false
      onLeaveTop?.()
    }

    // Check if reached bottom
    if (getScrollBottom() < bottomThreshold) {
      if (!isNearBottomRef.current) {
        isNearBottomRef.current = true
        onReachBottom?.()
      }
    } else if (isNearBottomRef.current) {
      isNearBottomRef.current = false
      onLeaveBottom?.()
    }

    // Update scroll position status
    scrollStatusRef.current = ScrollPosition.INNER
    if (getScrollTop() <= 0 && getScrollBottom() <= 0) {
      updateScrollStatus(defaultPosition)
    } else if (getScrollTop() <= 0) {
      updateScrollStatus(ScrollPosition.TOP)
    } else if (getScrollBottom() <= 0) {
      updateScrollStatus(ScrollPosition.BOTTOM)
    } else {
      updateScrollStatus(ScrollPosition.INNER)
    }

    // if (!wasScrolling) {
    //   handleScrollbarVisibility()
    // }
  }

  const renderContent = (): ReactNode => {
    const content = typeof children === 'function' ? children(scrollController.controller) : children

    return (
      <Resizing onResize={handleResize}>
        {(resizeRef) => (
          <div
            ref={resizeRef}
            className={classNames(styles.childrenWrapper, 'children-wrapper', childrenWrapperClassName)}
          >
            {content}
          </div>
        )}
      </Resizing>
    )
  }

  return (
    <ScrollViewProvider containerRef={scrollController.ref} controller={scrollController.controller}>
      <div data-testid="scroll_view" className={classNames(styles.scrollView, className)} style={style}>
        <div
          ref={scrollController.ref}
          className={classNames(styles.scrollable, scrollableClassName)}
          onScroll={handleScroll}
          {...restProps}
        >
          {renderContent()}
        </div>

        {after && (
          <div className={classNames(styles.after)}>
            {typeof after === 'function' ? after(scrollController.controller) : after}
          </div>
        )}
      </div>
    </ScrollViewProvider>
  )
})

export default ScrollView
