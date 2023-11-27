import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Flex, Spin } from 'antd';

import './MainRoutes.scss';

const Home = React.lazy(() => import('pages/Home'));
const MovieDetail = React.lazy(() => import('pages/MovieDetail'));
const NotFound = React.lazy(() => import('pages/NotFound'));

const MainRoutes = () => {
  return (
    <React.Suspense
      fallback={
        <div className="fall-back-spin">
          <Flex justify="center" align="center" vertical>
            <Spin size="large" />
          </Flex>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};

export default MainRoutes;
