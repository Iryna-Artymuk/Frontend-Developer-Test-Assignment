import Hero from '@/components/hero/Hero';
import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
     <Hero/>
    </>
  );
};

export default HomePage;
