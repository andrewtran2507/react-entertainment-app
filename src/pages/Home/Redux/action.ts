import { createAsyncThunk } from '@reduxjs/toolkit';
import * as movieAPI from './api';
import getQueryString from 'utils/api/getQueryString';
import {
  ISearchMovieParam,
  ZMovieResponseSchema,
  ZMovieResponseModel,
  ZMovieListModel,
} from './types';
import { getErrorResponse } from 'utils/fnc/common';
import { TErrors } from 'utils/constant';

export const getMovieList = createAsyncThunk(
  'movie/list',
  async (param: ISearchMovieParam, thunkApi) => {
    try {
      const response: ZMovieListModel = await movieAPI.getMovieList(
        getQueryString(param),
      );

      // Validating API responses with zod schema
      const result: ZMovieResponseModel = ZMovieResponseSchema.parse(
        response.data,
      );

      return thunkApi.fulfillWithValue(result);
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorResponse(error as TErrors));
    }
  },
);
