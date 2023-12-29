import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section
        style={{ width: '100%', height: '100vh', background: 'red' }}
        id="users"
      >
        users
      </section>
      <section
        style={{ width: '100%', height: '100vh', background: 'blue' }}
        id="signUp"
      >
        signUp
      </section>
    </>
  );
};

export default HomePage;
