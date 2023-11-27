import React, { FC, useMemo, memo } from 'react';
import { Card, Flex, Typography, Image, Descriptions, Row, Col } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getImageULR } from 'utils/fnc/common';
import { imageFolder, movieInfo, moviePlusInfo } from 'utils/constant';
import CustomLoading from './CustomLoading';
import {
  ZMovieDetailModel,
  ZExtendItemModel,
} from 'pages/MovieDetail/Redux/types';

import './index.scss';
const { Meta } = Card;

const CardRenderer: FC<{ item: ZExtendItemModel }> = ({ item }) => (
  <Card
    hoverable
    cover={
      <LazyLoadImage
        alt="profile image"
        effect="blur"
        wrapperProps={{
          style: { transitionDelay: '1s' },
        }}
        src={getImageULR(item?.profile_path, imageFolder['220x330'])}
      />
    }
  >
    <Meta title={item?.name} description={item?.job || item?.character} />
  </Card>
);

const CreditsRenderer: FC<{ data: ZExtendItemModel[] }> = ({ data }) => (
  <Row gutter={[8, 16]}>
    {data?.map((item: ZExtendItemModel) => (
      <Col
        xxl={{ span: 3 }}
        xl={{ span: 4 }}
        md={{ span: 6 }}
        sm={{ span: 8 }}
        xs={{ span: 8 }}
        key={item?.id} // EX: id = 609682 not an index number
      >
        <CardRenderer item={item} />
      </Col>
    ))}
  </Row>
);

const MovieDetailCard: FC<{
  loading: boolean;
  movieDetailItem: ZMovieDetailModel | null;
}> = ({ loading = true, movieDetailItem }) => {
  const covertImage = useMemo(
    () => getImageULR(movieDetailItem?.backdrop_path, imageFolder['1920x800']),
    [movieDetailItem?.backdrop_path],
  );

  const posterImage = useMemo(
    () => getImageULR(movieDetailItem?.poster_path, imageFolder['300x450']),
    [movieDetailItem?.poster_path],
  );

  const descriptionsMovieData = useMemo(
    () =>
      movieInfo?.map((data) => ({
        ...data,
        children:
          data.key === 'vote_average'
            ? (movieDetailItem?.vote_average || 0) * 10
            : data.key === 'production_countries'
            ? movieDetailItem?.production_countries[0]?.iso_3166_1 || 'N/A'
            : data.key === 'genres'
            ? movieDetailItem?.genres?.map((item) => item?.name).join(', ') ||
              'N/A'
            : `${movieDetailItem?.budget?.toLocaleString() || 0} USD`,
      })),
    [movieInfo, movieDetailItem],
  );

  const descriptionsMoviePlusData = useMemo(
    () =>
      moviePlusInfo?.map((data) => ({
        ...data,
        label: <Typography.Title level={5}>{data.label}</Typography.Title>,
        children: (
          <CreditsRenderer
            data={
              data.key === 'cast'
                ? movieDetailItem?.credits?.cast?.filter(
                    (item) => item?.popularity > 35,
                  ) || []
                : movieDetailItem?.credits?.crew?.filter(
                    (item) => item?.job?.includes('Producer'),
                  ) || []
            }
          />
        ),
      })),
    [moviePlusInfo, movieDetailItem],
  );

  return loading ? (
    <CustomLoading />
  ) : (
    <div className="movie-detail-card white-color">
      <Card
        className="movie-detail-body"
        bodyStyle={{ padding: 0, overflow: 'hidden' }}
      >
        <div
          className="content"
          style={{
            backgroundImage: `url('${covertImage}')`,
          }}
        >
          <Flex className="mask" justify="center">
            <Image alt="poster image" src={posterImage} />
            <Flex
              className="detail-group"
              vertical
              align="flex-start"
              justify="left"
            >
              <Typography.Title level={2} className="movie-title main">
                {movieDetailItem?.title}
              </Typography.Title>
              <div className="info">
                <Descriptions
                  column={2}
                  layout="horizontal"
                  items={descriptionsMovieData}
                />
              </div>
              <Typography.Text className="movie-title">
                <span className="text-header">Overview</span>
                <br />
                {movieDetailItem?.overview}
              </Typography.Text>
            </Flex>
          </Flex>
        </div>
      </Card>
      <div className="cast-and-producer">
        <Descriptions
          column={1}
          layout="vertical"
          items={descriptionsMoviePlusData}
        />
      </div>
    </div>
  );
};

export default memo(MovieDetailCard);
