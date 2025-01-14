import { Injectable } from '@nestjs/common';
import { resolve } from '@bestlyg-server/common';
import { DataService } from '@bestlyg-server/data';
import fs from 'fs-extra';
import path from 'path';

type DocItem = {
    type: 'dir' | 'file';
    name: string;
    link?: string;
    children?: DocItem[];
};

@Injectable()
export class ClientService {
    private readonly staticPath = resolve('node_modules', '@bestlyg/', 'static');
    constructor(private readonly dataService: DataService) {}
    async getDocs(p = this.staticPath): Promise<DocItem | null> {
        const stat = await fs.stat(p);
        const name = path.basename(p);
        if (stat.isDirectory()) {
            const subDirs = await fs.readdir(p);
            const item: DocItem = { name, type: 'dir', children: [] };
            for (const name of subDirs) {
                const subPath = resolve(p, name);
                const res = await this.getDocs(subPath);
                if (res) item.children?.push(res);
            }
            return item;
        } else if (stat.isFile()) {
            const item: DocItem = { name, type: 'file', link: path.relative(this.staticPath, p) };
            return item;
        }
        return null;
    }

    async getSidebars() {
        const docs = await this.getDocs(resolve(this.staticPath, 'docs'))!;
        const leetcodeProblems = await this.dataService.getLeetcodeProblems();
        return { docs, leetcodeProblems };
    }
}
