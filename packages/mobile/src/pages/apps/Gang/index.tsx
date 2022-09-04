import { Page } from '@/app.config';
import { useStore } from '@/store';
import { getPageUrl } from '@/utils';
import { View, ScrollView } from '@tarojs/components';
import { AtModal, AtTabs, AtTabsPane } from 'taro-ui';
import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import React from 'react';
import { SafeBottomBlock } from '@/components';
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
  const [tab, setTab] = React.useState(0);
  const { data: accounts, run: refreshAccount } = useRequest(getAccount, { manual: true });
  const { data: bill, run: refreshBill } = useRequest(getBill, { manual: true });
  const { data: types, run: refreshType } = useRequest(getType, { manual: true });
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
              <SafeBottomBlock height={40} />
            </ScrollView>
          </AtTabsPane>
        ))}
      </AtTabs>
    </View>
  );
}
