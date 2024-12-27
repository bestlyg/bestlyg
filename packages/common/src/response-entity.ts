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
    private code: StatusCode;
    // 报错信息
    private msg?: string;
    // 数据
    private data?: T;
    // 可重试
    private retriable?: boolean;
    constructor(
        code: ResponseEntity<T>['code'],
        data?: ResponseEntity<T>['data'],
        msg?: ResponseEntity<T>['msg'],
        retriable?: ResponseEntity<T>['retriable'],
    ) {
        this.code = code;
        this.data = data;
        this.msg = msg;
        this.retriable = retriable;
    }
    getCode() {
        return this.code;
    }
    setCode(code: ResponseEntity<T>['code']) {
        this.code = code;
        return this;
    }
    getData() {
        return this.data;
    }
    setData(data: ResponseEntity<T>['data']) {
        this.data = data;
        return this;
    }
    getMsg() {
        return this.msg;
    }
    setMsg(msg: ResponseEntity<T>['msg']) {
        this.msg = msg;
        return this;
    }
    getRetriable() {
        return this.retriable;
    }
    setRetriable(retriable: ResponseEntity<T>['retriable']) {
        this.retriable = retriable;
        return this;
    }
}
