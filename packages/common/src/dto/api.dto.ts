import { createZodBaseModel } from '../zod';
import z from 'zod';

export const SidebarItemSchema = z.object({ name: z.string(), link: z.string() });

export type SidebarItem = z.infer<typeof SidebarItemSchema>;

export const SidebarGroupSchema = z.object({
    name: z.string(),
    items: z.array(SidebarItemSchema).optional(),
    get groups() {
        return z.array(SidebarGroupSchema).optional();
    },
});
export type SidebarGroup = z.infer<typeof SidebarGroupSchema>;

export class SidebarDto extends createZodBaseModel(
    z.object({ groups: z.array(SidebarGroupSchema).optional() }),
) {}

export type Sidebar = z.infer<ReturnType<typeof SidebarDto.getSchema>>;
