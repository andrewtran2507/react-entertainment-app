import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { getMovieDetailItem } from './action';
import { IMovieDetailState, ZMovieDetailModel } from './types';
import { IErrorResponse } from 'utils/constant';

const initialState: IMovieDetailState = {
  loading: false,
  data: null,
  error: null,
};
const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IMovieDetailState>) => {
    builder
      .addCase(getMovieDetailItem.pending, (state: IMovieDetailState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getMovieDetailItem.fulfilled,
        (
          state: IMovieDetailState,
          action: PayloadAction<ZMovieDetailModel>,
        ) => {
          state.loading = false;
          state.error = null;
          state.data = action.payload;
        },
      )
      .addCase(
        getMovieDetailItem.rejected,
        (state: IMovieDetailState, action) => {
          state.loading = false;
          state.data = null;
          state.error = action.payload as IErrorResponse;
        },
      );
  },
});

export default movieDetailSlice;
