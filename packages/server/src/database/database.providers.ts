import { default as mongoose } from 'mongoose';
import { INJECT_DATABASE, URL_MONGODB } from '@/config';

export const databaseProviders = [
  {
    provide: INJECT_DATABASE,
    useFactory: async (): Promise<typeof mongoose> => await mongoose.connect(URL_MONGODB),
  },
];
