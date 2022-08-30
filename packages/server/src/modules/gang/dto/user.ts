export interface CreateUserDto {
  name: string;
  account: string;
  pwd: string;
}
export interface UpdateUserDto {
  _id: string;
  name?: string;
  account?: string;
  pwd?: string;
  updateTime?: Date;
  deleted?: boolean;
}
