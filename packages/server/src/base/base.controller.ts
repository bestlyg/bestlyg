import isPromise from 'is-promise';
export class Return<T> {
  constructor(
    public code: number,
    public data: T = null,
    public msg?: string,
  ) {}
}

export class BaseController {
  async result<T>(data?: T | Promise<T>): Promise<Return<T>> {
    const promise = isPromise(data) ? data : Promise.resolve(data);
    return promise.then(
      (data) => new Return(0, data),
      (err) => new Return(1, null, err),
    );
  }
}
