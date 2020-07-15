import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Meal.module.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { IdType } from "../../../shared-types/shared-types";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { RootState } from "../../../app/rootReducer";
import { updateCustomer, fetchCustomersByRole } from "../../../features/customer/customerSlice";
import { updateMeal } from "./../../../features/meals/mealsSlice";

interface Props {
  _id: IdType;
  name: string;
  imageUrl: string;
  description: string;
  price: string;
  active: boolean;
  amount: string;
  initialAmount: string;
  restaurantId: string;
  foodCategory: string;
  editMenu: boolean | undefined;
  previewMenu: boolean | undefined;
  customersProfile?: boolean | undefined;
  editMealHandler?: (_id: IdType) => void;
  deleteMealHandler?: (_id: IdType) => void;
  selectMealHandler?: (_id: IdType) => void;
}

function Meal({
  _id,
  name,
  imageUrl,
  description,
  price,
  editMenu,
  active,
  amount,
  initialAmount,
  restaurantId,
  foodCategory,
  previewMenu,
  customersProfile,
  editMealHandler,
  deleteMealHandler,
  selectMealHandler,
}: Props): ReactElement {
  const dispatch = useDispatch();

  const username = localStorage.getItem("usernameCustomer");
  const password = localStorage.getItem("passwordCustomer");
  const customer = useSelector((state: RootState) => state.customers.customers).filter(
    (customer) => customer.username === username && customer.password === password
  )[0];

  useEffect(() => {
    dispatch(fetchCustomersByRole(1));
  }, []);

  const editHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!editMealHandler) return;
    editMealHandler(_id);
    document.getElementById("EditMenu")?.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  };

  const deleteHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!deleteMealHandler) return;
    deleteMealHandler(_id);
  };

  const selectHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!selectMealHandler) return;
    selectMealHandler(_id);
  };

  const bookMeal = () => {
    dispatch(
      updateCustomer({
        _id: customer?._id,
        email: customer?.email,
        username: customer?.username,
        password: customer?.password,
        roles: customer?.roles,
        favouriteRestaurants: customer?.favouriteRestaurants,
        bookedMeals: customer?.bookedMeals ? [...customer?.bookedMeals, _id] : customer?.bookedMeals,
      })
    );
    dispatch(
      updateMeal({
        _id: _id,
        name: name,
        imageUrl: imageUrl,
        description: description,
        price: price,
        active: active,
        amount: Number(amount) - 1 + "",
        initialAmount: initialAmount,
        restaurantId: restaurantId,
        foodCategory: foodCategory,
      })
    );
  };

  const removeBookedMeal = () => {
    if (customer.bookedMeals?.indexOf(_id) === undefined) return;
    const foundId = customer?.bookedMeals?.findIndex((meal) => meal === _id);
    const updatedMeals = customer?.bookedMeals?.filter((_, index) => index !== foundId);
    dispatch(
      updateCustomer({
        _id: customer?._id,
        email: customer?.email,
        username: customer?.username,
        password: customer?.password,
        roles: customer?.roles,
        favouriteRestaurants: customer?.favouriteRestaurants,
        bookedMeals: customer?.bookedMeals ? updatedMeals : customer?.bookedMeals,
      })
    );
    dispatch(
      updateMeal({
        _id: _id,
        name: name,
        imageUrl: imageUrl,
        description: description,
        price: price,
        active: active,
        initialAmount: initialAmount,
        amount: Number(amount) + 1 + "",
        restaurantId: restaurantId,
        foodCategory: foodCategory,
      })
    );
  };
  
  return (
    <div className={classes.Meal}>
      <div className={classes.Meal_Info}>
        <h3 className={classes.Meal_Name}>{name}</h3>
        <p className={classes.Meal_Description}>{description}</p>
        <div className={classes.Meal_PriceDetails}>
          <p className={classes.Meal_Price}>
            {" "}
            {!editMenu && !previewMenu && customersProfile && customer?.bookedMeals
              ? (customer?.bookedMeals?.filter((meal) => meal === _id).length * Number(price)).toFixed(2)
              : Number(price).toFixed(2)}{" "}
            BGN
          </p>
          {!editMenu && !previewMenu && (
            <div className={classes.Meal_Bookmark}>
              <span className={classes.Meal_Count}>
                {customersProfile && customer ? customer?.bookedMeals?.filter((meal) => meal === _id).length + "x" : ""}
              </span>
              <AddIcon
                className={classes.Meal_BookmarkIcon}
                onClick={username && password && amount !== "0" ? () => bookMeal() : () => {}}
                style={(!username && !password) || amount === "0" ? { cursor: "not-allowed" } : { cursor: "pointer" }}
              />{" "}
              <label className={classes.Meal_IconLabel}>{!username && !password ? "Sign in first" : "Book meal"}</label>
              <RemoveIcon
                className={classes.Meal_BookmarkIcon}
                onClick={username && password && +amount < +initialAmount ? () => removeBookedMeal() : () => {}}
                style={(!username && !password) || +amount === +initialAmount ? { cursor: "not-allowed" } : { cursor: "pointer" }}
              />
              <label className={classes.Meal_IconLabel}>{!username && !password ? "Sign in first" : "Remove meal"}</label>
            </div>
          )}
        </div>
      </div>
      <figure className={classes.Meal_Figure}>
        <img className={classes.Meal_Image} src={imageUrl} alt={`Meal - ${name}`} />
      </figure>
      {editMenu ? (
        <>
          <EditIcon className={classes.Meal_Edit} onClick={editHandler} />{" "}
          <DeleteIcon className={classes.Meal_Delete} onClick={deleteHandler} />
          <Checkbox
            className={classes.Meal_Select}
            checked={active}
            onClick={selectHandler}
            color='primary'
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <label className={classes.Meal_SelectLabel}>Activate</label>
        </>
      ) : null}
    </div>
  );
}

export default React.memo(Meal);
