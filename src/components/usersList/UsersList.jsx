import Button from '../button/Button';
import Container from '../container/Container';
import User from './User';
import styles from './UsersList.module.scss';
const UsersList = ({ users, handelShowMore }) => {
  return (
    <section id="users">
      <Container>
        <div className={styles.contentWrapper}>
          <h2 className="title">Working with GET request</h2>
          <ul className={styles.list}>
            {users.map(userInfo => (
              <User key={userInfo.id} userInfo={userInfo} />
            ))}
          </ul>
          <Button type="button" active={true} onClick={handelShowMore}>
            show more
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default UsersList;
