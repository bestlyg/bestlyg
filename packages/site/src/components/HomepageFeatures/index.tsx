import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import LeetCode_SVG from './undraw_docusaurus_mountain.svg';
import Journal_SVG from './undraw_docusaurus_tree.svg';
import Record_SVG from './undraw_docusaurus_react.svg';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'LeetCode',
    Svg: LeetCode_SVG,
    description: <>LeetCode</>,
  },
  {
    title: 'Journal',
    Svg: Journal_SVG,
    description: <>Journal</>,
  },
  {
    title: 'Record',
    Svg: Record_SVG,
    description: <>Record</>,
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
