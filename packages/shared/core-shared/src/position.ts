/** 二维坐标值对象。 */
export class Position {
    static default: { x: Position['x']; y: Position['y'] } = Object.freeze({ x: 0, y: 0 });
    static of(...args: ConstructorParameters<typeof Position>) {
        return new Position(...args);
    }

    /** 从普通对象恢复坐标，缺省时使用原点。 */
    static from(object?: Record<string, any>) {
        return this.of(object?.x ?? this.default.x, object?.y ?? this.default.y);
    }
    x: number;
    y: number;
    constructor(x: Position['x'], y: Position['y']) {
        this.x = x;
        this.y = y;
    }

    /** 设置 x 坐标，并返回当前实例。 */
    setX(val: Position['x']) {
        this.x = val;
        return this;
    }

    /** 设置 y 坐标，并返回当前实例。 */
    setY(val: Position['y']) {
        this.y = val;
        return this;
    }
}
