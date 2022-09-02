export interface ResponseData<T> {
  code: number;
  /** 返回描述 */
  message?: string;
  /** 数据载荷 */
  data: T;
}
