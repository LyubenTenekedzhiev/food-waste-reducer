import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormikCategories from "../../../components/FormikCategories/FormikCategories"
import { RootState } from "../../../app/rootReducer";
import { FoodCategories } from "../../../shared-types/shared-types";
import { fetchFoodCategories } from "../../../features/foodCategories/foodCategorySlice";

interface Props {
  _id: string;
}

function EditProfile({ _id }: Props): ReactElement {
  const dispatch = useDispatch();

  const foodCategory = useSelector((state: RootState) => state.foodCategories.foodCategories).filter((category) => category._id === _id)[0];

  useEffect(() => {
    dispatch(fetchFoodCategories());
  }, [dispatch]);

  const initialValues: FoodCategories = {
    _id: foodCategory?._id,
    name: foodCategory?.name,
    imageUrl: foodCategory?.imageUrl,
  };

  return (
    <main>
      <FormikCategories initialValues={initialValues} id={_id} />
    </main>
  );
}

export default EditProfile;
