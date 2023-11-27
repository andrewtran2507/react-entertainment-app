import { createAsyncThunk } from '@reduxjs/toolkit';
import * as movieDetailAPI from './api';
import {
  ZMovieDetailModel,
  ZMovieDetailResModel,
  ZMovieDetailSchema,
} from './types';
import { getErrorResponse } from 'utils/fnc/common';
import { TErrors } from 'utils/constant';

export const getMovieDetailItem = createAsyncThunk(
  'movie/item',
  async (movieId: string, thunkApi) => {
    try {
      const response: ZMovieDetailResModel =
        await movieDetailAPI.getMovieDetailItem(movieId);

      // Validating API responses with zod schema
      const result: ZMovieDetailModel = ZMovieDetailSchema.parse(response.data);

      return thunkApi.fulfillWithValue(result);
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorResponse(error as TErrors));
    }
  },
);
