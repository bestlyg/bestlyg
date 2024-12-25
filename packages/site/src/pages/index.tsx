import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from './components/homepage-features';
import Heading from '@theme/Heading';
import { request } from '@site/src/utils';
import { useBoolean } from 'ahooks';
import { Modal, Form, Input, message } from 'antd';
import styles from './components/index.module.css';

export function useLogin() {
    const [visible, visibleOps] = useBoolean(false);
    const [form] = Form.useForm();
    async function login() {
        const data = await form.validateFields();
        const res = await request('/api/auth/login', { body: data, method: 'POST' });
        if (!res) return;
        const token = res.access_token;
        localStorage.setItem('x-token', token);
        message.success('登录成功');
        visibleOps.setFalse();
    }
    const node = (
        <Modal
            title="登录"
            open={visible}
            onCancel={visibleOps.setFalse}
            onOk={async () => login().catch(() => {})}
        >
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

function HomepageHeader() {
    const { node, visibleOps } = useLogin();
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link className="button button--secondary button--lg" to="/docs/intro">
                        Start a journey - 10min ⏱️
                    </Link>
                </div>
                <div className={styles.buttons} style={{ marginTop: 10 }}>
                    <Link className="button button--secondary" onClick={visibleOps.setTrue}>
                        Login With OwnerKey
                    </Link>
                </div>
            </div>
            {node}
        </header>
    );
}

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
        >
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    );
}
