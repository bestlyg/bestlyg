export interface BaseCreateDto {
  updateTime?: Date;
  createTime?: Date;
  deleted?: boolean;
}
export interface BaseUpdateDto {
  _id: string;
  updateTime?: Date;
  deleted?: boolean;
}
export interface BaseListDto {
  _id: string;
  updateTime?: Date;
  createTime?: Date;
  deleted?: boolean;
}
export type Dto<Base, T> = Base & Partial<T>;
export type CreateDto<T = any> = Dto<BaseCreateDto, T>;
export type UpdateDto<T = any> = Dto<BaseUpdateDto, T>;
export type ListDto<T = any> = Dto<BaseListDto, T>;
