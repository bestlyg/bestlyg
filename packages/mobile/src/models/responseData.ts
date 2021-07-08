export interface ResponseData<T> {
  /** 0 成功 1 失败 */
  code: 0 | 1;
  /** 返回描述 */
  msg: string | null;
  /** 数据载荷 */
  data: T;
}
