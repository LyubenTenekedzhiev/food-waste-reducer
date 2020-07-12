import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { History } from "history";

import { AppThunk } from "../../app/store";
import MealService from "../../service/meal-service";
import { getErrorMessage } from "../../service/service-utils";
import { IdType } from "../../shared-types/shared-types";
import { Meal } from "../../models/meal.model";

interface MealsState {
  currentMealId: IdType | null;
  meals: Meal[];
  loading: boolean;
  error: string | null;
  message: string | null;
  searchQuery: string | "";
  inputTouched: boolean;
}

interface MealsLoaded {
  meals: Meal[];
}

const initialState: MealsState = {
  currentMealId: null,
  meals: [],
  loading: false,
  error: null,
  message: null,
  searchQuery: "",
  inputTouched: false,
};

const meals = createSlice({
  name: "meals",
  initialState,
  reducers: {
    getAllMealsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getAllMealsSuccess(state, action: PayloadAction<MealsLoaded>) {
      const { meals } = action.payload;
      state.meals = meals;
      state.loading = false;
      state.error = null;
    },
    getMealsStart(state, action: PayloadAction<IdType>) {
      state.loading = true;
      state.error = null;
    },
    getMealsSuccess(state, action: PayloadAction<MealsLoaded>) {
      const { meals } = action.payload;
      state.meals = meals;
      state.loading = false;
      state.error = null;
    },
    mealsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    selectMealById(state, action: PayloadAction<IdType>) {
      state.currentMealId = action.payload;
    },
    buildSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setInputTouched(state) {
      if (state.searchQuery) state.inputTouched = true;
      if (!state.searchQuery) state.inputTouched = false;
    },
    getMealByIdStart(state, action: PayloadAction<IdType>) {
      state.currentMealId = action.payload;
      state.loading = true;
      state.error = null;
    },
    getMealByIdSuccess(state, action: PayloadAction<Meal>) {
      const meal = action.payload;
      const index = state.meals.findIndex((p) => p._id === meal._id);
      if (index < 0) {
        state.meals.push(meal);
      } else {
        state.meals[index] = meal;
      }
      state.loading = false;
      state.error = null;
    },
    createMealStart(state, action: PayloadAction<Meal>) {
      state.currentMealId = action.payload._id;
      state.loading = true;
      state.error = null;
    },
    createMealSuccess(state, action: PayloadAction<Meal>) {
      const meal = action.payload;
      state.meals.push(meal);
      state.loading = false;
      state.error = null;
      state.message = `Meal "${action.payload.name}" created successfully.`;
    },
    updateMealStart(state, action: PayloadAction<Meal>) {
      state.currentMealId = action.payload._id;
      state.loading = true;
      state.error = null;
    },
    updateMealSuccess(state, action: PayloadAction<Meal>) {
      const meal = action.payload;
      const index = state.meals.findIndex((p) => p._id === meal._id);
      if (index < 0) {
        state.meals.push(meal);
      } else {
        state.meals[index] = meal;
      }
      state.loading = false;
      state.error = null;
      state.message = `Meal "${action.payload.name}" updated successfully.`;
    },
    deleteMealByIdStart(state, action: PayloadAction<IdType>) {
      state.currentMealId = action.payload;
      state.loading = true;
      state.error = null;
    },
    deleteMealByIdSuccess(state, action: PayloadAction<Meal>) {
      const meal = action.payload;
      const index = state.meals.findIndex((p) => p._id === meal._id);
      if (index >= 0) {
        state.meals.splice(index, 1);
      }
      state.loading = false;
      state.error = null;
      state.message = `Meal "${action.payload.name}" deleted successfully.`;
    },
  },
});

export const {
  getAllMealsStart,
  getAllMealsSuccess,
  getMealsStart,
  getMealsSuccess,
  mealsFailure,
  buildSearchQuery,
  setInputTouched,
  selectMealById,
  getMealByIdStart,
  getMealByIdSuccess,
  createMealStart,
  createMealSuccess,
  updateMealStart,
  updateMealSuccess,
  deleteMealByIdStart,
  deleteMealByIdSuccess,
} = meals.actions;
export default meals.reducer;

export const fetchAllMeals = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getAllMealsStart());
    const meals = await MealService.getAllMeals();
    dispatch(getAllMealsSuccess({ meals }));
  } catch (err) {
    dispatch(mealsFailure(getErrorMessage(err)));
  }
};

export const fetchMeals = (restaurantId: IdType): AppThunk => async (dispatch) => {
  try {
    dispatch(getMealsStart(restaurantId));
    const localMeals = localStorage.getItem("meals");
    if (localMeals) {
      console.log(localMeals);
      dispatch(getMealsSuccess({ meals: JSON.parse(localMeals) as Meal[] }));
    }
    const meals = await MealService.getMealsByRestaurantId(restaurantId);
    dispatch(getMealsSuccess({ meals }));
    localStorage.setItem("meals", JSON.stringify(meals));
  } catch (err) {
    dispatch(mealsFailure(getErrorMessage(err)));
  }
};

export const fetchMealById = (mealId: IdType): AppThunk => async (dispatch) => {
  try {
    dispatch(getMealByIdStart(mealId));
    const meal = await MealService.getMealsById(mealId);
    dispatch(getMealByIdSuccess(meal));
  } catch (err) {
    dispatch(mealsFailure(getErrorMessage(err)));
  }
};

export const createMeal = (
  meal: Meal
  // history: History<History.PoorMansUnknown>
  // setSubmitting: (isSubmitting: boolean) => void
): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(createMealStart(meal));
    // const authToken = getState().auth.token; // TODO
    const created = await MealService.createNewMeal(meal, undefined);
    dispatch(createMealSuccess(created));
  } catch (err) {
    dispatch(mealsFailure(getErrorMessage(err)));
  }
  // finally {
  //   setSubmitting(false);
  // }
};

export const updateMeal = (
  meal: Meal
  // history: History<History.PoorMansUnknown>
  // setSubmitting: (isSubmitting: boolean) => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(updateMealStart(meal));
    const created = await MealService.updateMeal(meal);
    dispatch(updateMealSuccess(created));
    // history.push("/meals");
  } catch (err) {
    dispatch(mealsFailure(getErrorMessage(err)));
  }
  // finally {
  //   setSubmitting(false);
  // }
};

export const deleteMeal = (mealId: IdType): AppThunk => async (dispatch) => {
  try {
    dispatch(deleteMealByIdStart(mealId));
    const deleted = await MealService.deleteMeal(mealId);
    dispatch(deleteMealByIdSuccess(deleted));
  } catch (err) {
    dispatch(mealsFailure(getErrorMessage(err)));
  }
};
