export interface ResponseData<T> {
  success: boolean;
  /** 返回描述 */
  message?: string;
  /** 数据载荷 */
  data: T;
}
