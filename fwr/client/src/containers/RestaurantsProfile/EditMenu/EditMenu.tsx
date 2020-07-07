import React, { ReactElement, useState, useEffect } from "react";

import classes from "./EditMenu.module.css";
import FormikComponent from "../../../components/FormikMenu/FormikMenu";
import Menu from "../../SingleRestaurant/Menu/Menu";

import { useDispatch, useSelector } from "react-redux";
import { IdType } from "../../../shared-types/shared-types";
import { selectMealById, deleteMeal, updateMeal, createMeal } from "../../../features/meals/mealsSlice";
import { RootState } from "../../../app/rootReducer";

export interface FormValues {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  restaurantId: string;
  foodCategory: string;
  price: string;
  active: boolean;
}

interface Props {
  editMenu?: boolean | undefined;
  previewMenu?: boolean | undefined;
}

function EditMenu({ editMenu, previewMenu }: Props): ReactElement {
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const meals = useSelector((state: RootState) => state.meals.meals);
  const meal = meals.filter((meal) => meal._id === id)[0];

  const initialValues: FormValues = {
    _id: id ? meal?._id : "",
    name: id ? meal?.name : "",
    description: id ? meal?.description : "",
    imageUrl: id ? meal?.imageUrl : "",
    restaurantId: id ? meal?.restaurantId : "3",
    foodCategory: id ? meal?.foodCategory : "",
    active: id ? meal?.active : false,
    price: id ? meal?.price : "",
  };

  const editMealHandler = (_id: IdType) => {
    const id = dispatch(selectMealById(_id)).payload;
    setId(id);
  };

  const deleteMealHandler = (_id: IdType) => {
    dispatch(deleteMeal(_id));
  };

  const selectMealHandler = (_id: IdType) => {
    const id = dispatch(selectMealById(_id)).payload;
    const activeMeal = meals.filter((meal) => meal._id === id)[0];
    const activatedMeal = Object.assign(
      {},
      {
        _id: activeMeal._id,
        name: activeMeal.name,
        description: activeMeal.description,
        imageUrl: activeMeal.imageUrl,
        restaurantId: activeMeal.restaurantId,
        foodCategory: activeMeal.foodCategory,
        price: activeMeal.price,
        active: !activeMeal.active,
      }
    );
    dispatch(updateMeal(activatedMeal));
  };

  return (
    <main className={classes.EditMenu_Main}>
      <FormikComponent initialValues={initialValues} setId={setId} />
      <Menu
        editMenu={editMenu}
        previewMenu={previewMenu}
        editMealHandler={editMealHandler}
        deleteMealHandler={deleteMealHandler}
        selectMealHandler={selectMealHandler}
      />
    </main>
  );
}

export default EditMenu;
