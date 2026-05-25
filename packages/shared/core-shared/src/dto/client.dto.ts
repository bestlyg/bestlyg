import { z } from 'zod';
import { createZodModel } from '../zod';

const sidebarItemSchema = z.object({
    name: z.string(),
    link: z.string(),
});

/** 左侧导航中的叶子菜单项。 */
export type SidebarItem = z.output<typeof sidebarItemSchema>;

/** 左侧导航分组，允许递归嵌套子分组。 */
export interface SidebarGroup {
    name: string;
    items?: SidebarItem[];
    groups?: SidebarGroup[];
}

const sidebarGroupSchema: z.ZodType<SidebarGroup> = z.lazy(() =>
    z.object({
        name: z.string(),
        items: z.array(sidebarItemSchema).optional(),
        groups: z.array(sidebarGroupSchema).optional(),
    }),
);

/** 左侧导航接口返回的根结构。 */
export interface Sidebar {
    groups?: SidebarGroup[];
}

const sidebarSchema: z.ZodType<Sidebar> = z.object({
    groups: z.array(sidebarGroupSchema).optional(),
});

/** 获取文档侧边栏请求 DTO。 */
export class ClientGetDocsSidebarsRequestDto extends createZodModel(z.object({}).strip()) {}

/** 获取文档侧边栏响应 DTO。 */
export class ClientGetDocsSidebarsResponseDto extends createZodModel(sidebarSchema) {}

/** 获取 LeetCode 侧边栏请求 DTO。 */
export class ClientGetLeetcodeSidebarsRequestDto extends createZodModel(z.object({}).strip()) {}

/** 获取 LeetCode 侧边栏响应 DTO。 */
export class ClientGetLeetcodeSidebarsResponseDto extends createZodModel(sidebarSchema) {}
