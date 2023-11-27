import { Meta, StoryObj } from '@storybook/react';
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';
import MovieDetailCard from './index';
import movieDetailItem from './mock';

const meta: Meta<typeof MovieDetailCard> = {
  title: 'components/MovieDetailCard',
  component: MovieDetailCard,
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { movieId: 385687 },
      },
    }),
  },
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    movieDetailItem: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof MovieDetailCard>;

export const OnLoading: Story = {
  args: {
    loading: true,
    movieDetailItem: null,
  },
};

export const UnLoading: Story = {
  args: {
    loading: false,
    movieDetailItem,
  },
};
