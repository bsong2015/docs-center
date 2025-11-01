import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from './HomepageFeatures';
import Heading from '@theme/Heading';

import styles from '@site/src/pages/index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
import Translate from '@docusaurus/Translate';

// ... other imports ...

        <Heading as="h1" className="hero__title">
          <Translate id="homepage.title" description="The title of the homepage">Enterprise Multi-Product Documentation Center</Translate>
        </Heading>
        <p className="hero__subtitle">This is a demo of a multi-product, multi-version, multi-language documentation center.</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/eiam/intro">
            View Demo
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="A unified, centralized, and easy-to-maintain documentation center for enterprise products.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
