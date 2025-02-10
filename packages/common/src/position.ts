export class Position {
    static of(...args: ConstructorParameters<typeof Position>) {
        return new Position(...args);
    }
    static from(object: Record<string, any>) {
        return this.of(0, 0).setX(object.field).setY(object.order);
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
