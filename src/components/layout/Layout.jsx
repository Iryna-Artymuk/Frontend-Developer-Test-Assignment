import { Outlet } from 'react-router-dom';
import Container from '../container/Container';
import Header from '../main/Header/Header';

const Layout = () => {
  return (
    <Container>
      <Header />
      <main>
        <Outlet />
      </main>
    </Container>
  );
};
export default Layout;
