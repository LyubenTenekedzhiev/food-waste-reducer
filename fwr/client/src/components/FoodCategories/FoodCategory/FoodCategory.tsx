import React, { ReactElement } from "react";

import classes from "./FoodCategory.module.css";

interface Props {
  name: string;
  restaurants?: number;
  imageURL: string;
  showRestaurants: () => void;
}

function FoodCategory({ name, restaurants, imageURL, showRestaurants }: Props): ReactElement {
  return (
    <div className={classes.FoodCategories_Category}>
      <figure className={classes.FoodCategories_CategoryFigure} onClick={showRestaurants}>
        <img src={imageURL} alt='Asian food' className={classes.FoodCategories_CategoryImage} />
      </figure>
      <h3 className={classes.FoodCategories_CategoryRestaurant}>{name}</h3>
      <h4 className={classes.FoodCategories_CategoryAmount}>{restaurants} Restaurants</h4>
    </div>
  );
}

export default FoodCategory;
