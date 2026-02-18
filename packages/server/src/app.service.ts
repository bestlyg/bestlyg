import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    MailService,
    NamedRequestMethod,
    NamedRequestMethodMapper,
    resolve,
} from '@bestlyg-server/common';
import fs from 'fs-extra';
import { Configuration } from '@bestlyg/common/server';
import { MetadataScanner, ModuleRef, ModulesContainer, Reflector } from '@nestjs/core';
import { PathsExplorer } from '@nestjs/core/router/paths-explorer';

@Injectable()
export class AppService implements OnApplicationBootstrap {
    private readonly metadataScanner = new MetadataScanner();
    private readonly pathsExplorer = new PathsExplorer(this.metadataScanner);
    private readonly logger = new Logger(AppService.name);
    constructor(
        private readonly mailService: MailService,
        private readonly configService: ConfigService,
        private readonly modulesContainer: ModulesContainer,
        private readonly reflector: Reflector,
        private readonly moduleRef: ModuleRef,
    ) {}

    getUrlMap() {
        const urlMap: Record<
            string,
            Record<
                string,
                Record<
                    string,
                    { requestMethod: NamedRequestMethod; methodName: string; path: string }
                >
            >
        > = {};
        for (const module of this.modulesContainer.values()) {
            const controllerMap: (typeof urlMap)[string] = {};
            for (const controller of module.controllers.values()) {
                const routeMap: (typeof controllerMap)[string] = {};
                const routes = this.pathsExplorer.scanForPaths(controller.instance);
                for (const route of routes) {
                    routeMap[route.methodName] = {
                        requestMethod: NamedRequestMethodMapper[route.requestMethod],
                        methodName: route.methodName,
                        path: route.path[0],
                    };
                }
                if (Object.values(routeMap).length) {
                    controllerMap[controller.name] = routeMap;
                }
            }
            if (Object.values(controllerMap).length) {
                urlMap[module.name] = controllerMap;
            }
        }
        return urlMap;
    }

    genManifest() {
        const urlMap = this.getUrlMap();
        const manifest = { urlMap };
        fs.writeFileSync(resolve('manifest.json'), JSON.stringify(manifest, null, 4));
    }

    onApplicationBootstrap() {
        this.sendMailWhenStartSuccess();
        this.genManifest();
    }

    sendMailWhenStartSuccess() {
        const mode = this.configService.get<Configuration['mode']>('mode');
        this.logger.log(`mode = ${mode}`);
        const bestEnv = Object.entries(process.env).filter(([k]) => k.startsWith('BESTLYG'));
        for (const [k, v] of bestEnv) {
            this.logger.log(`${k}: ${v}`);
        }
        if (mode === 'production') {
            this.mailService.sendMail(
                ['1057966749@qq.com'],
                `服务启动通知`,
                `
    <h1>PROCESS.ENV</h1>
    ${bestEnv
        .map(([k, v]) => `${k.padEnd(10)} : ${v}`)
        .map((item) => `<div>${item}</div>`)
        .join('\n')}
    `.trim(),
            );
        }
    }
}
