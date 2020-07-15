import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormikProfileCustomer from "../../../components/FormikProfile/FormikProfileCustomer";
import { RootState } from "../../../app/rootReducer";
import { CustomerEditProfile } from "../../../shared-types/shared-types";
import { fetchCustomersByRole } from "../../../features/customer/customerSlice";

interface Props {
  _id: string;
}

function EditProfile({ _id }: Props): ReactElement {
  const dispatch = useDispatch();

  const customer = useSelector((state: RootState) => state.customers.customers).filter((customer) => customer._id === _id)[0];

  useEffect(() => {
    dispatch(fetchCustomersByRole(1));
  }, [dispatch]);

  const initialValues: CustomerEditProfile = {
    _id: customer?._id,
    email: customer?.email,
    username: customer?.username,
    password: customer?.password,
    favouriteRestaurants: customer?.favouriteRestaurants,
    bookedMeals: customer?.bookedMeals,
  };

  return (
    <main>
      <FormikProfileCustomer initialValues={initialValues} id={_id} />
    </main>
  );
}

export default EditProfile;
