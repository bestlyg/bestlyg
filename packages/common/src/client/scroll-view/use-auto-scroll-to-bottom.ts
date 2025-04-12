import { ScrollController } from "./types";

export const useAutoScrollToBottom = ({
  controller,
}: {
  controller: ScrollController
}): {
  handleResize: (params: { current: { offsetHeight: number }; previous?: { offsetHeight: number } }) => void
} => {
  const handleResize = ({
    current: { offsetHeight },
    previous,
  }: {
    current: { offsetHeight: number }
    previous?: { offsetHeight: number }
  }): void => {

    const scrollBottom = controller.getScrollBottom()
    const prevHeight = previous?.offsetHeight

    if (!prevHeight) return
    if (!(scrollBottom >= 10 + (offsetHeight - prevHeight))) {
      controller.scrollToBottom()
    }
  }

  return { handleResize }
}
