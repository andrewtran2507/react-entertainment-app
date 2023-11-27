import React, { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import './index.scss';

interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <ConfigProvider theme={{}}>
      <div className="main-layout">
        <div>{children}</div>
      </div>
    </ConfigProvider>
  );
};

export default MainLayout;
