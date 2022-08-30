import { mongo } from '@/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GangDatabaseName } from './utils';
import { UserSchema, UserName, AccountName, AccountSchema } from './schemas';
import { UserService, AccountService } from './services';
import { UserController, AccountController } from './controllers';

@Module({
  imports: [
    MongooseModule.forRoot(mongo.getUri(GangDatabaseName), {
      connectionName: GangDatabaseName,
    }),
    MongooseModule.forFeature(
      [{ name: UserName, schema: UserSchema }],
      GangDatabaseName,
    ),
    MongooseModule.forFeature(
      [{ name: AccountName, schema: AccountSchema }],
      GangDatabaseName,
    ),
  ],
  controllers: [UserController, AccountController],
  providers: [UserService, AccountService],
})
export class GangModule {}
