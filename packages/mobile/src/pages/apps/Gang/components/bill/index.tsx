import { Button, View } from '@tarojs/components';
import React from 'react';
import { AtTimeline } from 'taro-ui';
import styles from './styles.module.scss';

export function Bill() {
  return (
    <View className={styles.container}>
      <BillItem />
      <BillItem />
      <BillItem />
      <Button className={styles.add}>添加</Button>
    </View>
  );
}

function BillItem() {
  return (
    <View className={styles.billitem}>
      <View className={styles.billitem_title}>title</View>
      <AtTimeline
        pending
        items={[
          { title: '刷牙洗脸', content: ['大概8:00'], icon: 'check-circle' },
          { title: '吃早餐', content: ['牛奶+面包', '餐后记得吃药'], icon: 'clock' },
          { title: '上班', content: ['查看邮件', '写PPT', '发送PPT给领导'], icon: 'clock' },
          { title: '睡觉', content: ['不超过23:00'], icon: 'clock' },
        ]}
      ></AtTimeline>
    </View>
  );
}
