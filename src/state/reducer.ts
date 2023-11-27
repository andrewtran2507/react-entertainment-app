import { combineReducers } from 'redux';
import { movieReducer } from 'pages/Home/Redux';
import { movieDetailReducer } from 'pages/MovieDetail/Redux';

export default combineReducers({
  movie: movieReducer,
  movieDetail: movieDetailReducer,
});
