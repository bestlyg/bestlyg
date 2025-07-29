import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasbinRule } from '../entities';
import { CasbinRuleService } from '../services';

@Module({
    imports: [TypeOrmModule.forFeature([CasbinRule])],
    providers: [CasbinRuleService],
    exports: [TypeOrmModule, CasbinRuleService],
})
export class CasbinRuleModule {}
