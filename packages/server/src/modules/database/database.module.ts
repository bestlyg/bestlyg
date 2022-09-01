import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { schemaRegieter } from './schemas';
import { serviceRegister } from './services';
import { controllerRegister } from './controllers';
import { mongo } from '@/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards';

@Module({
  imports: [MongooseModule.forRoot(mongo.getUri('bestlyg')), ...schemaRegieter],
  controllers: [...controllerRegister],
  providers: [
    ...serviceRegister,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class DatabaseModule {}
