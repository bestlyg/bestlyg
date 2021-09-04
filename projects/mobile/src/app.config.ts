export enum Page {
  Tabbar_Home,
  Tabbar_Management,
  Tabbar_Service,
  Tabbar_User,
}
export const pageUrlMap: Map<Page, string> = new Map([
  /** tabbar */
  [Page.Tabbar_Home, 'pages/tabbar/Home/Home'],
  [Page.Tabbar_Service, 'pages/tabbar/Service/Service'],
  [Page.Tabbar_User, 'pages/tabbar/User/User'],
  [Page.Tabbar_Management, 'pages/tabbar/Management/Management'],
]);
export default {
  pages: Array.from(pageUrlMap.values()),
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
      { page: Page.Tabbar_Home, title: '首页', img: 'home' },
      { page: Page.Tabbar_Management, title: '管理', img: 'management' },
      { page: Page.Tabbar_Service, title: '服务', img: 'service' },
      { page: Page.Tabbar_User, title: '我的', img: 'user' },
    ].map(({ page, title, img }) => ({
      pagePath: pageUrlMap.get(page)!,
      text: title,
      iconPath: `assets/images/tabbar/${img}.png`,
      selectedIconPath: `assets/images/tabbar/${img}_active.png`,
    })),
  },
  usingComponents: {},
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示',
    },
  },
};
