import { View, Input, RadioGroup, Radio } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import { OpType } from '@/hooks';
import { AtButton } from 'taro-ui';
import baseStyles from '../styles.module.scss';
import { createAccount, updateAccount } from '../../apis';

const initForm: {
  name: string;
  isPositive: boolean;
  money: string;
  _id?: string;
} = { name: '', isPositive: true, money: '', _id: undefined };
export default function OpAccount() {
  const router = Taro.useRouter();
  const { type, name, isPositive, money, _id } = React.useMemo(() => {
    const { type, name, isPositive, money, _id } = router.params;
    return {
      type: type ? OpType.EDIT : OpType.CREATE,
      name: name ?? '',
      isPositive: isPositive === 'true',
      money: money ?? '',
      _id: _id ?? '',
    };
  }, [router]);
  const [form, setForm] = React.useState({ ...initForm });
  React.useEffect(() => {
    Taro.setNavigationBarTitle({ title: type === OpType.CREATE ? '创建账户' : '编辑账户' });
    if (type === OpType.EDIT) {
      setForm({ ...initForm, name, isPositive, money, _id });
    }
  }, [type]);
  const onSubmit = () => {
    const data = { ...form, money: Math.floor(parseFloat(form.money) * 100) };
    if (type === OpType.CREATE) {
      createAccount(data).then(() => {
        Taro.showToast({ title: '创建成功' });
        setTimeout(Taro.navigateBack, 100);
      });
    } else {
      updateAccount(data).then(() => {
        Taro.showToast({ title: '编辑成功' });
        setTimeout(Taro.navigateBack, 100);
      });
    }
  };
  const onReset = () => setForm({ ...initForm });
  return (
    <View className={baseStyles.form}>
      <View className={baseStyles.form_item}>
        <View className={baseStyles.form_title}>名称</View>
        <Input
          className={baseStyles.form_input}
          name="name"
          type="text"
          placeholder="请输入名称"
          value={form.name}
          onInput={e => {
            setForm({ ...form, name: e.detail.value });
          }}
        />
      </View>
      <View className={baseStyles.form_item}>
        <View className={baseStyles.form_title}>金额</View>
        <Input
          className={baseStyles.form_input}
          name="money"
          type="text"
          placeholder="请输入金额"
          value={form.money}
          onInput={e => {
            const money = e.detail.value.replace(/^[\D.-]$/g, '');
            setForm({ ...form, money });
          }}
        />
      </View>
      <View className={baseStyles.form_item}>
        <View className={baseStyles.form_title}>类型</View>
        <RadioGroup
          onChange={e => {
            const isPositive = Boolean(Number(e.detail.value));
            setForm({ ...form, isPositive });
          }}
        >
          <Radio value="1" checked={form.isPositive}>
            正向
          </Radio>
          <Radio value="0" checked={!form.isPositive}>
            负向
          </Radio>
        </RadioGroup>
      </View>
      <View className={baseStyles.form_btns}>
        <AtButton onClick={onSubmit} className={baseStyles.form_btn} type="primary">
          提交
        </AtButton>
        <AtButton onClick={onReset} className={baseStyles.form_btn}>
          重置
        </AtButton>
      </View>
    </View>
  );
}
