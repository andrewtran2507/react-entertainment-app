import React, { FC } from 'react';

import MainLayout from 'components/Layout/MainLayout';
import MainRoutes from 'router/MainRoutes';
import 'react-lazy-load-image-component/src/effects/blur.css';

const App: FC = () => {
  return (
    <React.StrictMode>
      <MainLayout>
        <MainRoutes />
      </MainLayout>
    </React.StrictMode>
  );
};

export default App;
