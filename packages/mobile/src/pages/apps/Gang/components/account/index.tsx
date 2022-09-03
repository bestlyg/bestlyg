import { Page } from '@/app.config';
import { getPageUrl } from '@/utils';
import { Button, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import { AtButton } from 'taro-ui';
import { Account as TAccount, Type } from '../../models';
import styles from './styles.module.scss';

export function Account({ accounts, types }: { accounts: TAccount[]; types: Type[] }) {
  const [account1, account2] = React.useMemo(
    () => [
      accounts
        .filter(v => v.isPositive)
        .sort((a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime()),
      accounts
        .filter(v => !v.isPositive)
        .sort((a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime()),
    ],
    [accounts]
  );
  return (
    <View className={styles.container}>
      <View className={styles.types}>
        <View className={styles.title}>类型</View>
        {types.map(v => (
          <TypeItem key={v._id} type={v} />
        ))}
      </View>
      <View className={styles.accounts}>
        <View className={styles.accounts_item}>
          <View className={styles.title}>正向</View>
          {account1.map(v => (
            <AccountItem key={v._id} account={v} />
          ))}
        </View>
        <View className={styles.accounts_item}>
          <View className={styles.title}>负向</View>
          {account2.map(v => (
            <AccountItem key={v._id} account={v} />
          ))}
        </View>
      </View>
      <View className={styles.btns}>
        <AtButton
          type="primary"
          className={styles.btns_btn}
          onClick={() => Taro.navigateTo({ url: getPageUrl(Page.Apps_Gang_OpAccount) })}
        >
          添加账户
        </AtButton>
        <AtButton
          type="primary"
          className={styles.btns_btn}
          onClick={() => Taro.navigateTo({ url: getPageUrl(Page.Apps_Gang_OpType) })}
        >
          添加类型
        </AtButton>
      </View>
    </View>
  );
}

function AccountItem({ account }: { account: TAccount }) {
  return (
    <View className={styles.item_container}>
      <View className={styles.item_item}>名称:{account.name}</View>
      <View className={styles.item_item}>金额:{Math.floor(account.money) / 100}</View>
      <View className={styles.item_item}>类型:{account.isPositive ? '正向' : '负向'}</View>
      <Button
        className={styles.item_edit}
        onClick={() =>
          Taro.navigateTo({
            url: getPageUrl(Page.Apps_Gang_OpAccount, {
              type: 1,
              name: account.name,
              isPositive: account.isPositive,
              money: account.money / 100,
              _id: account._id,
            }),
          })
        }
      >
        修改
      </Button>
    </View>
  );
}

function TypeItem({ type }: { type: Type }) {
  return (
    <View className={styles.item_container}>
      <View className={styles.item_item}>名称:{type.name}</View>
      <Button
        className={styles.item_edit}
        onClick={() =>
          Taro.navigateTo({
            url: getPageUrl(Page.Apps_Gang_OpType, { type: 1, name: type.name, _id: type._id }),
          })
        }
      >
        修改
      </Button>
    </View>
  );
}
