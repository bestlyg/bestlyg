import { Page } from '@/app.config';
import { useStore } from '@/store';
import { getPageUrl } from '@/utils';
import { View, ScrollView } from '@tarojs/components';
import { AtModal, AtTabs, AtTabsPane } from 'taro-ui';
import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import React from 'react';
import { Bill, Statistics, Account } from './components';
import { getAccount, getBill, getType } from './apis';
import styles from './styles.module.scss';
import './global.scss';

definePageConfig({
  navigationBarTitleText: '小李小叶港',
});
export default function Main() {
  const { state } = useStore(state => state.global.login);
  Taro.useDidShow(() => {
    if (!state) {
      Taro.switchTab({ url: getPageUrl(Page.Tabbar_WorkBench) });
    }
  });
  const [tab, setTab] = React.useState(2);
  const { data: accounts, refresh: refreshAccount } = useRequest(getAccount);
  const { data: bill, refresh: refreshBill } = useRequest(getBill);
  const { data: types, refresh: refreshType } = useRequest(getType);
  React.useEffect(() => {
    console.log('account', accounts);
    console.log('bill', bill);
    console.log('types', types);
  }, [accounts, bill, types]);
  const tabList = [
    { title: '账单', component: <Bill /> },
    { title: '统计', component: <Statistics /> },
    { title: '账户', component: <Account accounts={accounts ?? []} types={types ?? []} /> },
  ];
  Taro.useDidShow(() => {
    refreshAccount();
    refreshBill();
    refreshType();
  });
  return (
    <View>
      <AtTabs current={tab} tabList={tabList} onClick={setTab}>
        {tabList.map((item, i) => (
          <AtTabsPane current={tab} index={i} key={i}>
            <ScrollView scrollY scrollWithAnimation className={styles.subtab}>
              {item.component}
            </ScrollView>
          </AtTabsPane>
        ))}
      </AtTabs>
    </View>
  );
}
