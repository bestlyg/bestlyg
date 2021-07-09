import { Document } from 'mongoose';

export class User extends Document {
  readonly name: string;
  readonly age: number;
  readonly time: Date;
}
