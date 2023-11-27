import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, act, RenderResult } from 'utils/fnc/testWrapper';
import userEvent from '@testing-library/user-event';

import Home from 'pages/Home';
import { elmQuerySelector, mockMatchMedia } from 'utils/fnc/common';
import { moviePopularList, errorItem } from 'components/MovieCard/mock';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { movieDetailReducer } from 'pages/MovieDetail/Redux';
import { defElm } from 'utils/constant';

const btnGenClass = '.main-layout .ant-float-btn-circle';

describe('Test Home Page with data', () => {
  let component: RenderResult | undefined = undefined;
  beforeAll(() => {
    mockMatchMedia();
  });

  afterEach(() => {
    cleanup();
  });

  it('Should match snapshot of Home page', async () => {
    await act(() => {
      component = render(<Home />, {
        preloadedState: { movie: moviePopularList },
      });
    });
    const { asFragment } = component || { asFragment: () => DocumentFragment };
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should have movie card render on page and float button event on home page', async () => {
    await act(() => {
      component = render(<Home />, {
        preloadedState: { movie: moviePopularList },
      });
    });
    const { container } = component || { container: defElm };

    expect(
      (elmQuerySelector(container, '.movie-card', true) as Element[]).length,
    ).toBe(20);
    // test open choose view
    const btnOpenChooseView = elmQuerySelector(
      container,
      `${btnGenClass} .anticon-appstore-add`,
    );
    expect(btnOpenChooseView).toBeTruthy();
    await act(() => {
      userEvent.click(btnOpenChooseView as Element);
    });
    // test see close chose view
    const btnCloseChooseView = elmQuerySelector(
      container,
      `${btnGenClass}  .anticon-close`,
    );
    expect(btnCloseChooseView).toBeTruthy();

    // test click on latest list
    const btnLatestView = elmQuerySelector(
      container,
      `${btnGenClass}  .anticon-field-time`,
    );
    expect(btnLatestView).toBeTruthy();
    await act(() => {
      userEvent.click(btnLatestView as Element);
    });

    // see popular btn
    const btnPopularView = elmQuerySelector(
      container,
      `${btnGenClass}  .anticon-team`,
    );
    expect(btnPopularView).toBeTruthy();
    await act(() => {
      userEvent.click(btnCloseChooseView as Element);
    });

    // after click on btnCloseChooseView 2 another icon is hided
    expect(elmQuerySelector(container, `${btnGenClass}  .anticon-close`)).toBe(
      defElm,
    );
  });
});

describe('Test Home Page Error', () => {
  let component: RenderResult | undefined = undefined;
  beforeAll(() => {
    mockMatchMedia();
  });

  afterEach(() => {
    cleanup();
  });

  it('Should show error Invalid API key', async () => {
    const mockMovieSlice = createSlice({
      name: 'movie',
      initialState: errorItem,
      reducers: {},
    });

    const mockStore = configureStore({
      reducer: {
        movie: mockMovieSlice.reducer,
        movieDetail: movieDetailReducer,
      },
    });
    await act(() => {
      component = render(<Home />, {
        store: mockStore,
        preloadedState: {},
      });
    });
    const { getByText } = component || { getByText: (txt: string) => txt };
    expect(
      getByText('Invalid API key: You must be granted a valid key.'),
    ).toBeInTheDocument();
  });
});
