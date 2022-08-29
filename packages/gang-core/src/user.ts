import { Account } from './account';
export class User {
  name: string;
  pwd: string;
  create_time: number;
  accounts: Account[];
}
