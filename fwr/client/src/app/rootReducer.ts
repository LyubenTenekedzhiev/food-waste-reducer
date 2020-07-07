import { combineReducers } from '@reduxjs/toolkit'

import mealsReducer from '../features/meals/mealsSlice';
// import restaurantsReducer from "../features/restaurants/restaurantsSlice"

// import authReducer from '../features/auth/authSlice';

const rootReducer = combineReducers({
  meals: mealsReducer,
  // restaurants: restaurantsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
