import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormikProfile from "../../../components/FormikProfile/FormikProfile";
import { RootState } from "../../../app/rootReducer";
import { fetchRestaurantsByRole } from "../../../features/restaurants/restaurantsSlice";
import { RestaurantEditProfile } from "../../../shared-types/shared-types";
import classes from "./EditProfile.module.css";

interface Props {
  _id: string;
}

function EditProfile({ _id }: Props): ReactElement {
  const dispatch = useDispatch();

  const restaurant = useSelector((state: RootState) => state.restaurants.restaurants).filter((restaurant) => restaurant._id === _id)[0];

  useEffect(() => {
    dispatch(fetchRestaurantsByRole(0));
  }, [dispatch]);

  const initialValues: RestaurantEditProfile = {
    _id: restaurant?._id,
    email: restaurant?.email,
    username: restaurant?.username,
    password: restaurant?.password,
    description: restaurant?.description,
    keywords: restaurant?.keywords,
    imageUrl: restaurant?.imageUrl,
    street: restaurant?.street,
    zipCode: restaurant?.zipCode,
    city: restaurant?.city,
    phone: restaurant?.phone,
    pickUp: restaurant?.pickUp,
  };

  return (
    <main className={classes.EditProfile}>
      <FormikProfile initialValues={initialValues} id={_id} />
    </main>
  );
}

export default EditProfile;
