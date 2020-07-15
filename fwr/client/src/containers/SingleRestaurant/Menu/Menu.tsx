import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Menu.module.css";
import MealComponent from "../Meal/Meal";
import { RootState } from "../../../app/rootReducer";
import { fetchMeals } from "./../../../features/meals/mealsSlice";
import { IdType } from "../../../shared-types/shared-types";

interface Props {
  id: string;
  editMenu?: boolean | undefined;
  previewMenu?: boolean | undefined;
  editMealHandler?: (_id: IdType) => void;
  deleteMealHandler?: (_id: IdType) => void;
  selectMealHandler?: (_id: IdType) => void;
}

function Menu({ id, editMenu, previewMenu, editMealHandler, deleteMealHandler, selectMealHandler }: Props): ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeals(id));
  }, [dispatch, id]);

  const scrollIntoView = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    document.getElementById(event.currentTarget.innerHTML)?.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  };

  const searchQuery = useSelector((state: RootState) => state.meals.searchQuery);
  const inputTouched = useSelector((state: RootState) => state.meals.inputTouched);
  const meals = useSelector((state: RootState) => state.meals.meals);

  const allMeals = meals
    .filter((meal) => meal.foodCategory.toLowerCase().includes(searchQuery) || meal.name.toLowerCase().includes(searchQuery))
    .map((meal) => {
      return (
        <MealComponent
          key={meal._id}
          _id={meal._id}
          name={meal.name}
          description={meal.description}
          imageUrl={meal.imageUrl}
          price={meal.price}
          active={meal.active}
          amount={meal.amount}
          initialAmount={meal.initialAmount}
          restaurantId={meal.restaurantId}
          foodCategory={meal.foodCategory}
          editMenu={editMenu}
          previewMenu={previewMenu}
          editMealHandler={editMealHandler}
          deleteMealHandler={deleteMealHandler}
          selectMealHandler={selectMealHandler}
        />
      );
    });

  const activeMeals = meals
    .filter(
      (meal) =>
        (meal.active === true && meal.foodCategory.toLowerCase().includes(searchQuery)) || meal.name.toLowerCase().includes(searchQuery)
    )
    .map((meal) => meal.foodCategory)
    .filter((category, index, array) => array.indexOf(category) === index)
    .map((category, index) => {
      return (
        <div key={index} className={classes.Menu_CategoryContainer}>
          <h4 className={classes.Menu_Category} id={category}>
            {category}
          </h4>
          {meals
            .filter((meal) => meal.active === true)
            .map((meal) => {
              if (meal.foodCategory === category) {
                return (
                  <MealComponent
                    key={meal._id}
                    _id={meal._id}
                    name={meal.name}
                    description={meal.description}
                    imageUrl={meal.imageUrl}
                    price={meal.price}
                    active={meal.active}
                    amount={meal.amount}
                    initialAmount={meal.initialAmount}
                    restaurantId={meal.restaurantId}
                    foodCategory={meal.foodCategory}
                    editMenu={editMenu}
                    previewMenu={previewMenu}
                    editMealHandler={editMealHandler}
                    deleteMealHandler={deleteMealHandler}
                    selectMealHandler={selectMealHandler}
                  />
                );
              }
            })}
        </div>
      );
    });

  const foodCategories = meals
    .filter((meal) => meal.active === true)
    .map((meal) => meal.foodCategory)
    .filter((category, index, array) => array.indexOf(category) === index)
    .map((category, index) => {
      return (
        <li key={index} onClick={scrollIntoView} className={`${classes.link} ${classes.from_right}`}>
          {category}
        </li>
      );
    });

  return (
    <div className={classes.Menu}>
      <ul className={classes.Menu_Categories}>{!editMenu && !previewMenu ? foodCategories : null}</ul>
      <div className={classes.Menu_Meals}>
        {editMenu ? (
          allMeals
        ) : activeMeals.length > 0 ? (
          activeMeals
        ) : inputTouched ? (
          <h2 className={classes.Menu_NoResult}>Nothing came up for "{searchQuery}".</h2>
        ) : (
          <h2 className={classes.Menu_NoMenu}>There isn't a menu yet.</h2>
        )}
      </div>
    </div>
  );
}

export default Menu;
