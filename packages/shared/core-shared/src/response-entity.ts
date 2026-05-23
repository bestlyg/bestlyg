import { StatusCode } from './status-code';

/** 统一接口响应包裹结构，约定 code 为 0 表示成功。 */
export class ResponseEntity<T> {
    static default: {
        code: ResponseEntity<any>['code'];
        data: ResponseEntity<any>['data'];
        msg: ResponseEntity<any>['msg'];
        retriable: ResponseEntity<any>['retriable'];
    } = Object.freeze({
        code: 0,
        data: undefined,
        msg: undefined,
        retriable: undefined,
    });

    /** 用完整参数创建响应实体。 */
    static of<T>(...args: ConstructorParameters<typeof ResponseEntity<T>>) {
        return new ResponseEntity(...args);
    }

    /** 创建成功响应。 */
    static ofSuccess<T>(data?: T, code: number = 0) {
        return new ResponseEntity(code, data);
    }

    /** 根据错误对象创建失败响应。 */
    static ofFailure(err: any, code: number = 1) {
        return new ResponseEntity(code, null, err?.message ?? err?.toString() ?? 'Server Error');
    }

    /** 从普通对象恢复响应实体，缺省字段使用默认响应。 */
    static from<T>(object?: Record<string, any>) {
        return this.of<T>(
            object?.code ?? this.default.code,
            object?.data ?? this.default.data,
            object?.msg ?? this.default.msg,
            object?.retriable ?? this.default.retriable,
        );
    }
    // 状态 0 为成功
    code: StatusCode;
    // 报错信息
    msg?: string;
    // 数据
    data?: T;
    // 可重试
    retriable?: boolean;
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

    /** 获取响应状态码。 */
    getCode() {
        return this.code;
    }

    /** 设置响应状态码，并返回当前实例。 */
    setCode(code: ResponseEntity<T>['code']) {
        this.code = code;
        return this;
    }

    /** 获取响应数据。 */
    getData() {
        return this.data;
    }

    /** 设置响应数据，并返回当前实例。 */
    setData(data: ResponseEntity<T>['data']) {
        this.data = data;
        return this;
    }

    /** 获取错误或提示信息。 */
    getMsg() {
        return this.msg;
    }

    /** 设置错误或提示信息，并返回当前实例。 */
    setMsg(msg: ResponseEntity<T>['msg']) {
        this.msg = msg;
        return this;
    }

    /** 获取当前响应是否可重试。 */
    getRetriable() {
        return this.retriable;
    }

    /** 设置当前响应是否可重试，并返回当前实例。 */
    setRetriable(retriable: ResponseEntity<T>['retriable']) {
        this.retriable = retriable;
        return this;
    }
}
