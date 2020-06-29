import React, { ReactElement } from "react";

import classes from "./Meal.module.css";

interface Props {
  name: string;
  imageURL: string;
  foodCategory: string;
  description: string;
  price: number;
}

function Meal({ name, imageURL, foodCategory, description, price }: Props): ReactElement {
  return (
    <div className={classes.Meal}>
      <div className={classes.Meal_Info}>
        <h3 className={classes.Meal_Name}>{name}</h3>
        <p className={classes.Meal_Description}>{description}</p>
        <p className={classes.Meal_Price}> &euro;{price}.00</p>
      </div>
      <figure className={classes.Meal_Figure}>
        <img className={classes.Meal_Image} src={imageURL} alt={`Meal - ${name}`} />
      </figure>
    </div>
  );
}

export default Meal;
