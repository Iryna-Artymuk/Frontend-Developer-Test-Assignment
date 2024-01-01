import { useEffect, useState } from 'react';
import Button from '../../ui/Buttons/button/Button';
import Container from '../../container/Container';
import User from './User';
import Spinner from '@/components/ui/Spinner/Spinner';

import useUsersStore from '@/store/usersStore';

import styles from './UsersList.module.scss';

const UsersList = ({ users, handelShowMore, page }) => {
  const loading = useUsersStore(state => state.loading);
  const total_pages = useUsersStore(state => state.total_pages);
  const [sortedUsers, setsortedUsers] = useState();

  useEffect(() => {
    const sortResult = [...users].sort(function (a, b) {
      return b.registration_timestamp - a.registration_timestamp;
    });
    setsortedUsers(sortResult);
  }, [users]);

  return (
    <section id="users">
      <Container>
        <div className="contentWrapper">
          <h2 className="title">Working with GET request</h2>
          <ul className={styles.list}>
            {sortedUsers?.map(userInfo => (
              <User key={userInfo.id} userInfo={userInfo} />
            ))}
          </ul>
          {!loading ? (
            <div>
              {total_pages !== page && (
                <Button type="button" active={true} onClick={handelShowMore}>
                  show more
                </Button>
              )}
            </div>
          ) : (
         <Spinner/>
          )}
        </div>
      </Container>
    </section>
  );
};

export default UsersList;
