export enum AccountType {
  Positive,
  Negative,
}
export class Account {
  name: string;
  type: AccountType;
  money: number;
}
