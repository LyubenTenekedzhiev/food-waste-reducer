import { combineReducers } from "@reduxjs/toolkit";

import mealsReducer from "../features/meals/mealsSlice";
import restaurantsReducer from "../features/restaurants/restaurantsSlice";
import foodCategoriesReducer from "../features/foodCategories/foodCategorySlice";
import customersReducer from "../features/customer/customerSlice";
// import authReducer from '../features/auth/authSlice';

const rootReducer = combineReducers({
  meals: mealsReducer,
  restaurants: restaurantsReducer,
  foodCategories: foodCategoriesReducer,
  customers: customersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
