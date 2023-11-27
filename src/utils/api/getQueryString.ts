import { ISearchMovieParam } from 'pages/Home/Redux/types';
const getQueryString = (params: ISearchMovieParam): string =>
  Object.keys(params)
    .map(
      (key: string) =>
        `${key}=${encodeURIComponent(params[key as keyof ISearchMovieParam])}`,
    )
    .join('&');

export default getQueryString;
