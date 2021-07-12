export enum Page {
  Home,
  Management,
  Service,
  User,
}
const PAGES: Record<Page, string> = {
  [Page.Home]: 'pages/tabbar/Home/Home',
  [Page.Management]: 'pages/tabbar/Management/Management',
  [Page.Service]: 'pages/tabbar/Service/Service',
  [Page.User]: 'pages/tabbar/User/User',
};
export default {
  pages: Object.values(PAGES),
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#666666',
    selectedColor: '#00BDC3',
    list: [
      { page: Page.Home, title: '首页', img: 'home' },
      { page: Page.Management, title: '管理', img: 'management' },
      { page: Page.Service, title: '服务', img: 'service' },
      { page: Page.User, title: '我的', img: 'user' },
    ].map(({ page, title, img }) => ({
      pagePath: PAGES[page],
      text: title,
      iconPath: `assets/tabbar/${img}.png`,
      selectedIconPath: `assets/tabbar/${img}_active.png`,
    })),
  },
  usingComponents: {},
};
