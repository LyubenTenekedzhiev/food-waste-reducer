import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { History } from "history";

import { AppThunk } from "../../app/store";
import FoodCategorieService from "../../service/foodCategory-service";
import { getErrorMessage } from "../../service/service-utils";
import { IdType } from "../../shared-types/shared-types";
import { FoodCategory } from "../../models/foodCategory.model";

interface FoodCategoriesState {
  currentFoodCategoryId: IdType | null;
  foodCategories: FoodCategory[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

interface FoodCategoriesLoaded {
  foodCategories: FoodCategory[];
}

const initialState: FoodCategoriesState = {
  currentFoodCategoryId: null,
  foodCategories: [],
  loading: false,
  error: null,
  message: null,
};

const foodCategories = createSlice({
  name: "foodCategories",
  initialState,
  reducers: {
    getFoodCategoriesStart(state, action: PayloadAction) {
      state.loading = true;
      state.error = null;
    },
    getFoodCategoriesSuccess(state, action: PayloadAction<FoodCategoriesLoaded>) {
      const { foodCategories } = action.payload;
      state.foodCategories = foodCategories;
      state.loading = false;
      state.error = null;
    },
    foodCategoriesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    selectFoodCategoryById(state, action: PayloadAction<IdType>) {
      state.currentFoodCategoryId = action.payload;
    },
    getFoodCategoryByIdStart(state, action: PayloadAction<IdType>) {
      state.currentFoodCategoryId = action.payload;
      state.loading = true;
      state.error = null;
    },
    getFoodCategoryByIdSuccess(state, action: PayloadAction<FoodCategory>) {
      const foodCategory = action.payload;
      const index = state.foodCategories.findIndex((p) => p._id === foodCategory._id);
      if (index < 0) {
        state.foodCategories.push(foodCategory);
      } else {
        state.foodCategories[index] = foodCategory;
      }
      state.loading = false;
      state.error = null;
    },
    createFoodCategoryStart(state, action: PayloadAction<FoodCategory>) {
      state.currentFoodCategoryId = action.payload._id;
      state.loading = true;
      state.error = null;
    },
    createFoodCategorySuccess(state, action: PayloadAction<FoodCategory>) {
      const foodCategory = action.payload;
      state.foodCategories.push(foodCategory);
      state.loading = false;
      state.error = null;
      state.message = `FoodCategory "${action.payload.name}" created successfully.`;
    },
    updateFoodCategoryStart(state, action: PayloadAction<FoodCategory>) {
      state.currentFoodCategoryId = action.payload._id;
      state.loading = true;
      state.error = null;
    },
    updateFoodCategorySuccess(state, action: PayloadAction<FoodCategory>) {
      const foodCategory = action.payload;
      const index = state.foodCategories.findIndex((p) => p._id === foodCategory._id);
      if (index < 0) {
        state.foodCategories.push(foodCategory);
      } else {
        state.foodCategories[index] = foodCategory;
      }
      state.loading = false;
      state.error = null;
      state.message = `FoodCategory "${action.payload.name}" updated successfully.`;
    },
    deleteFoodCategoryByIdStart(state, action: PayloadAction<IdType>) {
      state.currentFoodCategoryId = action.payload;
      state.loading = true;
      state.error = null;
    },
    deleteFoodCategoryByIdSuccess(state, action: PayloadAction<FoodCategory>) {
      const foodCategory = action.payload;
      const index = state.foodCategories.findIndex((p) => p._id === foodCategory._id);
      if (index >= 0) {
        state.foodCategories.splice(index, 1);
      }
      state.loading = false;
      state.error = null;
      state.message = `FoodCategory "${action.payload.name}" deleted successfully.`;
    },
  },
});

export const {
  getFoodCategoriesStart,
  getFoodCategoriesSuccess,
  foodCategoriesFailure,
  selectFoodCategoryById,
  getFoodCategoryByIdStart,
  getFoodCategoryByIdSuccess,
  createFoodCategoryStart,
  createFoodCategorySuccess,
  updateFoodCategoryStart,
  updateFoodCategorySuccess,
  deleteFoodCategoryByIdStart,
  deleteFoodCategoryByIdSuccess,
} = foodCategories.actions;
export default foodCategories.reducer;

export const fetchFoodCategories = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getFoodCategoriesStart());
    const localFoodCategories = localStorage.getItem("foodCategories");
    if (localFoodCategories) {
      // console.log(localFoodCategories);
      dispatch(getFoodCategoriesSuccess({ foodCategories: JSON.parse(localFoodCategories) as FoodCategory[] }));
    }
    const foodCategories = await FoodCategorieService.getAllFoodCategorys();
    dispatch(getFoodCategoriesSuccess({ foodCategories }));
    localStorage.setItem("foodCategories", JSON.stringify(foodCategories));
  } catch (err) {
    dispatch(foodCategoriesFailure(getErrorMessage(err)));
  }
};

export const fetchFoodCategoryById = (foodCategoryId: IdType): AppThunk => async (dispatch) => {
  try {
    dispatch(getFoodCategoryByIdStart(foodCategoryId));
    const foodCategory = await FoodCategorieService.getFoodCategorysById(foodCategoryId);
    dispatch(getFoodCategoryByIdSuccess(foodCategory));
  } catch (err) {
    dispatch(foodCategoriesFailure(getErrorMessage(err)));
  }
};

export const createFoodCategory = (
  foodCategory: FoodCategory,
  // history: History<History.PoorMansUnknown>
  // setSubmitting: (isSubmitting: boolean) => void
): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(createFoodCategoryStart(foodCategory));
    // const authToken = getState().auth.token; // TODO
    const created = await FoodCategorieService.createNewFoodCategory(foodCategory, undefined);
    dispatch(createFoodCategorySuccess(created));
  } catch (err) {
    dispatch(foodCategoriesFailure(getErrorMessage(err)));
  }
  // finally {
  //   setSubmitting(false);
  // }
};

export const updateFoodCategory = (
  foodCategory: FoodCategory,
  // history: History<History.PoorMansUnknown>
  // setSubmitting: (isSubmitting: boolean) => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(updateFoodCategoryStart(foodCategory));
    const created = await FoodCategorieService.updateFoodCategory(foodCategory);
    dispatch(updateFoodCategorySuccess(created));
    // history.push("/foodCategories");
  } catch (err) {
    dispatch(foodCategoriesFailure(getErrorMessage(err)));
  }
  // finally {
  //   setSubmitting(false);
  // }
};

export const deleteFoodCategory = (foodCategoryId: IdType): AppThunk => async (dispatch) => {
  try {
    dispatch(deleteFoodCategoryByIdStart(foodCategoryId));
    const deleted = await FoodCategorieService.deleteFoodCategory(foodCategoryId);
    dispatch(deleteFoodCategoryByIdSuccess(deleted));
  } catch (err) {
    dispatch(foodCategoriesFailure(getErrorMessage(err)));
  }
};
