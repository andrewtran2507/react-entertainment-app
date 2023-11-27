import React, { ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { movieReducer } from 'pages/Home/Redux';
import { movieDetailReducer } from 'pages/MovieDetail/Redux';
import MainLayout from 'components/Layout/MainLayout';
import { IMovieState } from 'pages/Home/Redux/types';
import { IMovieDetailState } from 'pages/MovieDetail/Redux/types';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
const defStore = {
  reducer: { movie: movieReducer, movieDetail: movieDetailReducer },
};

function render(
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({ ...defStore, preloadedState }),
    ...renderOptions
  }: {
    preloadedState?: object;
    store?: ToolkitStore<{
      movie: IMovieState;
      movieDetail: IMovieDetailState;
    }>;
  },
) {
  function Wrapper({ children }: { children: ReactElement }) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <MainLayout>{children}</MainLayout>
        </BrowserRouter>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
