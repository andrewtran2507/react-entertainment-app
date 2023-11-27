import { Meta, StoryObj } from '@storybook/react';
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';
import MovieCard from './index';
import { movieItem } from './mock';

const meta: Meta<typeof MovieCard> = {
  title: 'components/MovieCard',
  component: MovieCard,
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { movieId: 385687 },
      },
      routing: { path: '/movie/:movieId' },
    }),
  },
  tags: ['autodocs'],
  argTypes: {
    movieItem: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof MovieCard>;

export const OnLoading: Story = {
  args: {
    movieItem: null,
  },
};

export const UnLoading: Story = {
  args: {
    movieItem: movieItem,
  },
};
