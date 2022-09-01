export enum Page {
  /** 首页 */
  Tabbar_Home,
  /** 工作台 */
  Tabbar_WorkBench,
  /** 我的 */
  Tabbar_User,
  /** Demos首页 */
  Demos_Main,
  /** ECHarts演示 */
  Demos_ECharts,
  /** Store演示 */
  Demos_Store,
  /** Poster演示 */
  Demos_Poster,
  /** OpModal演示 */
  Demos_OpModal,
  /** QRCode  */
  Demos_QRCode,
  /** 专星跳BLE  */
  Demos_ZXT_BLE,
}
const pageMeta: [Page, string][] = [
  /** tabbar */
  [Page.Tabbar_Home, 'pages/tabbar/Home/index'],
  [Page.Tabbar_WorkBench, 'pages/tabbar/WorkBench/index'],
  [Page.Tabbar_User, 'pages/tabbar/User/index'],
  /** demos */
  [Page.Demos_Main, 'pages/demos/Main/index'],
  [Page.Demos_ECharts, 'pages/demos/ECharts/index'],
  [Page.Demos_Store, 'pages/demos/Store/index'],
  [Page.Demos_Poster, 'pages/demos/Poster/index'],
  [Page.Demos_OpModal, 'pages/demos/OpModal/index'],
  [Page.Demos_QRCode, 'pages/demos/QRCode/index'],
  [Page.Demos_ZXT_BLE, 'pages/demos/ZXT_BLE/index'],
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
  subPackages = ['pages/login', 'pages/workbench', 'pages/user', 'pages/common'].map(root => ({
    root,
    pages: Array.from(pageUrlMap.values())
      .filter(url => url.startsWith(root))
      .map(url => url.replace(root + '/', '')),
  }));
  const set = new Set(
    subPackages.map(({ root, pages }) => pages.map(page => `${root}/${page}`)).flat()
  );
  pages = Array.from(pageUrlMap.values()).filter(v => !set.has(v));
} else {
  pages = Array.from(pageUrlMap.values());
}
export default {
  pages,
  subPackages,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#7875A4',
    selectedColor: '#5B51E5',
    list: [
      { page: Page.Tabbar_Home, title: '首页', img: 'home' },
      { page: Page.Tabbar_WorkBench, title: '工作台', img: 'workbench' },
      { page: Page.Tabbar_User, title: '我的', img: 'user' },
    ].map(({ page, title, img }) => ({
      pagePath: pageUrlMap.get(page)!,
      text: title,
      iconPath: `assets/images/tabbar/${img}.png`,
      selectedIconPath: `assets/images/tabbar/${img}_active.png`,
    })),
  },
};
