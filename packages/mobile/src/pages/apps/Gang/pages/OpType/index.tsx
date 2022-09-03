import { View, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import { OpType as TOpType } from '@/hooks';
import { AtButton } from 'taro-ui';
import baseStyles from '../styles.module.scss';
import { createType, updateType } from '../../apis';

const initForm = { name: '', _id: '' };
export default function OpType() {
  const router = Taro.useRouter();
  const { type, name, _id } = React.useMemo(() => {
    const { type, name, _id } = router.params;
    return {
      type: type ? TOpType.EDIT : TOpType.CREATE,
      name: name ?? '',
      _id: _id ?? '',
    };
  }, [router]);
  React.useEffect(() => {
    Taro.setNavigationBarTitle({ title: type === TOpType.CREATE ? '创建类型' : '编辑类型' });
    if (type === TOpType.EDIT) {
      setForm({ ...initForm, name, _id });
    }
  }, [type]);
  const [form, setForm] = React.useState({ ...initForm });
  const onSubmit = () => {
    if (type === TOpType.CREATE) {
      createType(form).then(() => {
        Taro.showToast({ title: '创建成功' });
        setTimeout(Taro.navigateBack, 100);
      });
    } else {
      updateType(form).then(() => {
        Taro.showToast({ title: '创建成功' });
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
