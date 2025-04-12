import { useEffect, useRef } from 'react'
import { ScrollController, ScrollControllerOptions, ScrollPosition } from './types'
import { isAppleWebkit } from '.'


// Custom hooks
export const useScrollController = ({
  scrollStatusRef,
  onBeforeScroll,
  onAfterScroll,
}: ScrollControllerOptions): {
  ref: React.RefObject<HTMLDivElement>
  controller: ScrollController
} => {
  const ref = useRef<HTMLDivElement>(null)
  const isTouchingRef = useRef(false)

  const getContainer = (): HTMLDivElement => {
    if (!ref.current) throw new Error('Not found ScrollView ref instance')
    return ref.current
  }

  const getScrollPosition = (position: number): number => {
    return position
  }

  const getRelativePosition = (position: number): number => {
    return position
  }

  const clampScrollPosition = (position: number): number => {
    const container = getContainer()
    if (isAppleWebkit()) {
      return Math.min(position, container.scrollHeight - container.offsetHeight - 1)
    }
    return position
  }

  const getCurrentScrollTop = (): number => {
    const container = getContainer()
    return container.scrollTop
  }

  const scrollToPosition = (position: number, options?: ScrollToOptions): void => {
    const container = getContainer()
    const clampedPosition = clampScrollPosition(position)

    onBeforeScroll?.()
    if (options) {
      container.scrollTo({ top: clampedPosition, ...options })
    } else {
      container.scrollTop = clampedPosition
    }
    onAfterScroll?.()
  }

  const scrollTo = async (position: number, options?: ScrollToOptions): Promise<void> => {
    if (!isTouchingRef.current) {
      scrollToPosition(getRelativePosition(position), options)
      return new Promise((resolve) => {
        requestAnimationFrame(() => resolve())
      })
    }
  }

  const scrollToTop = async (): Promise<void> => scrollTo(0)

  const scrollToBottom = async (options: { smooth?: boolean } = {}): Promise<void> => {
    const { smooth = false } = options
    const container = getContainer()
    await scrollTo(getScrollPosition(container.scrollHeight - container.offsetHeight), {
      behavior: smooth ? 'smooth' : undefined,
    })
  }

  const getScrollTop = (): number => {
    const container = ref.current
    if (!container) return 0

    const currentScrollTop = getCurrentScrollTop()
    return currentScrollTop
  }

  const getScrollBottom = (): number => {
    const container = ref.current
    return container ? container.scrollHeight - getScrollTop() - container.offsetHeight : 0
  }

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const handleTouchStart = (): void => {
      isTouchingRef.current = true
    }
    const handleTouchEnd = (): void => {
      isTouchingRef.current = false
    }

    container.addEventListener('touchstart', handleTouchStart)
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return {
    ref,
    controller: {
      scrollTo,
      scrollToTop,
      scrollToBottom,
      getScrollTop,
      getScrollBottom,
      refreshAnchor: (): void => {
        scrollStatusRef.current === ScrollPosition.TOP
          ? scrollToTop()
          : scrollStatusRef.current === ScrollPosition.BOTTOM && scrollToBottom()
      },
      isNearBottom: (threshold: number): boolean => getScrollBottom() <= threshold,
      getContainerHeight: (): number => getContainer().offsetHeight,
      getContainer,
    },
  }
}
