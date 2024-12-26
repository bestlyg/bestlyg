import { StatusCode } from './status-code';

export class ResponseEntity<T> {
    static of<T>(...args: ConstructorParameters<typeof ResponseEntity<T>>) {
        return new ResponseEntity(...args);
    }
    static ofSuccess<T>(data: T) {
        return new ResponseEntity(0, data);
    }
    static ofFailure(err: any, code: number = 1) {
        return new ResponseEntity(code, err?.message ?? err?.toString() ?? 'Server Error');
    }
    static from<T>(object: Record<string, any>) {
        return this.of<T>(0)
            .setCode(object.code)
            .setData(object.data)
            .setMsg(object.msg)
            .setRetriable(object.retriable);
    }
    // 状态 0 为成功
    _code: StatusCode;
    get code() {
        return this._code;
    }
    // 报错信息
    _msg?: string;
    get msg() {
        return this._msg;
    }
    // 数据
    _data?: T;
    get data() {
        return this._data;
    }
    // 可重试
    _retriable?: boolean;
    get retriable() {
        return this._retriable;
    }
    constructor(
        code: ResponseEntity<T>['code'],
        data?: ResponseEntity<T>['data'],
        msg?: ResponseEntity<T>['msg'],
        retriable?: ResponseEntity<T>['retriable'],
    ) {
        this._code = code;
        this._data = data;
        this._msg = msg;
        this._retriable = retriable;
    }
    setCode(code: ResponseEntity<T>['code']) {
        this._code = code;
        return this;
    }
    setData(data: ResponseEntity<T>['data']) {
        this._data = data;
        return this;
    }
    setMsg(msg: ResponseEntity<T>['msg']) {
        this._msg = msg;
        return this;
    }
    setRetriable(retriable: ResponseEntity<T>['retriable']) {
        this._retriable = retriable;
        return this;
    }
}
