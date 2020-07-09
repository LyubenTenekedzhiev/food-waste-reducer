import React, { ReactElement, useEffect } from "react";

import { Form, Formik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import InputField from "../UI/InputField/InputField";
import Button from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon/Icon";
import { RootState } from "../../app/rootReducer";
import { User, Role } from "./../../models/user.model";
import { createRestaurant, updateRestaurant, fetchRestaurantsByRole } from "./../../features/restaurants/restaurantsSlice";
import { FormValuesEdit } from "../../containers/RestaurantsProfile/EditProfile/EditProfile";

interface Props {
  initialValues: FormValuesEdit;
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

  useEffect(() => {
    dispatch(fetchRestaurantsByRole(0));
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
          description: values.description,
          keywords: values.keywords,
          imageUrl: values.imageUrl,
          street: values.street,
          zipCode: values.zipCode,
          city: values.city,
          phone: values.phone,
          pickUp: values.pickUp,
        } as User;
        dispatch(updateRestaurant(result));
        resetForm({});
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
          .test("isn't taken", "Username already exists.", (value) => !usernames.includes(value)), // regex
        password: Yup.string().required().min(6), // regex
        description: Yup.string().required().min(2).max(45),
        keywords: Yup.string().required(), // regex
        imageUrl: Yup.string().url().required(),
        street: Yup.string().required(),
        zipCode: Yup.string().required(),
        city: Yup.string().required(),
        phone: Yup.string().required(), // regex
        pickUp: Yup.string().required(),
      })}
    >
      {(props) => <PostFormInternal {...props} />}
    </Formik>
  );
}

export default FormikComponent;

const PostFormInternal: (props: FormikProps<FormValuesEdit>) => ReactElement = ({
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
    <Form className='col s6'>
      <div className='row' id='EditMenu'>
        <InputField name='email' label='Email*' />
        <InputField name='username' rowsMax={10} label='Username*' />
        <InputField name='password' label='Password*' type='password' />
        <InputField name='description' label='Short description*' />
        <InputField name='imageUrl' label='Image URL for your restaurant*' />
        <InputField name='keywords' label='Keywords (maximum 5: eg. pizza, vegan, italian, burger, dessert)*' />
        <InputField name='street' label='Street*' />
        <InputField name='zipCode' label='Zip Code*' />
        <InputField name='city' label='City*' />
        <InputField name='phone' label='Phone number*' />
        <InputField name='pickUp' label='Pick up time for your meals*' />
      </div>
      <div className='PostForm-butons row'>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          name='action'
          disabled={isSubmitting || !dirty || Object.values(errors).some((err) => !!err === true)}
          endIcon={<Icon>send</Icon>}
        >
          Submit
        </Button>
        <Button variant='contained' color='primary' onClick={handleReset} disabled={!dirty || isSubmitting} endIcon={<Icon>reset</Icon>}>
          Reset
        </Button>
      </div>
    </Form>
  );
};
