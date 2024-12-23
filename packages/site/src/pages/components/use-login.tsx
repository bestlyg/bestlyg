import { request } from '@site/src/utils';
import { useBoolean } from 'ahooks';
import { Modal, Form, Input, message } from 'antd';

export function useLogin() {
    const [visible, visibleOps] = useBoolean(false);
    const [form] = Form.useForm();
    async function login() {
        const data = await form.validateFields();
        const res = await request('/api/login', { body: data, method: 'POST' });
        if (!res) return;
        const token = res.token;
        localStorage.setItem('x-token', token);
        message.success('登录成功');
        visibleOps.setFalse();
    }
    const node = (
        <Modal title="登录" open={visible} onCancel={visibleOps.setFalse} onOk={login}>
            <Form form={form}>
                <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="密码" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    );
    return {
        node,
        visible,
        visibleOps,
    };
}
