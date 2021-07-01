export const enum RequestFilterTag {
  DATE,
  NUMBER,
  STRING,
}
export type RequestFilterDate =
  | {
      tag: RequestFilterTag.DATE;
      start: Date;
      end: Date;
    }
  | Date;
export type RequestFilterNumber =
  | {
      tag: RequestFilterTag.NUMBER;
      max: number;
      min: number;
    }
  | number;
export type RequestFilterString =
  | {
      tag: RequestFilterTag.STRING;
      fuzzy: boolean;
      value: string;
    }
  | string;
export type RequestFilter<T> = Partial<
  {
    [K in keyof T]: T[K] extends Date
      ? RequestFilterDate
      : T[K] extends number
      ? RequestFilterNumber
      : T[K] extends string
      ? RequestFilterString
      : T[K];
  }
>;
export type RequestSort<T> = {
  key: keyof T;
  /**
   * 1  : 升序排列,
   * -1 : 降序排列
   * */
  rule: 1 | -1;
};
export type RequestFind<T> = {
  sort?: RequestSort<T>;
  filter?: RequestFilter<T>;
};
export type RequestPage<T> = {
  current: number;
  size: number;
  model?: RequestFind<T>;
};
