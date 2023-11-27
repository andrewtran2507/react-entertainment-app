import React from 'react';
import '@testing-library/jest-dom';
import {
  render,
  waitFor,
  cleanup,
  act,
  RenderResult,
} from 'utils/fnc/testWrapper';
import MovieDetail from 'pages/MovieDetail';
import { mockMatchMedia } from 'utils/fnc/common';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    movieId: '695721',
  }),
  useRouteMatch: () => ({ url: '/movie/695721' }),
}));

describe('Test Movie Detail Page', () => {
  let component: RenderResult | undefined = undefined;
  beforeAll(() => {
    mockMatchMedia();
  });

  afterEach(() => {
    cleanup();
  });

  it('Test to match snapshot of Movie Detail Page', async () => {
    await act(() => {
      component = render(<MovieDetail />, {});
    });
    const { asFragment } = component || { asFragment: () => DocumentFragment };
    expect(asFragment()).toMatchSnapshot();
  });

  it('Test content Movie title on Movie Detail page', async () => {
    const { getByText } = render(<MovieDetail />, {});
    await waitFor(() => {
      expect(
        getByText('The Hunger Games: The Ballad of Songbirds & Snakes'),
      ).toBeInTheDocument();
      expect(getByText('100,000,000 USD')).toBeTruthy();
    });
  });
});
