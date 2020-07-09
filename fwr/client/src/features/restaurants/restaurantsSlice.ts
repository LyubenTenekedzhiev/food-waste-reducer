import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { History } from "history";

import { AppThunk } from "../../app/store";
import RestaurantService from "../../service/user-service";
import { getErrorMessage } from "../../service/service-utils";
import { IdType } from "../../shared-types/shared-types";
import { User } from "../../models/user.model";

interface RestaurantsState {
  currentRestaurantId: IdType | null;
  restaurants: User[];
  username: string;
  password: string;
  loading: boolean;
  error: string | null;
  message: string | null;
}

interface RestaurantsLoaded {
  restaurants: User[];
}

const initialState: RestaurantsState = {
  currentRestaurantId: null,
  restaurants: [],
  username: "",
  password: "",
  loading: false,
  error: null,
  message: null,
};

const restaurants = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    getRestaurantsStart(state, action: PayloadAction<number>) {
      state.loading = true;
      state.error = null;
    },
    getRestaurantsSuccess(state, action: PayloadAction<RestaurantsLoaded>) {
      const { restaurants } = action.payload;
      state.restaurants = restaurants;
      state.loading = false;
      state.error = null;
    },
    restaurantsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    selectRestaurantById(state, action: PayloadAction<IdType>) {
      state.currentRestaurantId = action.payload;
    },
    setRestaurantsUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setRestaurantsPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    getRestaurantByIdStart(state, action: PayloadAction<IdType>) {
      state.currentRestaurantId = action.payload;
      state.loading = true;
      state.error = null;
    },
    getRestaurantByIdSuccess(state, action: PayloadAction<User>) {
      const restaurant = action.payload;
      const index = state.restaurants.findIndex((p) => p._id === restaurant._id);
      if (index < 0) {
        state.restaurants.push(restaurant);
      } else {
        state.restaurants[index] = restaurant;
      }
      state.loading = false;
      state.error = null;
    },
    createRestaurantStart(state, action: PayloadAction<User>) {
      state.currentRestaurantId = action.payload._id;
      state.loading = true;
      state.error = null;
    },
    createRestaurantSuccess(state, action: PayloadAction<User>) {
      const restaurant = action.payload;
      state.restaurants.push(restaurant);
      state.loading = false;
      state.error = null;
      // state.message = `Restaurant "${action.payload.name}" created successfully.`;
    },
    updateRestaurantStart(state, action: PayloadAction<User>) {
      state.currentRestaurantId = action.payload._id;
      state.loading = true;
      state.error = null;
    },
    updateRestaurantSuccess(state, action: PayloadAction<User>) {
      const restaurant = action.payload;
      const index = state.restaurants.findIndex((p) => p._id === restaurant._id);
      if (index < 0) {
        state.restaurants.push(restaurant);
      } else {
        state.restaurants[index] = restaurant;
      }
      state.loading = false;
      state.error = null;
      // state.message = `Restaurant "${action.payload.name}" updated successfully.`;
    },
    deleteRestaurantByIdStart(state, action: PayloadAction<IdType>) {
      state.currentRestaurantId = action.payload;
      state.loading = true;
      state.error = null;
    },
    deleteRestaurantByIdSuccess(state, action: PayloadAction<User>) {
      const restaurant = action.payload;
      const index = state.restaurants.findIndex((p) => p._id === restaurant._id);
      if (index >= 0) {
        state.restaurants.splice(index, 1);
      }
      state.loading = false;
      state.error = null;
      // state.message = `Restaurant "${action.payload.name}" deleted successfully.`;
    },
  },
});

export const {
  getRestaurantsStart,
  getRestaurantsSuccess,
  restaurantsFailure,
  selectRestaurantById,
  setRestaurantsUsername,
  setRestaurantsPassword,
  getRestaurantByIdStart,
  getRestaurantByIdSuccess,
  createRestaurantStart,
  createRestaurantSuccess,
  updateRestaurantStart,
  updateRestaurantSuccess,
  deleteRestaurantByIdStart,
  deleteRestaurantByIdSuccess,
} = restaurants.actions;
export default restaurants.reducer;

export const fetchRestaurantsByRole = (role: number): AppThunk => async (dispatch) => {
  try {
    dispatch(getRestaurantsStart(role));
    const localRestaurants = localStorage.getItem("restaurants");
    if (localRestaurants) {
      // console.log(localRestaurants);
      dispatch(getRestaurantsSuccess({ restaurants: JSON.parse(localRestaurants) as User[] }));
    }
    const restaurants = await RestaurantService.getUsersByRole(role);
    dispatch(getRestaurantsSuccess({ restaurants }));
    localStorage.setItem("restaurants", JSON.stringify(restaurants));
  } catch (err) {
    dispatch(restaurantsFailure(getErrorMessage(err)));
  }
};

// export const fetchRestaurantById = (restaurantId: IdType): AppThunk => async (dispatch) => {
//   try {
//     dispatch(getRestaurantByIdStart(restaurantId));
//     const restaurant = await RestaurantService.getUsersById(restaurantId);
//     dispatch(getRestaurantByIdSuccess(restaurant));
//   } catch (err) {
//     dispatch(restaurantsFailure(getErrorMessage(err)));
//   }
// };

export const createRestaurant = (
  restaurant: User
  // history: History<History.PoorMansUnknown>
  // setSubmitting: (isSubmitting: boolean) => void
): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(createRestaurantStart(restaurant));
    // const authToken = getState().auth.token; // TODO
    const created = await RestaurantService.createNewUser(restaurant, undefined);
    dispatch(createRestaurantSuccess(created));
  } catch (err) {
    dispatch(restaurantsFailure(getErrorMessage(err)));
  }
  // finally {
  //   setSubmitting(false);
  // }
};

export const updateRestaurant = (
  restaurant: User
  // history: History<History.PoorMansUnknown>
  // setSubmitting: (isSubmitting: boolean) => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(updateRestaurantStart(restaurant));
    const created = await RestaurantService.updateUser(restaurant);
    dispatch(updateRestaurantSuccess(created));
    // history.push("/restaurants");
  } catch (err) {
    dispatch(restaurantsFailure(getErrorMessage(err)));
  }
  // finally {
  //   setSubmitting(false);
  // }
};

export const deleteRestaurant = (restaurantId: IdType): AppThunk => async (dispatch) => {
  try {
    dispatch(deleteRestaurantByIdStart(restaurantId));
    const deleted = await RestaurantService.deleteUser(restaurantId);
    dispatch(deleteRestaurantByIdSuccess(deleted));
  } catch (err) {
    dispatch(restaurantsFailure(getErrorMessage(err)));
  }
};
