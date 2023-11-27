import customAxios from 'utils/api/customAxios';
import { AxiosResponse } from 'axios';

export const getMovieList = (searchParams: string): Promise<AxiosResponse> => {
  return customAxios.get(
    `${process.env.REACT_APP_API_URL}/discover/movie?${searchParams}`,
  );
};
