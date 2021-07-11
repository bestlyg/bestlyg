import { INJECT_DATABASE } from '@/config';
import { Mongoose } from 'mongoose';
import { UserSchema } from './user.schema';

export const userProvideTag = 'USER_MODEL';
export const userProviders = [
  {
    provide: userProvideTag,
    useFactory: (mongoose: Mongoose) => mongoose.model('User', UserSchema),
    inject: [INJECT_DATABASE],
  },
];
