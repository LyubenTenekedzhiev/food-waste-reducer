import React, { ReactElement, useEffect } from "react";

import { FormValues } from "../../containers/RestaurantsProfile/EditMenu/EditMenu";

import { Form, Formik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import InputField from "../UI/InputField/InputField";
import Button from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon/Icon";
import { updateMeal, createMeal } from "../../features/meals/mealsSlice";
import { RootState } from "../../app/rootReducer";
import { User, Role } from "./../../models/user.model";
import { createRestaurant, updateRestaurant } from "./../../features/restaurants/restaurantsSlice";

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
  workingHours?: { Monday: string; Tuesday: string; Wednesday: string; Thursday: string; Friday: string; Weekend: string };
}

interface Props {}

function FormikComponent(props: Props): ReactElement {
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
    workingHours: { Monday: "", Tuesday: "", Wednesday: "", Thursday: "", Friday: "", Weekend: "" },
  };

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
          // workingHours: {
          //   Monday: values.workingHours?.Monday,
          //   Tuesday: values.workingHours?.Tuesday,
          //   Wednesday: values.workingHours?.Wednesday,
          //   Thursday: values.workingHours?.Thursday,
          //   Friday: values.workingHours?.Friday,
          //   Weekend: values.workingHours?.Weekend,
          // },
        } as User;
        if (result._id) {
          //Edit
          dispatch(updateRestaurant(result));
          resetForm({});
          // setId("");
        } else {
          //Create
          dispatch(createRestaurant(result));
          resetForm({});
          // setId("");
        }
      }}
      validateOnChange
      validationSchema={Yup.object().shape({
        email: Yup.string().required().email(),
        username: Yup.string().required().min(2).max(20), // regex
        password: Yup.string().required().min(6), // regex
        description: Yup.string().required().min(2).max(40), 
        keywords: Yup.string().required(), // regex
        imageUrl: Yup.string().url().required(),
        street: Yup.string().required(), 
        zipCode: Yup.string().required(),
        city: Yup.string().required(),
        phone: Yup.string().required(), // regex
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
    <Form className='col s6'>
      <div className='row' id='EditMenu'>
        <InputField name='email' label='Email*' />
        <InputField name='username' rowsMax={10} label='Username*' />
        <InputField name='password' label='Password*' type='password' />
        <InputField name='description' label='Short description*' />
        <InputField name='imageUrl' label='Image URL for your restaurant*' />
        <InputField name='keywords' label='Keywords (eg. pizza, vegan)*' />
        <InputField name='street' label='Street*' />
        <InputField name='zipCode' label='Zip Code*' />
        <InputField name='city' label='City*' />
        <InputField name='phone' label='Phone number*' />
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
