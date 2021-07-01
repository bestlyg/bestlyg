import { Document } from 'mongoose';

export interface UserModel {
  readonly name: string;
  readonly age: number;
  readonly time: Date;
}
export interface User extends UserModel, Document {}
