import { DescriptionsProps } from 'antd';

export enum imageFolder {
  '1920x800' = 'w1920_and_h800_multi_faces',
  '300x450' = 'w300_and_h450_bestv2',
  '220x330' = 'w220_and_h330_face',
  '138x175' = 'w138_and_h175_face',
}

export type IErrorResponse = {
  status_code: number;
  status_message: string;
  success: boolean;
};

export type TZError = {
  name: string;
  errors: {
    path: string[];
    message: string;
  }[];
};

export type TApiError = {
  response: {
    data: IErrorResponse | null;
  };
};

export type TErrors = TApiError & TZError;

export const movieInfo: DescriptionsProps['items'] = [
  {
    key: 'vote_average',
    label: 'Vote Average',
    children: '',
  },
  {
    key: 'production_countries',
    label: 'Origin  Country',
    children: '',
  },
  {
    key: 'genres',
    label: 'Genres',
    children: '',
  },
  {
    key: 'budget',
    label: 'Budget',
    children: '',
  },
];

export const moviePlusInfo: DescriptionsProps['items'] = [
  {
    key: 'cast',
    label: 'Cast List',
    children: '',
  },
  {
    key: 'producer',
    label: 'Producer List',
    children: '',
  },
];

export const defAsFragment: () => DocumentFragment = (): DocumentFragment =>
  new DocumentFragment();

export const defElm: Element = document.createElement('div');
