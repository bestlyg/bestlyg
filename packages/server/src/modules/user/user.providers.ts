import { INJECT_DATABASE } from '@/config';
import { Mongoose } from 'mongoose';
import { UserSchema } from './user.schema';

export const userProviders = [
  {
    provide: 'User_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('User', UserSchema),
    inject: [INJECT_DATABASE],
  },
];
