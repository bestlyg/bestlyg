import { DynamicModule, Module, Type } from '@nestjs/common';
import { DevModule } from '@bestlyg-server/dev';
import type { BestlygConfig } from '@bestlyg-server/common';

const systemModuleMap = new Map<string, Type>([
    ['DevModule', DevModule],
    ['DevModeModule', DevModule],
]);

function getEnabledSystemModules(config: BestlygConfig) {
    const moduleNames = new Set(config.server.modules ?? []);
    if (config.mode === 'development' || config.server.devMode || config.dev.enabled) {
        moduleNames.add('DevModule');
    }
    return [...moduleNames].flatMap((name) => {
        const mod = systemModuleMap.get(name);
        return mod ? [mod] : [];
    });
}

@Module({})
export class SystemModule {
    static forRoot({ config }: { config: BestlygConfig }): DynamicModule {
        const imports = getEnabledSystemModules(config);
        return {
            module: SystemModule,
            imports,
            exports: imports,
        };
    }
}
