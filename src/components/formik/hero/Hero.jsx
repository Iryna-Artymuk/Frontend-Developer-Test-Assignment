import Container from '../../container/Container';
import AnchorLink from '../../ui/Buttons/hashLink/HashLink';
import styles from './Hero.module.scss';
const Hero = () => {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.heroContentWrapper}>
          <div className={styles.hero_textWrapper}>
            <h1 className="title">Test assignment for front-end developer</h1>
            <p>
              What defines a good front-end developer is one that has skilled
              knowledge of HTML, CSS, JS with a vast understanding of User
              design thinking as they thinking as they&apos;ll be building web
              interfaces with accessibility in ll be building web interfaces
              with accessibility in mind. They should also be excited to learn,
              as the world of Front-End Development keeps evolving.
            </p>
          </div>

          <AnchorLink text="Sign up" href="/#signUp" />
        </div>
      </Container>
    </section>
  );
};

export default Hero;
