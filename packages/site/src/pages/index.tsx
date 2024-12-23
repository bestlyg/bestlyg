import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from './components/homepage-features';
import Heading from '@theme/Heading';

import styles from './components/index.module.css';
import { useLogin } from './components/use-login';

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
