import { View, Input, Picker, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import * as dayjs from 'dayjs';
import { OpType } from '@/hooks';
import { AtButton, AtModal, AtModalAction, AtModalContent, AtModalHeader } from 'taro-ui';
import { useRequest } from 'ahooks';
import baseStyles from '../styles.module.scss';
import { createBill, getAccount, getType, updateBill } from '../../apis';

const initForm: {
    money: string;
    date: Date;
    remark: string;
    desc: string;
    accountId: string;
    typeId: string;
    _id?: string;
} = {
    _id: undefined,
    money: '',
    date: new Date(),
    remark: '',
    desc: '',
    accountId: '',
    typeId: '',
};
export default function OpBill() {
    const [modalVisible, setModalVisible] = React.useState(false);
    const { data: accounts } = useRequest(getAccount);
    const accountList = React.useMemo(() => accounts?.map(v => v.name) ?? [], [accounts]);
    const { data: types } = useRequest(getType);
    const typeList = React.useMemo(() => types?.map(v => v.name) ?? [], [types]);
    const router = Taro.useRouter();
    const { type, _id, money, typeId, accountId, remark, desc, date } = React.useMemo(() => {
        const { type, _id, money, typeId, accountId, remark, desc, date } = router.params;
        return {
            type: type ? OpType.EDIT : OpType.CREATE,
            money: money ?? '',
            _id: _id ?? '',
            typeId: typeId ?? '',
            accountId: accountId ?? '',
            remark: remark ?? '',
            desc: desc ?? '',
            date: new Date(+(date ?? '0')),
        };
    }, [router]);
    const [form, setForm] = React.useState({ ...initForm });
    React.useEffect(() => {
        Taro.setNavigationBarTitle({ title: type === OpType.CREATE ? '创建账单' : '编辑账单' });
        if (type === OpType.EDIT) {
            setForm({ ...initForm, _id, money, typeId, accountId, remark, desc, date });
        }
    }, [type]);
    const onSubmit = () => {
        const data = { ...form, money: Math.floor(parseFloat(form.money) * 100) };
        let err = '';
        if (accounts?.find(v => v._id === data.accountId) === undefined) {
            err = '账户';
        } else if (types?.find(v => v._id === data.typeId) === undefined) {
            err = '类型';
        } else if (data.desc === '') {
            err = '描述';
        }
        if (err) {
            Taro.showToast({ title: err + '错误', icon: 'none' });
            return;
        }
        if (type === OpType.CREATE) {
            createBill(data).then(() => {
                Taro.showToast({ title: '创建成功' });
                setTimeout(Taro.navigateBack, 100);
            });
        } else {
            updateBill(data).then(() => {
                Taro.showToast({ title: '编辑成功' });
                setTimeout(Taro.navigateBack, 100);
            });
        }
    };
    const onReset = () => setForm({ ...initForm });
    return (
        <View className={baseStyles.form}>
            <View className={baseStyles.form_item}>
                <View className={baseStyles.form_title}>金额</View>
                <Input
                    className={baseStyles.form_input}
                    name="money"
                    type="text"
                    placeholder="请输入金额"
                    value={form.money}
                    onInput={e => {
                        const money = e.detail.value.replace(/^[\D.]$/g, '');
                        setForm({ ...form, money });
                    }}
                />
            </View>
            <View className={baseStyles.form_item}>
                <View className={baseStyles.form_title}>描述</View>
                <Input
                    className={baseStyles.form_input}
                    name="desc"
                    type="text"
                    placeholder="请输入描述"
                    value={form.desc}
                    onInput={e => {
                        setForm({ ...form, desc: e.detail.value });
                    }}
                />
            </View>
            <View className={baseStyles.form_item}>
                <View className={baseStyles.form_title}>备注</View>
                <Input
                    className={baseStyles.form_input}
                    name="remark"
                    type="text"
                    placeholder="请输入名称"
                    value={form.remark}
                    onInput={e => setForm({ ...form, remark: e.detail.value })}
                />
            </View>
            <View className={baseStyles.form_item}>
                <View className={baseStyles.form_title}>时间</View>
                <Picker
                    mode="date"
                    value={dayjs(form.date).format('YYYY-MM-DD')}
                    onChange={e => setForm({ ...form, date: new Date(e.detail.value) })}
                >
                    <View className={baseStyles.form_input}>
                        {dayjs(form.date).format('YYYY-MM-DD')}
                    </View>
                </Picker>
            </View>
            <View className={baseStyles.form_item}>
                <View className={baseStyles.form_title}>类型</View>
                <Picker
                    mode="selector"
                    value={types?.findIndex(v => v._id === form.typeId) ?? 0}
                    onChange={e =>
                        setForm({
                            ...form,
                            typeId:
                                types?.find(v => v.name === typeList[+e.detail.value])?._id ?? '',
                        })
                    }
                    range={typeList}
                >
                    <View className={baseStyles.form_input}>
                        {types?.find(v => v._id === form.typeId)?.name ?? '暂无选择'}
                    </View>
                </Picker>
            </View>
            <View className={baseStyles.form_item}>
                <View className={baseStyles.form_title}>账户</View>
                <Picker
                    mode="selector"
                    value={accounts?.findIndex(v => v._id === form.accountId) ?? 0}
                    onChange={e =>
                        setForm({
                            ...form,
                            accountId:
                                accounts?.find(v => v.name === accountList[+e.detail.value])?._id ??
                                '',
                        })
                    }
                    range={accountList}
                >
                    <View className={baseStyles.form_input}>
                        {accounts?.find(v => v._id === form.accountId)?.name ?? '暂无选择'}
                    </View>
                </Picker>
            </View>
            <View className={baseStyles.form_btns}>
                <AtButton
                    onClick={() => setModalVisible(true)}
                    className={baseStyles.form_btn}
                    type="primary"
                >
                    提交
                </AtButton>
                <AtButton onClick={onReset} className={baseStyles.form_btn}>
                    重置
                </AtButton>
            </View>
            <AtModal isOpened={modalVisible}>
                <AtModalHeader>确认{type === OpType.CREATE ? '创建' : '修改'}</AtModalHeader>
                <AtModalContent>
                    <View>金额：{Math.floor(parseFloat(form.money) * 100) / 100}</View>
                    <View>描述：{form.desc}</View>
                    <View>备注：{form.remark}</View>
                    <View>时间：{dayjs(form.date).format('YYYY-MM-DD')}</View>
                    <View>
                        账户：{accounts?.find(v => v._id === form.accountId)?.name ?? '暂无'}
                    </View>
                    <View>类型：{types?.find(v => v._id === form.typeId)?.name ?? '暂无'}</View>
                </AtModalContent>
                <AtModalAction>
                    <Button onClick={() => setModalVisible(false)}>取消</Button>
                    <Button onClick={onSubmit}>确定</Button>
                </AtModalAction>
            </AtModal>
        </View>
    );
}
