export class Position {
    static default: { x: Position['x']; y: Position['y'] } = Object.freeze({ x: 0, y: 0 });
    static of(...args: ConstructorParameters<typeof Position>) {
        return new Position(...args);
    }
    static from(object?: Record<string, any>) {
        return this.of(object?.x ?? this.default.x, object?.y ?? this.default.y);
    }
    x: number;
    y: number;
    constructor(x: Position['x'], y: Position['y']) {
        this.x = x;
        this.y = y;
    }
    setX(val: Position['x']) {
        this.x = val;
        return this;
    }
    setY(val: Position['y']) {
        this.y = val;
        return this;
    }
}
