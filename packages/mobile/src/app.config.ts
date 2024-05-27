export enum Page {
  /** 首页 */
  Tabbar_Home,
  /** 工作台 */
  Tabbar_WorkBench,
  /** 我的 */
  Tabbar_User,
}
const pageMeta: [Page, string][] = [
  /** tabbar */
  [Page.Tabbar_Home, "pages/tabbar/Home/index"],
  [Page.Tabbar_WorkBench, "pages/tabbar/WorkBench/index"],
  [Page.Tabbar_User, "pages/tabbar/User/index"],
];
export const pageUrlMap: Map<Page, string> = new Map(pageMeta);
const isSubpackage = false;
let pages!: string[];
let subPackages:
  | {
      root: string;
      pages: string[];
    }[]
  | undefined;
if (isSubpackage) {
  subPackages = [
    "pages/login",
    "pages/workbench",
    "pages/user",
    "pages/common",
  ].map((root) => ({
    root,
    pages: Array.from(pageUrlMap.values())
      .filter((url) => url.startsWith(root))
      .map((url) => url.replace(root + "/", "")),
  }));
  const set = new Set(
    subPackages
      .map(({ root, pages }) => pages.map((page) => `${root}/${page}`))
      .flat()
  );
  pages = Array.from(pageUrlMap.values()).filter((v) => !set.has(v));
} else {
  pages = Array.from(pageUrlMap.values());
}

export default defineAppConfig({
  pages,
  subPackages,
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "信韵",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#7875A4",
    selectedColor: "#5B51E5",
    list: [
      { page: Page.Tabbar_Home, title: "首页", img: "home" },
      { page: Page.Tabbar_WorkBench, title: "工作台", img: "workbench" },
      { page: Page.Tabbar_User, title: "我的", img: "user" },
    ].map(({ page, title, img }) => ({
      pagePath: pageUrlMap.get(page)!,
      text: title,
      iconPath: `assets/images/tabbar/${img}.png`,
      selectedIconPath: `assets/images/tabbar/${img}_active.png`,
    })),
  },
});
