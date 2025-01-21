import * as idl from "@bestlyg/common/idl/client";

export function findFirstSidebarItem(
  groups?: idl.api.bestlyg.SidebarGroup[]
): idl.api.bestlyg.SidebarItem | null {
  if (!groups) return null;
  for (const group of groups) {
    if (group.items?.length) return group.items[0];
    const res = findFirstSidebarItem(group.groups);
    if (res) return res;
  }
  return null;
}
