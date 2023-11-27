import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
  memo,
} from 'react';
import { Col, Row, FloatButton, Flex, Button, Alert, Empty } from 'antd';
import {
  AppstoreAddOutlined,
  FieldTimeOutlined,
  TeamOutlined,
} from '@ant-design/icons';

// redux
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from 'state/store';
import {
  ZMovieItemModel,
  eSortBy,
  TMovieData,
  IMovieState,
} from './Redux/types';
import { getMovieList } from './Redux/action';

// CMP
import VideoCard from 'components/MovieCard';

import './index.scss';

const Home: FC = () => {
  const [movieData, setMovieData] = useState<TMovieData>({
    [eSortBy.popularKey]: {
      sort_by: eSortBy.popular,
      page: 1,
      isActive: true,
      movieList: null,
    },
    [eSortBy.latestKey]: {
      sort_by: eSortBy.latest,
      page: 1,
      isActive: false,
      movieList: null,
    },
  });
  const { data, error, loading }: IMovieState = useAppSelector(
    (state) => state.movie,
  );
  const dispatch = useDispatch<AppDispatch>();

  const getFloatButtonType = (status: boolean) =>
    status ? eSortBy.primary : eSortBy.default;

  const currentView: eSortBy.popularKey | eSortBy.latestKey = useMemo(() => {
    return movieData[eSortBy.popularKey].isActive
      ? eSortBy.popularKey
      : eSortBy.latestKey;
  }, [movieData]);

  const onChangeMovieListType = useCallback(
    (type: eSortBy.popularKey | eSortBy.latestKey) => {
      setMovieData((item: TMovieData) => ({
        ...item,
        [currentView]: {
          ...item[currentView],
          isActive: false,
        },
        [type]: {
          ...item[type],
          isActive: true,
        },
      }));
    },
    [currentView],
  );

  const onHandleLoadMore = useCallback(() => {
    setMovieData((item: TMovieData) => ({
      ...item,
      [currentView]: {
        ...item[currentView],
        page: item[currentView].page + 1,
      },
    }));
  }, [currentView]);

  useEffect(() => {
    dispatch(
      getMovieList({
        page: movieData[currentView].page,
        sort_by: movieData[currentView].sort_by,
      }),
    );
  }, [
    movieData[currentView].page,
    movieData[currentView].isActive,
    currentView,
  ]);

  useEffect(() => {
    if (data && data?.results?.length > 0) {
      setMovieData((item: TMovieData) => ({
        ...item,
        [currentView]: {
          ...item[currentView],
          movieList:
            item[currentView].page > 1
              ? data.page > 1 &&
                data.page * 20 > (item[currentView]?.movieList || [])?.length
                ? item[currentView]?.movieList?.concat(data?.results || [])
                : item[currentView]?.movieList
              : data.results,
        },
      }));
    }
  }, [data, currentView]);

  return (
    <div className="home-page">
      {error && <Alert message={error?.status_message} type="error" showIcon />}
      <Row gutter={[8, 16]}>
        {!error && (movieData[currentView]?.movieList || [])?.length > 0
          ? movieData[currentView]?.movieList?.map(
              (movieItem: ZMovieItemModel, indx: number) => (
                <Col
                  xxl={{ span: 3 }}
                  xl={{ span: 4 }}
                  md={{ span: 6 }}
                  sm={{ span: 8 }}
                  xs={{ span: 8 }}
                  key={movieItem?.id} // Ex: id = 609681 not an index number
                >
                  <VideoCard movieItem={movieItem} indx={indx} />
                </Col>
              ),
            )
          : ''}
      </Row>
      {!data && !loading ? <Empty /> : ''}
      <FloatButton.Group
        className="f-btn-g"
        badge={{ count: movieData[currentView]?.movieList?.length }}
        tooltip="Choose a view"
        trigger="click"
        icon={<AppstoreAddOutlined />}
      >
        <FloatButton
          tooltip="The popular movies list"
          type={getFloatButtonType(movieData[eSortBy.popularKey].isActive)}
          onClick={() => onChangeMovieListType(eSortBy.popularKey)}
          icon={<TeamOutlined />}
        />
        <FloatButton
          tooltip="The latest movies list"
          type={getFloatButtonType(movieData[eSortBy.latestKey].isActive)}
          onClick={() => onChangeMovieListType(eSortBy.latestKey)}
          icon={<FieldTimeOutlined />}
        />
      </FloatButton.Group>
      {movieData[eSortBy.latestKey].isActive ? (
        <Flex vertical gap="small" style={{ width: '100%' }}>
          <Button
            disabled={data?.total_pages === data?.page}
            type="dashed"
            block
            onClick={onHandleLoadMore}
          >
            Load More
          </Button>
        </Flex>
      ) : (
        ''
      )}
    </div>
  );
};

export default memo(Home);
