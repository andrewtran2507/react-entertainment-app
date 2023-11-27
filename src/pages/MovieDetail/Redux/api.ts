import customAxios from 'utils/api/customAxios';
import { AxiosResponse } from 'axios';

export const getMovieDetailItem = (movieId: string): Promise<AxiosResponse> => {
  return customAxios.get(
    `${process.env.REACT_APP_API_URL}/movie/${movieId}?append_to_response=credits`,
  );
};
