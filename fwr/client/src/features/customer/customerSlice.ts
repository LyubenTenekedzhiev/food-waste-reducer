import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk } from "../../app/store";
import CustomerService from "../../service/user-service";
import { getErrorMessage } from "../../service/service-utils";
import { IdType } from "../../shared-types/shared-types";
import { User } from "../../models/user.model";

interface CustomersState {
  currentCustomerId: IdType | null;
  customers: User[];
  username: string;
  password: string;
  loading: boolean;
  isAdmin: boolean;
  error: string | null;
  message: string | null;
}

interface CustomersLoaded {
  customers: User[];
}

const initialState: CustomersState = {
  currentCustomerId: null,
  customers: [],
  username: "",
  password: "",
  loading: false,
  isAdmin: false,
  error: null,
  message: null,
};

const customers = createSlice({
  name: "customers",
  initialState,
  reducers: {
    getCustomersStart(state, action: PayloadAction<number>) {
      state.loading = true;
      state.error = null;
    },
    getCustomersSuccess(state, action: PayloadAction<CustomersLoaded>) {
      const { customers } = action.payload;
      state.customers = customers;
      state.loading = false;
      state.error = null;
    },
    customersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    selectCustomerById(state, action: PayloadAction<IdType>) {
      state.currentCustomerId = action.payload;
    },
    setCustomersUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setCustomersPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setIsAdmin(state) {
      const usernameCustomer = localStorage.getItem("usernameCustomer");
      const passwordCustomer = localStorage.getItem("passwordCustomer");
      if (usernameCustomer === "LyubenTenekedzhiev" && passwordCustomer === "adminadmin") {
        state.isAdmin = true;
      } else {
        state.isAdmin = false;
      }
    },
    getCustomerByIdStart(state, action: PayloadAction<IdType>) {
      state.currentCustomerId = action.payload;
      state.loading = true;
      state.error = null;
    },
    getCustomerByIdSuccess(state, action: PayloadAction<User>) {
      const customer = action.payload;
      const index = state.customers.findIndex((p) => p._id === customer._id);
      if (index < 0) {
        state.customers.push(customer);
      } else {
        state.customers[index] = customer;
      }
      state.loading = false;
      state.error = null;
    },
    createCustomerStart(state, action: PayloadAction<User>) {
      state.currentCustomerId = action.payload._id;
      state.loading = true;
      state.error = null;
    },
    createCustomerSuccess(state, action: PayloadAction<User>) {
      const customer = action.payload;
      state.customers.push(customer);
      state.loading = false;
      state.error = null;
    },
    updateCustomerStart(state, action: PayloadAction<User>) {
      state.currentCustomerId = action.payload._id;
      state.loading = true;
      state.error = null;
    },
    updateCustomerSuccess(state, action: PayloadAction<User>) {
      const customer = action.payload;
      const index = state.customers.findIndex((p) => p._id === customer._id);
      if (index < 0) {
        state.customers.push(customer);
      } else {
        state.customers[index] = customer;
      }
      state.loading = false;
      state.error = null;
    },
    deleteCustomerByIdStart(state, action: PayloadAction<IdType>) {
      state.currentCustomerId = action.payload;
      state.loading = true;
      state.error = null;
    },
    deleteCustomerByIdSuccess(state, action: PayloadAction<User>) {
      const customer = action.payload;
      const index = state.customers.findIndex((p) => p._id === customer._id);
      if (index >= 0) {
        state.customers.splice(index, 1);
      }
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getCustomersStart,
  getCustomersSuccess,
  customersFailure,
  setCustomersUsername,
  setCustomersPassword,
  setIsAdmin,
  getCustomerByIdStart,
  getCustomerByIdSuccess,
  createCustomerStart,
  createCustomerSuccess,
  updateCustomerStart,
  updateCustomerSuccess,
  deleteCustomerByIdStart,
  deleteCustomerByIdSuccess,
} = customers.actions;
export default customers.reducer;

export const fetchCustomersByRole = (role: number): AppThunk => async (dispatch) => {
  try {
    dispatch(getCustomersStart(role));
    const localCustomers = localStorage.getItem("customers");
    if (localCustomers) {
      dispatch(getCustomersSuccess({ customers: JSON.parse(localCustomers) as User[] }));
    }
    const customers = await CustomerService.getUsersByRole(role);
    dispatch(getCustomersSuccess({ customers }));
    localStorage.setItem("customers", JSON.stringify(customers));
  } catch (err) {
    dispatch(customersFailure(getErrorMessage(err)));
  }
};

export const createCustomer = (customer: User): AppThunk => async (dispatch) => {
  try {
    dispatch(createCustomerStart(customer));
    const created = await CustomerService.createNewUser(customer, undefined);
    dispatch(createCustomerSuccess(created));
  } catch (err) {
    dispatch(customersFailure(getErrorMessage(err)));
  }
};

export const updateCustomer = (customer: User): AppThunk => async (dispatch) => {
  try {
    dispatch(updateCustomerStart(customer));
    const created = await CustomerService.updateUser(customer);
    dispatch(updateCustomerSuccess(created));
  } catch (err) {
    dispatch(customersFailure(getErrorMessage(err)));
  }
};

export const deleteCustomer = (customerId: IdType): AppThunk => async (dispatch) => {
  try {
    dispatch(deleteCustomerByIdStart(customerId));
    const deleted = await CustomerService.deleteUser(customerId);
    dispatch(deleteCustomerByIdSuccess(deleted));
  } catch (err) {
    dispatch(customersFailure(getErrorMessage(err)));
  }
};
