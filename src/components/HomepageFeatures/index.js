import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Mikä homma?',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Tässä julkaistuna verkkosivustoni ensimmäinen versio. Sivusto on tarkoitettu itselleni blogialustaksi ja omien touhujeni dokumentointiin. Jos olet löytänyt tänne sattumalta ja sisällöstä on hyötyä.
      </>
    ),
  },
  {
    title: 'CV ja Dokumentit',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Yllä olevasta nappulasta pääsee katsomaan jonkinasteista CV:täni kun sen saan tänne lisättyä. Lisäksi CV:n alta löytyy useampia dokumentteja liittyen projekteihini. Esimerkiksi listaus TryHack Me sertifikaateistani. 
      </>
    ),
  },
  {
    title: 'Blogi',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Blogi osastolta löytyy satunnaisesti päivityksiä, asioista joita on ajankohtaisesti tullut tehtyä. Päivitysaikataulu on siis silloin kun huvittaa.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
