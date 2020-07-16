import React, { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IdType } from "../../../shared-types/shared-types";
import { selectMealById, deleteMeal, updateMeal } from "../../../features/meals/mealsSlice";
import { RootState } from "../../../app/rootReducer";

import FormikComponent from "../../../components/FormikMenu/FormikMenu";
import Menu from "../../SingleRestaurant/Menu/Menu";
import classes from "./EditMenu.module.css";

export interface FormValues {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  restaurantId: string;
  foodCategory: string;
  price: string;
  amount: string;
  initialAmount: string;
  active: boolean;
}

interface Props {
  _id: string;
  editMenu?: boolean | undefined;
  previewMenu?: boolean | undefined;
}

function EditMenu({ _id, editMenu, previewMenu }: Props): ReactElement {
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const meals = useSelector((state: RootState) => state.meals.meals);
  const meal = meals.filter((meal) => meal._id === id)[0];

  const initialValues: FormValues = {
    _id: id ? meal?._id : "",
    name: id ? meal?.name : "",
    description: id ? meal?.description : "",
    imageUrl: id ? meal?.imageUrl : "",
    restaurantId: id ? meal?.restaurantId : _id,
    foodCategory: id ? meal?.foodCategory : "",
    amount: id ? meal?.amount : "",
    initialAmount: id ? meal?.initialAmount : "",
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
        amount: activeMeal.amount,
        initialAmount: activeMeal.initialAmount,
        price: activeMeal.price,
        active: !activeMeal.active,
      }
    );
    dispatch(updateMeal(activatedMeal));
  };

  return (
    <main className={classes.EditMenu_Main}>
      <FormikComponent initialValues={initialValues} setId={setId} />
      <div className={classes.EditMenu_Menu}>
        <Menu
          id={_id}
          editMenu={editMenu}
          previewMenu={previewMenu}
          editMealHandler={editMealHandler}
          deleteMealHandler={deleteMealHandler}
          selectMealHandler={selectMealHandler}
        />
      </div>
    </main>
  );
}

export default EditMenu;
