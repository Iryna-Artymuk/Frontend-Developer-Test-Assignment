import { HashLink } from 'react-router-hash-link';
import styles from './HashLink.module.scss';
const AnchorLink = ({ text, href }) => {
  return (
    <HashLink className={styles.link} to={href}>
      {text}
    </HashLink>
  );
};

export default AnchorLink;
