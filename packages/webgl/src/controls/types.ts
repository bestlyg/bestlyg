/** 控制器状态 */
export enum State {
  NONE,
  /* 平移 */
  PAN,
  /* 旋转 */
  ROTATE,
  /* 缩放 */
  DOLLY,
}
/** 触发方式 */
export enum PointerType {
  /** 触摸 */
  TOUCH,
  /** 鼠标 */
  MOUSE,
}
/** 方向 */
export enum Direction {
  /** 全部 */
  ALL,
  /** 全部否 */
  NONE,
  /** 水平 */
  HORIZONTAL,
  /** 垂直 */
  VERTICAL,
}
