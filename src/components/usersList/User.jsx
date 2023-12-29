import styles from './UsersList.module.scss';
const User = ({ userInfo }) => {
  const { name, email, position, photo, phone } = userInfo;

  return (
    <li className={styles.listItem}>
      <div className={styles.userInfoWrapper}>
        <img className={styles.photo} src={photo} alt={name} />
        <p className={styles.name}>{name}</p>
        <div className={styles.userInfo}>
          <p>{position}</p>
          <p>{email}</p>
          <p>{phone}</p>
        </div>
      </div>
    </li>
  );
};

export default User;
