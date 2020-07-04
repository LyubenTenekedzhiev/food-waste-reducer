import React, { useState, useEffect } from "react";

import classes from "./EditRestaurant.module.css";
import WelcomeSectionRestaurant from "../SingleRestaurant/WelcomeSectionRestaurant/WelcomeSectionRestaurant";
import { MOCK_MEALS } from "./../../models/mock-meals";
import { Meal } from "./../../models/meal";
import Menu from "../SingleRestaurant/Menu/Menu";
import ButtonSecondary from "../../components/UI/Button/ButtonSecondary";

interface Props {
  location: any;
}

// interface StringMap {
//   [key: string]: string;
// }

// interface State {
//   fields: StringMap;
// }

const EditRestaurant = ({ location }: Props) => {
  const [fields, setFields] = useState({ name: "", imageURL: "", foodCategory: "", description: "", price: "" });
  const [editProfile, setEditProfile] = useState(false);
  const [editMenu, setEditMenu] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    setMeals(MOCK_MEALS);
  }, []);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const newFields = { ...fields };
    setFields({ ...newFields, [event.target.name]: event.target.value });
  };

  const createMealHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMeals(meals.concat(new Meal(fields.name, fields.imageURL, fields.foodCategory, fields.description, +fields.price, 1)));
    setFields({ name: "", description: "", foodCategory: "", imageURL: "", price: "" });
  };

  const showEditProfileHandler = (event: React.ChangeEvent) => {

  }

  return (
    <div>
      <WelcomeSectionRestaurant location={location} />
      <div className={classes.EditRestaurant_Buttons}>
        <ButtonSecondary editProfile={showEditProfileHandler}>Edit Profile</ButtonSecondary>
        <ButtonSecondary>Edit Menu</ButtonSecondary>
        <ButtonSecondary>Preview Menu</ButtonSecondary>
      </div>
      <main className={classes.EditRestaurant_Main}>
        <form className={classes.EditRestaurant_Form} onSubmit={createMealHandler}>
          <input type='text' placeholder='Name of the meal' value={fields.name} name='name' onChange={handleTextChange} />
          <input type='text' placeholder='Short description' value={fields.description} name='description' onChange={handleTextChange} />
          <input type='number' placeholder='Price' value={fields.price} name='price' onChange={handleTextChange} />
          <input
            type='text'
            placeholder='Food category (e.g pizza)'
            value={fields.foodCategory}
            name='foodCategory'
            onChange={handleTextChange}
          />
          <input type='text' placeholder='Image' value={fields.imageURL} name='imageURL' onChange={handleTextChange} />
          <input type='submit' />
        </form>
        <Menu mockMeals={meals} />
      </main>
    </div>
  );
};

export default EditRestaurant;
