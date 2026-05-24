import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const secretPattern = /(secret|password|pwd|pass|token|key|csrf|session|iv)$/i;

@Injectable()
export class DevService {
    constructor(private readonly configService: ConfigService) {}

    ping() {
        return {
            mode: this.configService.get('mode'),
            uptime: process.uptime(),
            pid: process.pid,
            node: process.version,
        };
    }

    getSafeConfig() {
        return this.mask({
            mode: this.configService.get('mode'),
            server: this.configService.get('server'),
            ssh: this.configService.get('ssh'),
            mail: this.configService.get('mail'),
            jwt: this.configService.get('jwt'),
            aes: this.configService.get('aes'),
            auth: this.configService.get('auth'),
            leetcode: this.configService.get('leetcode'),
            dev: this.configService.get('dev'),
        });
    }

    private mask(value: unknown, key = ''): unknown {
        if (secretPattern.test(key)) return value ? '***' : value;
        if (Array.isArray(value)) return value.map((item) => this.mask(item));
        if (!value || typeof value !== 'object') return value;
        return Object.fromEntries(
            Object.entries(value as Record<string, unknown>).map(([itemKey, itemValue]) => [
                itemKey,
                this.mask(itemValue, itemKey),
            ]),
        );
    }
}
