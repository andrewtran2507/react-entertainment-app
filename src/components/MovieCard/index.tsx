import React, { FC, useEffect, useState } from 'react';
import { Card, Progress, Skeleton, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ZMovieItemModel } from 'pages/Home/Redux/types';
import { conicColors } from 'utils/css/colors';
import { getImageULR } from 'utils/fnc/common';
import { imageFolder } from 'utils/constant';
import './index.scss';

const { Meta } = Card;
const { Paragraph } = Typography;

const MovieCard: FC<{
  movieItem: ZMovieItemModel | null;
  indx: number;
}> = ({ movieItem, indx = 1 }) => {
  const [cLoading, setCLoading] = useState(true);
  const covertImage = getImageULR(
    movieItem?.poster_path,
    imageFolder['220x330'],
  );
  const navigate = useNavigate();

  const movieDetailURL = `/movie/${movieItem?.id}`;

  useEffect(() => {
    const tm = setTimeout(
      () => {
        setCLoading(false);
      },
      50 * (indx + 1),
    );

    return () => {
      clearTimeout(tm);
    };
  }, [cLoading]);

  return (
    <div className="movie-card">
      {cLoading || !movieItem ? (
        <div className="skeleton-movie-card">
          <div className="skeleton-img">
            <Skeleton.Image active />
          </div>
          <Skeleton avatar active />
        </div>
      ) : (
        <Card
          hoverable
          cover={
            <LazyLoadImage
              alt="cover-image"
              effect="blur"
              wrapperProps={{
                style: { transitionDelay: '1s' },
              }}
              src={covertImage}
            />
          }
          onClick={() => {
            navigate(movieDetailURL);
          }}
        >
          <Meta
            avatar={
              <Progress
                type="circle"
                percent={movieItem?.vote_average * 10}
                size={48}
                strokeColor={conicColors}
              />
            }
            title={
              <a href={movieDetailURL} target="_self">
                {movieItem?.title || 'N/A'}
              </a>
            }
            description={
              <Paragraph ellipsis>{movieItem?.overview || 'N/A'}</Paragraph>
            }
          />
        </Card>
      )}
    </div>
  );
};

export default MovieCard;
