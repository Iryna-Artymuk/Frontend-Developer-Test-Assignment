import { Link } from 'react-router-dom';
import LogoIcon from '../Icons/LogoIcon';
import styles from './Logo.module.scss';
const Logo = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link
      aria-label="company logo navigation to home page"
      to="/"
      className={styles.logoWrapper}
      onClick={scrollToTop}
    >
      <LogoIcon />
      
    </Link>
  );
};

export default Logo;
