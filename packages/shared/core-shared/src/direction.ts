/** 四方向枚举。 */
export enum Direction {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
}

/** 四方向枚举的中文展示文案。 */
export const directionMap: Record<Direction, string> = {
    [Direction.UP]: '上',
    [Direction.DOWN]: '下',
    [Direction.LEFT]: '左',
    [Direction.RIGHT]: '右',
};
