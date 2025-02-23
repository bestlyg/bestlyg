import { Injectable } from '@nestjs/common';
import { getDirNameFromProblemName, dirSort, problemSort } from '@bestlyg/leetcode';
import { resolve } from '@bestlyg-server/common';
import { LeetcodeService } from '@bestlyg-server/data';
import { api } from '@bestlyg/common/idl/server';
import fs from 'fs-extra';
import path from 'path';

@Injectable()
export class ClientService {
    private readonly categoryFileName = '_category_';
    private readonly staticPath = resolve('node_modules', '@bestlyg/', 'static');
    constructor(private readonly leetcodeService: LeetcodeService) {}
    async getDocs(p = resolve(this.staticPath, 'docs')): Promise<{
        type: 'group' | 'item';
        category?: { position: number };
        data: api.bestlyg.SidebarGroup | api.bestlyg.SidebarItem;
    } | null> {
        const stat = await fs.stat(p);
        const name = path.basename(p);
        if (stat.isDirectory()) {
            const subDirs = await fs.readdir(p);
            const data: api.bestlyg.SidebarGroup = {
                name,
            };
            const category = { position: Infinity };
            const groupMetaList: {
                type: 'group';
                category: { position: number };
                data: api.bestlyg.SidebarGroup;
            }[] = [];
            for (const name of subDirs) {
                const subPath = resolve(p, name);
                const res = await this.getDocs(subPath);
                if (res) {
                    if (res.type === 'group') {
                        groupMetaList.push(res as any);
                        const v = res.data as api.bestlyg.SidebarGroup;
                        data.groups ??= [];
                        data.groups.push(v);
                    } else if (res.type === 'item') {
                        const v = res.data as api.bestlyg.SidebarItem;
                        if (v.name === this.categoryFileName) {
                            const json = await fs.readJson(
                                resolve(this.staticPath, v.link.substring(1)),
                            );
                            Object.assign(category, json);
                        } else {
                            data.items ??= [];
                            data.items.push(v);
                        }
                    }
                }
            }
            data.groups?.sort((g1, g2) => {
                const meta1 = groupMetaList.find(v => v.data === g1)!;
                const meta2 = groupMetaList.find(v => v.data === g2)!;
                return meta1.category.position - meta2.category.position;
            });
            return { data, type: 'group', category };
        } else if (stat.isFile()) {
            const data: api.bestlyg.SidebarItem = {
                name: name.replace(path.extname(name), ''),
                link: '/' + path.relative(this.staticPath, p),
            };
            return { data, type: 'item' };
        }
        return null;
    }

    async getGroups(): Promise<api.bestlyg.SidebarGroup[]> {
        const docs = (await this.getDocs())!.data as api.bestlyg.SidebarGroup;
        return [...(docs.groups ?? [])];
    }

    async getDocsSidebars(): Promise<api.bestlyg.ClientService.GetDocsSidebars.Request> {
        return { groups: await this.getGroups() };
    }

    async getLeetcodeSidebars(): Promise<api.bestlyg.ClientService.GetLeetcodeSidebars.Request> {
        const problems = await this.leetcodeService.getLeetcodeProblemList();
        const groups: api.bestlyg.SidebarGroup[] = [];
        for (const problem of problems) {
            const dirName = getDirNameFromProblemName(problem.name);
            let group = groups.find(v => v.name === dirName);
            if (!group) groups.push((group = { name: dirName, items: [] }));
            group.items?.push({
                name: problem.name,
                link: `/leetcode/${dirName}/${problem.name}`,
            });
        }
        groups.map(({ items }) => items?.sort((a, b) => problemSort(a.name, b.name)));
        groups.sort((a, b) => dirSort(a.name, b.name));
        return {
            groups: [
                {
                    name: 'LeetCode',
                    groups,
                },
            ],
        };
    }
}
