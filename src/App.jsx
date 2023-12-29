import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/main/HomePage';
import Page404 from './pages/main/page_404/Page404';
import Layout from './components/layout/Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
