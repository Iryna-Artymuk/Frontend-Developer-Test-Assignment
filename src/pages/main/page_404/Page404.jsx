import { Link } from 'react-router-dom';
import styles from './Page404.module.scss';
import NavLinkButton from '@/components/ui/Buttons/NavLinkButton/NavLinkButton';

const Page404 = () => {
  return (
    <div className={styles.NotFound}>
      <div className={styles.wrapper}>
        <div className="image">
          {/* <img src="/404.svg" alt="page 404" /> */}
        </div>
        <p>
          Ой, сталась помилка!
          <br />
          сторінку не знайдено
        </p>

        <NavLinkButton text={'Повернутися на головну'} href="/" />
      </div>
    </div>
  );
};

export default Page404;
