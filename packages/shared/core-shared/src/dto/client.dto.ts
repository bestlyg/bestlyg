import { z } from 'zod';

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
export const ClientGetDocsSidebarsRequestSchema = z.object({}).strip();
export type ClientGetDocsSidebarsRequestDto = z.output<typeof ClientGetDocsSidebarsRequestSchema>;

/** 获取文档侧边栏响应 DTO。 */
export const ClientGetDocsSidebarsResponseSchema = sidebarSchema;
export type ClientGetDocsSidebarsResponseDto = z.output<typeof ClientGetDocsSidebarsResponseSchema>;

/** 获取 LeetCode 侧边栏请求 DTO。 */
export const ClientGetLeetcodeSidebarsRequestSchema = z.object({}).strip();
export type ClientGetLeetcodeSidebarsRequestDto = z.output<
    typeof ClientGetLeetcodeSidebarsRequestSchema
>;

/** 获取 LeetCode 侧边栏响应 DTO。 */
export const ClientGetLeetcodeSidebarsResponseSchema = sidebarSchema;
export type ClientGetLeetcodeSidebarsResponseDto = z.output<
    typeof ClientGetLeetcodeSidebarsResponseSchema
>;
