import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Form, Formik, FormikProps } from "formik";

import InputField from "../UI/InputField/InputField";
import Button from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon/Icon";
import { RootState } from "../../app/rootReducer";
import { User, Role } from "./../../models/user.model";
import { createRestaurant, updateRestaurant, fetchRestaurantsByRole } from "./../../features/restaurants/restaurantsSlice";
import classes from "./FormikRegister.module.css";
import { useHistory } from "react-router-dom";
import { fetchFoodCategories } from "../../features/foodCategories/foodCategorySlice";
import ButtonTertiary from "./../UI/Button/ButtonTertiary";

export interface FormValuesRegister {
  _id: string;
  email: string;
  username: string;
  password: string;
  roles: Role;
  description?: string;
  keywords?: string[];
  imageUrl?: string;
  raiting?: number | 0;
  street?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  pickUp?: string;
}

interface Props {}

function FormikComponent(props: Props): ReactElement {
  const history = useHistory();
  const dispatch = useDispatch();

  const initialValues: FormValuesRegister = {
    _id: "",
    email: "",
    username: "",
    password: "",
    roles: Role.RESTAURANT,
    description: "",
    keywords: [""],
    imageUrl: "",
    raiting: 0,
    street: "",
    zipCode: "",
    city: "",
    phone: "",
    pickUp: "",
  };

  const emails = useSelector((state: RootState) => state.restaurants.restaurants).map((restaurant) => restaurant.email);
  const usernames = useSelector((state: RootState) => state.restaurants.restaurants).map((restaurant) => restaurant.username);
  const foodCategories = useSelector((state: RootState) =>
    state.foodCategories.foodCategories.map((category) => category.name.toLowerCase())
  );
  console.log(foodCategories);

  useEffect(() => {
    dispatch(fetchRestaurantsByRole(0));
    dispatch(fetchFoodCategories());
  }, []);

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
          roles: values.roles,
          description: values.description,
          keywords: values.keywords,
          imageUrl: values.imageUrl,
          raiting: 0,
          street: values.street,
          zipCode: values.zipCode,
          city: values.city,
          phone: values.phone,
          pickUp: values.pickUp,
        } as User;
        //Create
        dispatch(createRestaurant(result));
        resetForm({});
        history.push("/");
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
          .matches(/^(?![_.])[a-zA-Z0-9._]{2,}[a-zA-Z0-9]+(?![_.+-;/])$/, "Enter a valid username.")
          .test("isn't taken", "Username already exists.", (value) => !usernames.includes(value)),
        password: Yup.string().required().min(6),
        description: Yup.string().required().min(2).max(45),
        keywords: Yup.string()
          .required()
          .matches(/[a-zA-Z]/i, "Must be a string")
          .test("does exist", "Category doesn't exist.", (value) => foodCategories.includes(value)),
        imageUrl: Yup.string().url().required(),
        street: Yup.string().required(),
        zipCode: Yup.string()
          .required()
          .matches(/^([1-9][0-9]*|0)([0-9]+)?$/i, "Must be a number"),
        city: Yup.string()
          .required()
          .matches(/[a-zA-Z]/i, "Must be a string"),
        phone: Yup.string()
          .required()
          .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, "Enter a valid phone number."), // regex
        pickUp: Yup.string().required(),
      })}
    >
      {(props) => <PostFormInternal {...props} />}
    </Formik>
  );
}

export default FormikComponent;

const PostFormInternal: (props: FormikProps<FormValuesRegister>) => ReactElement = ({
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
    return state.meals.loading;
  });

  useEffect(() => {
    setSubmitting(loading);
  }, [loading, setSubmitting]);

  return (
    <Form className={classes.FormikRegister}>
      <div className={classes.FormikRegister_InputsRestaurant} id='EditMenu'>
        <div className={classes.FormikRegister_Input}>
          <InputField name='email' label='Email*' />
          <InputField name='username' rowsMax={10} label='Username*' />
          <InputField name='password' label='Password*' type='password' />
          <InputField name='description' label='Short description*' />
          <InputField name='imageUrl' label='Image URL for your restaurant*' />
          <InputField name='keywords' label='Keywords (maximum 4: eg. pizza, vegan, italian, burger)*' />
        </div>
        <div className={classes.FormikRegister_Input}>
          <InputField name='street' label='Street*' />
          <InputField name='zipCode' label='Zip Code*' />
          <InputField name='city' label='City*' />
          <InputField name='phone' label='Phone number*' />
          <InputField name='pickUp' label='Pick up time for your meals* (eg. 13:30 - 15:00)' />{" "}
        </div>
      </div>
      <div className={classes.FormikRegister_Buttons}>
        <ButtonTertiary disabled={isSubmitting || !dirty || Object.values(errors).some((err) => !!err === true)}>Submit</ButtonTertiary>
        <ButtonTertiary disabled={!dirty || isSubmitting} handleReset={handleReset} >Reset</ButtonTertiary>
      </div>
    </Form>
  );
};
