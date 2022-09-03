export interface Account {
  _id: string;
  createTime: string;
  isPositive: boolean;
  money: number;
  name: string;
  updateTime: string;
}

export interface Type {
  _id: string;
  name: string;
}
