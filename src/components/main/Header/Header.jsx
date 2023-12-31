import LogoIcon from '@/components/Icons/Logo/LogoIcon';
import AnchorLink from '@/components/ui/Buttons/hashLink/HashLink';
import Container from '@/components/container/Container';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header>
      <Container>
        <div className={styles.headerWrapper}>
          <div className={styles.headerContentWrapper}>
            <LogoIcon />
            <div className={styles.linkWrapper}>
              <AnchorLink text="Users" href="/#users" />
              <AnchorLink text="Sign up" href="/#signUp" />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
