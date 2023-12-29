import { Outlet } from 'react-router-dom';
import Container from '../container/Container';
import Header from '../main/Header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
