import React from 'react';
import { RenderResult, cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from 'pages/NotFound';
import { mockMatchMedia } from 'utils/fnc/common';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from 'components/Layout/MainLayout';

describe('Test NotFound Page', () => {
  let component: RenderResult | undefined = undefined;
  beforeAll(() => {
    mockMatchMedia();
  });

  afterEach(() => {
    cleanup();
  });

  it('Test to match snapshot of NotFound page', async () => {
    component = render(
      <BrowserRouter>
        <MainLayout>
          <NotFound />
        </MainLayout>
      </BrowserRouter>,
    );
    const { asFragment } = component || { asFragment: () => DocumentFragment };
    expect(asFragment()).toMatchSnapshot();
  });

  it('Test content on NotFound page', async () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <NotFound />
        </MainLayout>
      </BrowserRouter>,
    );
    expect(screen.getByText('Back Home')).toBeTruthy();
  });
});
