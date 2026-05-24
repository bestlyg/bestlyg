import type { Request } from 'express';
import { ClsServiceManager } from 'nestjs-cls';

export interface BestlygRequestContext {
    req?: Request;
    traceId?: string;
    username?: string;
    user?: unknown;
    info?: unknown;
}

export function getCurrentContext(): BestlygRequestContext | undefined {
    try {
        const cls = ClsServiceManager.getClsService();
        return cls.get() as BestlygRequestContext;
    } catch {
        return undefined;
    }
}
