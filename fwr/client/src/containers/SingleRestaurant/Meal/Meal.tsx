import React, { ReactElement, useEffect } from "react";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import classes from "./Meal.module.css";
import { IdType } from "../../../shared-types/shared-types";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/rootReducer";
import { updateCustomer, fetchCustomersByRole } from "../../../features/customer/customerSlice";
import Snackbar from "../../../components/UI/Snackbar/Snackbar";

interface Props {
  _id: IdType;
  name: string;
  imageUrl: string;
  description: string;
  price: string;
  active: boolean;
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
  };

  return (
    <div className={classes.Meal}>
      <div className={classes.Meal_Info}>
        <h3 className={classes.Meal_Name}>{name}</h3>
        <p className={classes.Meal_Description}>{description}</p>
        <div className={classes.Meal_PriceDetails}>
          <p className={classes.Meal_Price}>
            {" "}
            &euro;
            {!editMenu && !previewMenu && customersProfile && customer?.bookedMeals
              ? (customer?.bookedMeals?.filter((meal) => meal === _id).length * Number(price)).toFixed(2)
              : Number(price).toFixed(2)}
          </p>
          {!editMenu && !previewMenu && (
            <div className={classes.Meal_Bookmark}>
              <span className={classes.Meal_Count}>
                {customersProfile && customer ? customer?.bookedMeals?.filter((meal) => meal === _id).length + "x" : ""}
              </span>
              <AddIcon className={classes.Meal_BookmarkIcon} onClick={bookMeal} />{" "}
              <label className={classes.Meal_IconLabel}>Book meal</label>
              <RemoveIcon className={classes.Meal_BookmarkIcon} onClick={removeBookedMeal} />
              <label className={classes.Meal_IconLabel}>Remove meal</label>
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
