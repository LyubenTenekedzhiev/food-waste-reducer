import React, { ReactElement, useState, useEffect } from "react";

import FormikProfile from "../../../components/FormikProfile/FormikProfile";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/rootReducer";
import { fetchRestaurantsByRole } from "../../../features/restaurants/restaurantsSlice";
import classes from "./EditProfile.module.css";

export interface FormValuesEdit {
  _id: string;
  email: string;
  username: string;
  password: string;
  description?: string;
  keywords?: string;
  imageUrl?: string;
  street?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  pickUp?: string;
}

interface Props {
  _id: string;
}

function EditProfile({ _id }: Props): ReactElement {
  const dispatch = useDispatch();

  const restaurant = useSelector((state: RootState) => state.restaurants.restaurants).filter((restaurant) => restaurant._id === _id)[0];
  console.log(restaurant);

  useEffect(() => {
    dispatch(fetchRestaurantsByRole(0));
  }, []);

  const initialValues: FormValuesEdit = {
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
