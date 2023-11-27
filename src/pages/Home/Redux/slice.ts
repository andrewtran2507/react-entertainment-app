import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { getMovieList } from './action';
import { IMovieState, ZMovieResponseModel } from './types';
import { IErrorResponse } from 'utils/constant';

const initialState: IMovieState = {
  loading: false,
  data: null,
  error: null,
};
const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IMovieState>) => {
    builder
      .addCase(getMovieList.pending, (state: IMovieState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getMovieList.fulfilled,
        (state: IMovieState, action: PayloadAction<ZMovieResponseModel>) => {
          state.loading = false;
          state.error = null;
          state.data = action.payload;
        },
      )
      .addCase(getMovieList.rejected, (state: IMovieState, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload as IErrorResponse;
      });
  },
});

export default movieSlice;
