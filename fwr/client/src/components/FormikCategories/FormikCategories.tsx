import React, { ReactElement, useEffect } from "react";

import { Form, Formik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import classes from "../FormikRegister/FormikRegister.module.css";
import InputField from "../UI/InputField/InputField";
import { RootState } from "../../app/rootReducer";
import ButtonTertiary from "../UI/Button/ButtonTertiary";
import { FoodCategories } from "./../../shared-types/shared-types";
import { FoodCategory } from "../../models/foodCategory.model";
import { updateFoodCategory, createFoodCategory, fetchFoodCategories } from "../../features/foodCategories/foodCategorySlice";

interface Props {
  initialValues: FoodCategories;
  id: string;
}

function FormikComponent({ initialValues, id }: Props): ReactElement {
  const dispatch = useDispatch();

  const foodCategories = useSelector((state: RootState) => state.foodCategories.foodCategories);

  useEffect(() => {
    dispatch(fetchFoodCategories());
  }, []);
  console.log(foodCategories);

  return (
    <Formik
      key={initialValues._id}
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const result = {
          _id: values._id,
          name: values.name,
          imageUrl: values.imageUrl,
        } as FoodCategory;
        if (id) {
          dispatch(updateFoodCategory(result));
          resetForm({});
        } else {
          dispatch(createFoodCategory(result));
          resetForm({});
        }
      }}
      validateOnChange
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required()
          .test("isn't taken", "Category already exists.", (value) => !foodCategories.includes(value)),
        imageUrl: Yup.string().url().required(),
      })}
    >
      {(props) => <PostFormInternal {...props} />}
    </Formik>
  );
}

export default FormikComponent;

const PostFormInternal: (props: FormikProps<FoodCategories>) => ReactElement = ({
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
    return state.foodCategories.loading;
  });

  useEffect(() => {
    setSubmitting(loading);
  }, [loading, setSubmitting]);

  return (
    <Form className='col s6'>
      <div className='row' id='EditMenu'>
        <InputField name='name' label='Name*' />
        <InputField name='imageUrl' label='Image URL for the category*' />
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
