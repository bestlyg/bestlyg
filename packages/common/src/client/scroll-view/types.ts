import { CSSProperties, ReactNode, Ref } from 'react'

// Scroll position constants
export enum ScrollPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  INNER = 'inner',
}

export interface ScrollController {
  scrollTo: (position: number, options?: ScrollToOptions) => Promise<void>
  scrollToTop: () => Promise<void>
  scrollToBottom: (options?: { smooth?: boolean }) => Promise<void>
  getScrollTop: () => number
  getScrollBottom: () => number
  refreshAnchor: () => void
  isNearBottom: (threshold: number) => boolean
  getContainerHeight: () => number
  getContainer: () => HTMLDivElement
}

export interface ScrollViewProps {
  style?: CSSProperties
  className?: string
  children?: ReactNode | ((controller: ScrollController) => ReactNode)
  scrollableClassName?: string
  childrenWrapperClassName?: string
  after?: ReactNode | ((controller: ScrollController) => ReactNode)
  innerBefore?: ReactNode | ((controller: ScrollController) => ReactNode)
  reverse?: boolean
  reachTopThreshold?: number
  onReachTop?: () => void
  onLeaveTop?: () => void
  reachBottomThreshold?: number
  onReachBottom?: () => void
  onLeaveBottom?: () => void
  showScrollbar?: boolean
  autoShowScrollbar?: boolean
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void
  bottomAttaching?: boolean
}

export interface ScrollControllerOptions {
  scrollStatusRef: React.MutableRefObject<ScrollPosition>
  onBeforeScroll?: () => void
  onAfterScroll?: () => void
}

export interface ResizingProps {
  children: (ref: Ref<HTMLDivElement>) => ReactNode
  onResize?: (params: {
    current: DOMRectReadOnly & { offsetWidth: number; offsetHeight: number }
    previous?: DOMRectReadOnly & { offsetWidth: number; offsetHeight: number }
    target: Element
  }) => void
}

export interface ScrollViewContextValue {
  containerRef: React.RefObject<HTMLDivElement>
  controller: ScrollController
}
