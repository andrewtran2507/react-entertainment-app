import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Empty } from 'antd';

// REDUX
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from 'state/store';
import { getMovieDetailItem } from './Redux/action';

// CMP
import MovieDetailCard from 'components/MovieDetailCard';
import './index.scss';
import { IMovieDetailState } from './Redux/types';

const MovieDetail: FC = () => {
  const { movieId = null } = useParams();
  const { loading, data, error }: IMovieDetailState = useAppSelector(
    (state) => state.movieDetail,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (movieId) {
      dispatch(getMovieDetailItem(movieId));
    }
  }, [movieId]);

  return (
    <div className="mv-detail-page">
      {error && <Alert message={error.status_message} type="error" showIcon />}
      {!data && !loading ? (
        <Empty />
      ) : (
        <MovieDetailCard loading={loading} movieDetailItem={data} />
      )}
    </div>
  );
};

export default MovieDetail;
