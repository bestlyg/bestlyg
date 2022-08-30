import { mongo } from '@/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GangDatabaseName } from './utils';
import { UserSchema, UserName } from './schemas';
import { UserService } from './services';
import { UserController } from './controllers';

@Module({
  imports: [
    MongooseModule.forRoot(mongo.getUri(GangDatabaseName), {
      connectionName: GangDatabaseName,
    }),
    MongooseModule.forFeature(
      [{ name: UserName, schema: UserSchema }],
      GangDatabaseName,
    ),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class GangModule {}
