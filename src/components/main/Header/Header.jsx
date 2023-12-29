import LogoIcon from '@/components/Icons/Logo/LogoIcon';
import AnchorLink from '@/components/ui/Buttons/hashLink/HashLink';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header>
      <div className={styles.headerWrapper}>
        <div className={styles.contentWrapper}>
          <LogoIcon />
          <div className={styles.linkWrapper}>
            <AnchorLink text="Users" href="/#users" />
            <AnchorLink text="signUp" href="/#signUp" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
