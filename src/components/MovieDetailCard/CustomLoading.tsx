import React, { FC } from 'react';
import { Col, Row, Skeleton } from 'antd';

import './index.scss';

const CustomLoading: FC = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={3}></Col>
      <Col span={18}>
        <Skeleton avatar active />
        <Skeleton avatar active />
      </Col>
      <Col span={3}></Col>

      <Col span={3}></Col>
      <Col span={3}>
        <Skeleton active />
        <Skeleton active />
      </Col>
      <Col span={3}>
        <Skeleton active />
        <Skeleton active />
      </Col>
      <Col span={3}>
        <Skeleton active />
      </Col>
      <Col span={3}>
        <Skeleton active />
        <Skeleton active />
      </Col>
      <Col span={3}>
        <Skeleton active />
        <Skeleton active />
      </Col>
      <Col span={3}>
        <Skeleton active />
      </Col>
      <Col span={3}></Col>

      <Col span={3}></Col>
      <Col span={18}>
        <Skeleton active />
        <Skeleton active />
      </Col>
      <Col span={3}></Col>
    </Row>

    // <div className="skeleton-movie-detail-card">
    //   <div className="skeleton-img">
    //     <Skeleton.Image active />
    //   </div>
    //   <Skeleton avatar active />
    //   <Skeleton avatar active />
    //   <br />
    //   <br />
    //   <Skeleton active />
    // </div>
  );
};

export default CustomLoading;
