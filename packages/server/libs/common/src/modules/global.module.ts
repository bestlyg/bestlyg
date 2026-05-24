import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { ClsModule } from 'nestjs-cls';
import type { Request } from 'express';
import { BestlygConfig } from '../config';
import { MailService } from '../services';

function getHeader(req: Request, name: string) {
    const value = req.headers[name] ?? req.headers[name.toLowerCase()];
    return Array.isArray(value) ? value[0] : value;
}

@Module({})
export class GlobalModule {
    static forRoot({ config }: { config: BestlygConfig }): DynamicModule {
        return {
            module: GlobalModule,
            imports: [
                ScheduleModule.forRoot(),
                ConfigModule.forRoot({
                    ignoreEnvFile: true,
                    isGlobal: true,
                    load: [() => config],
                }),
                JwtModule.register({
                    global: true,
                    secret: config.jwt.secret,
                    signOptions: { expiresIn: '100 days' },
                }),
                ClsModule.forRoot({
                    global: true,
                    middleware: {
                        mount: true,
                        generateId: true,
                        setup: (cls, req: Request) => {
                            const traceId =
                                getHeader(req, 'traceid') ??
                                getHeader(req, 'trace-id') ??
                                getHeader(req, 'x-trace-id');
                            cls.set('req', req);
                            cls.set('traceId', traceId);
                            cls.set('info', getHeader(req, 'x-info'));
                        },
                    },
                }),
            ],
            providers: [MailService],
            exports: [ConfigModule, JwtModule, ClsModule, MailService],
        };
    }
}
