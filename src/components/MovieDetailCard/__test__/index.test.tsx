import React from 'react';
import { RenderResult, act, cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import movieDetailItem from '../mock';
import MovieDetailCard from 'components/MovieDetailCard';
import { mockMatchMedia } from 'utils/fnc/common';

describe('Test Movie Detail Card Component', () => {
  let component: RenderResult | undefined = undefined;
  beforeAll(() => {
    mockMatchMedia();
  });

  afterEach(() => {
    cleanup();
  });

  it('Test to match snapshot of component', async () => {
    await act(() => {
      component = render(
        <MovieDetailCard loading={true} movieDetailItem={movieDetailItem} />,
      );
    });
    const { asFragment } = component || { asFragment: () => DocumentFragment };
    expect(asFragment()).toMatchSnapshot();
  });

  it('Test content on Movie Detail Component', () => {
    const { getByText } = render(
      <MovieDetailCard loading={false} movieDetailItem={movieDetailItem} />,
    );
    expect(getByText('The Marvels')).toBeTruthy();
  });
});
