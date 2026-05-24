import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasbinRuleController } from './casbin-rule.controller';
import { CasbinRule } from '../../entities';
import { CasbinRuleService } from './casbin-rule.service';

@Module({
    imports: [TypeOrmModule.forFeature([CasbinRule])],
    controllers: [CasbinRuleController],
    providers: [CasbinRuleService],
    exports: [TypeOrmModule, CasbinRuleService],
})
export class CasbinRuleModule {}
