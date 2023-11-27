import { z } from 'zod';
import { ZMovieItemSchema } from 'pages/Home/Redux/types';
import { IErrorResponse } from 'utils/constant';

export const ZExtendItemSchema = z.object({
  id: z.number({
    required_error: 'ID is required',
  }),
  name: z.string({
    required_error: 'Name is required',
  }),
  profile_path: z
    .string({
      required_error: 'Profile Path is required',
    })
    .nullable(),
  job: z.string().nullable().optional(),
  character: z.string().nullable().optional(),
  popularity: z.number(),
});

export type ZExtendItemModel = z.infer<typeof ZExtendItemSchema>;

export const ZMovieDetailSchema = z
  .object({
    budget: z.number({
      required_error: 'Budget is required',
    }),
    genres: z.array(
      z.object({
        id: z.number({
          required_error: 'ID is required',
        }),
        name: z.string({
          required_error: 'Name is required',
        }),
      }),
    ),
    production_countries: z.array(
      z.object({
        iso_3166_1: z.string({
          required_error: 'iso_3166_1 is required',
        }),
      }),
    ),
    credits: z.object({
      cast: z.array(ZExtendItemSchema),
      crew: z.array(ZExtendItemSchema),
    }),
  })
  .merge(ZMovieItemSchema);
export type ZMovieDetailModel = z.infer<typeof ZMovieDetailSchema>;

export const ZMovieDetailResSchema = z.object({
  data: ZMovieDetailSchema.nullable(),
});
export type ZMovieDetailResModel = z.infer<typeof ZMovieDetailResSchema>;

export interface IMovieDetailState extends ZMovieDetailResModel {
  loading: boolean;
  error: IErrorResponse | null;
}
