import React, { ReactElement, useEffect } from "react";

import { Form, Formik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import classes from "../FormikRegister/FormikRegister.module.css";
import InputField from "../UI/InputField/InputField";
import { RootState } from "../../app/rootReducer";
import { User, Role } from "./../../models/user.model";
import { CustomerEditProfile } from "../../shared-types/shared-types";
import ButtonTertiary from "../UI/Button/ButtonTertiary";
import { fetchCustomersByRole, updateCustomer, createCustomer } from "../../features/customer/customerSlice";

interface Props {
  initialValues: CustomerEditProfile;
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
    dispatch(fetchCustomersByRole(1));
  }, [dispatch]);

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
          roles: Role.CUSTOMER,
          favouriteRestaurants: [],
          bookedMeals: [],
        } as User;
        if (id) {
          dispatch(updateCustomer(result));
          resetForm({});
        } else {
          dispatch(createCustomer(result));
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
          .test("isn't taken", "Username already exists.", (value) => !usernames.includes(value)),
        password: Yup.string().required().min(6),
      })}
    >
      {(props) => <PostFormInternal {...props} />}
    </Formik>
  );
}

export default FormikComponent;

const PostFormInternal: (props: FormikProps<CustomerEditProfile>) => ReactElement = ({
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
    return state.customers.loading;
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
