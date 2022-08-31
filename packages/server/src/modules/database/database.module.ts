import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { schemaRegieter } from './schemas';
import { serviceRegister } from './services';
import { controllerRegister } from './controllers';
import { mongo } from '@/config';

@Module({
  imports: [MongooseModule.forRoot(mongo.getUri('bestlyg')), ...schemaRegieter],
  controllers: [...controllerRegister],
  providers: [...serviceRegister],
})
export class DatabaseModule {}
