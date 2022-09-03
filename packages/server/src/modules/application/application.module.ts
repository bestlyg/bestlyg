import { Module } from '@nestjs/common';
import { database } from '@/modules';
import { controllerRegister } from './controllers';

@Module({
  imports: [database.DatabaseModule],
  controllers: [...controllerRegister],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
