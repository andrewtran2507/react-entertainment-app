import store from 'state/store';
import { getMovieList } from './action';
import { ZMovieResponseModel } from './types';
import { cleanup } from '@testing-library/react';

describe('Movie redux state tests', () => {
  afterEach(() => {
    cleanup();
  });
  it('Should be initially set movie to an object', () => {
    const state = store.getState().movie;
    expect(state).toEqual({
      loading: false,
      data: null,
      error: null,
    });
  });

  it('Should be able to fetch the movie list for a specific param', async () => {
    const data = await store.dispatch(
      getMovieList({
        page: 1,
        sort_by: 'primary_release_date.desc',
      }),
    );
    const movieList = data.payload as ZMovieResponseModel;

    expect(data.type).toBe('movie/list/fulfilled');
    expect(movieList.results[0].title).toBeTruthy();

    const state = store.getState().movie;
    expect(state.data).toEqual(movieList);
  });
});
