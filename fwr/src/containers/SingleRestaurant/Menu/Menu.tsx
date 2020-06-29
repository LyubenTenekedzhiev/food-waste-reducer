import React, { ReactElement, useEffect, useState } from "react";

import classes from "./Menu.module.css";
import { MOCK_MEALS } from "../../../models/mock-meals";
import { Meal } from "./../../../models/meal";
import MealComponent from "../Meal/Meal";

interface Props {
  mockMeals: Meal[];
}

function Menu({ mockMeals }: Props): ReactElement {
  const meals = mockMeals.map((meal) => {
    return (
      <MealComponent
        key={meal.id}
        name={meal.name}
        description={meal.description}
        imageURL={meal.imageURL}
        price={meal.price}
        foodCategory={meal.foodCategory}
      />
    );
  });

  return (
    <div className={classes.Menu}>
      {/* <h2 style={{ marginTop: "10rem" }}>.</h2> */}
      {meals}
    </div>
  );
}

export default Menu;
