import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Form, Formik, FormikProps } from "formik";

import InputField from "../UI/InputField/InputField";
import Button from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon/Icon";
import { RootState } from "../../app/rootReducer";
import { User, Role } from "./../../models/user.model";
import { fetchRestaurantsByRole } from "./../../features/restaurants/restaurantsSlice";
import { updateCustomer, createCustomer } from "../../features/customer/customerSlice";
import classes from "./FormikRegister.module.css";
import { useHistory } from "react-router-dom";
import ButtonTertiary from "../UI/Button/ButtonTertiary";

export interface FormValuesRegister {
  _id: string;
  email: string;
  username: string;
  password: string;
  roles: Role;
  favouriteRestaurants: string[];
  bookedMeals: string[];
}

interface Props {}

function FormikComponent(props: Props): ReactElement {
  const history = useHistory();
  const dispatch = useDispatch();

  const initialValuesCustomer: FormValuesRegister = {
    _id: "",
    email: "",
    username: "",
    password: "",
    roles: Role.CUSTOMER,
    favouriteRestaurants: [],
    bookedMeals: [],
  };

  const emails = useSelector((state: RootState) => state.restaurants.restaurants).map((restaurant) => restaurant.email);
  const usernames = useSelector((state: RootState) => state.restaurants.restaurants).map((restaurant) => restaurant.username);

  useEffect(() => {
    dispatch(fetchRestaurantsByRole(1));
  }, []);

  return (
    <Formik
      key={initialValuesCustomer._id}
      initialValues={initialValuesCustomer}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const result = {
          _id: values._id,
          email: values.email,
          username: values.username,
          password: values.password,
          roles: values.roles,
          favouriteRestaurants: values.favouriteRestaurants,
          bookedMeals: values.bookedMeals,
        } as User;
        //Create
        dispatch(createCustomer(result));
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
          .test("isn't taken", "Username already exists.", (value) => !usernames.includes(value)), // regex
        password: Yup.string().required().min(6), // regex
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
      <div className={classes.FormikRegister_InputsCustomer}>
        <div>
          <InputField name='email' label='Email*' />
          <InputField name='username' rowsMax={10} label='Username*' />
          <InputField name='password' label='Password*' type='password' />
        </div>
      </div>
      <div className={classes.FormikRegister_Buttons}>
        <ButtonTertiary disabled={isSubmitting || !dirty || Object.values(errors).some((err) => !!err === true)}>Submit</ButtonTertiary>
        <ButtonTertiary disabled={!dirty || isSubmitting} handleReset={handleReset} >Reset</ButtonTertiary>
      </div>
    </Form>
  );
};
