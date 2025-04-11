import { Module } from '@nestjs/common';
import { ZjuerService } from './zjuer.service';
import { ZjuerController } from './zjuer.controller';

@Module({
    controllers: [ZjuerController],
    providers: [ZjuerService],
    exports: [ZjuerService],
})
export class ZjuerModule {}
