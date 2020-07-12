import React, { ReactElement, useEffect } from "react";

import { Meal } from "../../models/meal.model";
import { FormValues } from "../../containers/RestaurantsProfile/EditMenu/EditMenu";

import { Form, Formik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import InputField from "../UI/InputField/InputField";
import Button from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon/Icon";
import { updateMeal, createMeal } from "../../features/meals/mealsSlice";
import { RootState } from "../../app/rootReducer";

interface Props {
  initialValues: FormValues;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

function FormikComponent({ initialValues, setId }: Props): ReactElement {
  const dispatch = useDispatch();

  return (
    <Formik
      key={initialValues._id}
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const result = {
          _id: values._id,
          name: values.name,
          description: values.description,
          imageUrl: values.imageUrl,
          price: values.price,
          restaurantId: values.restaurantId,
          foodCategory: values.foodCategory,
          active: values.active,
        } as Meal;
        if (result._id) {
          //Edit
          dispatch(updateMeal(result));
          resetForm({});
          setId("");
        } else {
          //Create
          dispatch(createMeal(result));
          resetForm({});
          setId("");
        }
      }}
      validateOnChange
      validationSchema={Yup.object().shape({
        name: Yup.string().required().min(2).max(30),
        description: Yup.string().required().min(2).max(100),
        imageUrl: Yup.string().url().required(),
        price: Yup.string()
          .required()
          .trim()
          .matches(/^([1-9][0-9]*|0)(\.[0-9]+)?$/i, "Must be a number"),
        foodCategory: Yup.string().required(),
      })}
    >
      {(props) => <PostFormInternal {...props} />}
    </Formik>
  );
}

export default FormikComponent;

const PostFormInternal: (props: FormikProps<FormValues>) => ReactElement = ({
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
        <InputField name='name' label='Name*' />
        <InputField name='description' rowsMax={10} label='Short description*' />
        <InputField name='price' label='Price*' />
        <InputField name='imageUrl' label='Image URL for the meal*' />
        <InputField name='foodCategory' label='Food Category*' />
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