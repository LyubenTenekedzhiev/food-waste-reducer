import React, { ReactElement, useEffect } from "react";

import { Form, Formik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import classes from "../FormikRegister/FormikRegister.module.css";
import InputField from "../UI/InputField/InputField";
import { RootState } from "../../app/rootReducer";
import { User, Role } from "./../../models/user.model";
import { updateRestaurant, fetchRestaurantsByRole, createRestaurant } from "./../../features/restaurants/restaurantsSlice";
import { RestaurantEditProfile } from "../../shared-types/shared-types";
import { fetchFoodCategories } from "../../features/foodCategories/foodCategorySlice";
import ButtonTertiary from "../UI/Button/ButtonTertiary";

interface Props {
  initialValues: RestaurantEditProfile;
  id: string;
}

function FormikComponent({ initialValues, id }: Props): ReactElement {
  const dispatch = useDispatch();

  const emails = useSelector((state: RootState) => state.restaurants.restaurants)
    .filter((restaurant) => restaurant._id !== id)
    .map((restaurant) => restaurant.email);
  const usernames = useSelector((state: RootState) => state.restaurants.restaurants)
    .filter((restaurant) => restaurant._id !== id)
    .map((restaurant) => restaurant.username);
  const foodCategories = useSelector((state: RootState) =>
    state.foodCategories.foodCategories.map((category) => category.name.toLowerCase())
  ).sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    dispatch(fetchFoodCategories());
    dispatch(fetchRestaurantsByRole(0));
  }, [dispatch]);

  function validateKeywords(value: string) {
    const flag = value
      .split(", ")
      .map((word) =>
        foodCategories.filter((category) => {
          if (word === category) {
            return true;
          } else if (word !== category) {
            return false;
          }
        })
      )
      .map((el) => {
        if (el.length === 0) return false;
        return true;
      })
      .filter((el) => el === false);
    console.log(flag[0]);
    console.log(foodCategories);
    return flag[0] === undefined ? true : false;
  }

  return (
    <Formik
      key={initialValues._id}
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const result = {
          _id: values._id,
          email: values.email,
          username: values.username,
          password: values.password,
          description: values.description,
          roles: Role.RESTAURANT,
          keywords: values.keywords,
          imageUrl: values.imageUrl,
          street: values.street,
          zipCode: values.zipCode,
          city: values.city,
          phone: values.phone,
          pickUp: values.pickUp,
        } as User;
        if (id) {
          dispatch(updateRestaurant(result));
          resetForm({});
        } else {
          dispatch(createRestaurant(result));
          resetForm({});
        }
      }}
      validateOnChange
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .required()
          .email()
          .test("isn't taken", "Email already exists.", (value) => !emails.includes(value)),
        username: Yup.string()
          .required()
          .min(2)
          .max(30)
          // .matches(/^(?![_.])[a-zA-Z0-9._]{2,}\s[a-zA-Z0-9]+(?![_.+-;/])$/, "Enter a valid username.")
          .test("isn't taken", "Username already exists.", (value) => !usernames.includes(value)),
        password: Yup.string().required().min(6),
        description: Yup.string().required().min(2).max(45),
        keywords: Yup.string()
          .required()
          .matches(/[a-zA-Z]/i, "Must be a string")
          .test("does exist", "Category doesn't exist.", (value) => validateKeywords(value)),
        imageUrl: Yup.string().url().required(),
        street: Yup.string().required(),
        zipCode: Yup.string()
          .required()
          .trim()
          .matches(/^([1-9][0-9]*|0)([0-9]+)?$/i, "Must be a number"),
        city: Yup.string()
          .required()
          .trim()
          .matches(/[a-zA-Z]/i, "Must be a string"),
        phone: Yup.string()
          .required()
          .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s]?[0-9]{4,6}$/im, "Enter a valid phone number."),
        pickUp: Yup.string().required(),
      })}
    >
      {(props) => <PostFormInternal {...props} />}
    </Formik>
  );
}

export default FormikComponent;

const PostFormInternal: (props: FormikProps<RestaurantEditProfile>) => ReactElement = ({
  values,
  handleChange,
  dirty,
  touched,
  errors,
  isSubmitting,
  setSubmitting,
  handleReset,
}) => {
  const loading = useSelector((state: RootState) => {
    return state.restaurants.loading;
  });

  useEffect(() => {
    setSubmitting(loading);
  }, [loading, setSubmitting]);

  return (
    <Form className='col s6'>
      <div className='row' id='EditMenu'>
        <InputField name='email' label='Email*' />
        <InputField name='username' rowsMax={10} label='Username*' />
        <InputField name='password' label='Password*' type='password' />
        <InputField name='description' label='Short description*' />
        <InputField name='imageUrl' label='Image URL for your restaurant*' />
        <InputField name='keywords' label='Keywords (maximum 5: eg. pizza, vegan, italian, burger, mexican)*' />
        <InputField name='street' label='Street*' />
        <InputField name='zipCode' label='Zip Code*' />
        <InputField name='city' label='City*' />
        <InputField name='phone' label='Phone number*' />
        <InputField name='pickUp' label='Pick up time for your meals*' />
      </div>
      <div className={classes.FormikProfile_Buttons}>
        <ButtonTertiary disabled={isSubmitting || !dirty || Object.values(errors).some((err) => !!err === true)}>Submit</ButtonTertiary>
        <ButtonTertiary disabled={!dirty || isSubmitting} handleReset={handleReset}>
          Reset
        </ButtonTertiary>
      </div>
    </Form>
  );
};
