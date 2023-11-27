import { z } from 'zod';
import { IErrorResponse } from 'utils/constant';

// Validating API responses with zod schema
export const ZMovieItemSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z
    .string({
      required_error: 'Backdrop Path is required',
    })
    .nullable(),
  genre_ids: z.array(z.number()).nullable().optional(),
  id: z.number({
    required_error: 'ID is required',
  }),
  original_title: z.string(),
  title: z.string({
    required_error: 'Title is required',
  }),
  original_language: z.string(),
  overview: z.string(),
  release_date: z.string(),
  popularity: z.number(),
  poster_path: z
    .string({
      required_error: 'Poster Path is required',
    })
    .nullable(),
  vote_average: z.number({
    required_error: 'Vote Average is required',
  }),
  vote_count: z.number(),
  video: z.boolean(),
});

export type ZMovieItemModel = z.infer<typeof ZMovieItemSchema>;

export const ZMovieResponseSchema = z.object({
  results: z.array(ZMovieItemSchema),
  total_pages: z.number(),
  total_results: z.number(),
  page: z.number(),
});
export type ZMovieResponseModel = z.infer<typeof ZMovieResponseSchema>;

export const ZMovieListSchema = z.object({
  data: ZMovieResponseSchema.nullable(),
});
export type ZMovieListModel = z.infer<typeof ZMovieListSchema>;

export interface IMovieState extends ZMovieListModel {
  loading: boolean;
  error: IErrorResponse | null;
}

export type ISearchMovieParam = {
  page: number;
  sort_by: string;
};

export enum eSortBy {
  popular = 'popularity.desc',
  latest = 'primary_release_date.desc',
  primary = 'primary',
  default = 'default',
  popularKey = 'popular',
  latestKey = 'latest',
}

export type TMovieDataItem = {
  sort_by: eSortBy;
  page: number;
  isActive: boolean;
  movieList: ZMovieItemModel[] | null;
};

export type TMovieData = {
  [eSortBy.latestKey]: TMovieDataItem;
  [eSortBy.popularKey]: TMovieDataItem;
};
