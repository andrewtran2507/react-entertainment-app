import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  cleanup,
  render,
  waitFor,
  screen,
  RenderResult,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import { movieItem } from '../mock';
import MovieCard from 'components/MovieCard';
import { mockMatchMedia } from 'utils/fnc/common';

describe('Test MovieCard Component', () => {
  let component: RenderResult | undefined = undefined;
  beforeAll(async () => {
    mockMatchMedia();
  });

  afterEach(() => {
    cleanup();
  });

  it('Should match snapshot of MovieCard component', async () => {
    await act(() => {
      component = render(
        <BrowserRouter>
          <MovieCard movieItem={movieItem} indx={1} />
        </BrowserRouter>,
      );
    });
    const { asFragment } = component || { asFragment: () => DocumentFragment };
    expect(asFragment()).toMatchSnapshot();
  });

  it('Test content on MovieCard Component', async () => {
    render(
      <BrowserRouter>
        <MovieCard movieItem={movieItem} indx={1} />
      </BrowserRouter>,
    );
    await waitFor(() =>
      expect(screen.getByText(/Fast X/i)).toBeInTheDocument(),
    );
  });
});
