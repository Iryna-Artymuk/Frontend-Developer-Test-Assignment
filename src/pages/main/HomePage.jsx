import Hero from '@/components/formik/hero/Hero';
import SingUpForm from '@/components/main/singUpForm/SingUpForm';
import UsersList from '@/components/main/usersList/UsersList';
import SuccessImage from '@/components/successImage/SuccessImage';
import useAuthStore from '@/store/authStore';
import useUsersStore from '@/store/usersStore';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const { getUsers } = useUsersStore();
  const isNewUserRegister = useAuthStore(state => state.isNewUserRegister);

  console.log('isNewUserRegister : ', isNewUserRegister);
  const [users, setUsers] = useState([]);
  console.log('users: ', users);
  const [page, setPage] = useState(1);
  const [count] = useState(6);
  const [isMount, setIsMount] = useState(true);
  useEffect(
    () => {
      if (isMount) {
        setIsMount(false);
        return;
      }
      const fetchNews = async () => {
        const responce = await getUsers(page, count);
        if (responce.status === 200) {
          setUsers(prev => [...prev, ...responce.data.users]);
        }
      };
      fetchNews();
    },
    [getUsers, page, count, isMount],
    isMount
  );

  const handelShowMore = () => {
    console.log(page);
    setPage(prev => prev + 1);
  };
  return (
    <>
      <Hero />
      <UsersList users={users} handelShowMore={handelShowMore} page={page} />
      {!isNewUserRegister ? (
        <SingUpForm setPage={setPage} setUsers={setUsers} page={page} />
      ) : (
        <SuccessImage />
      )}
    </>
  );
};

export default HomePage;
