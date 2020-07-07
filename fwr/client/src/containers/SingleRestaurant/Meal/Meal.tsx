import React, { ReactElement } from "react";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import classes from "./Meal.module.css";
import { IdType } from "../../../shared-types/shared-types";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

interface Props {
  _id: IdType;
  name: string;
  imageUrl: string;
  description: string;
  price: string;
  active: boolean;
  editMenu: boolean | undefined;
  previewMenu: boolean | undefined;
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
  editMealHandler,
  deleteMealHandler,
  selectMealHandler,
}: Props): ReactElement {
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

  return (
    <div className={classes.Meal}>
      <div className={classes.Meal_Info}>
        <h3 className={classes.Meal_Name}>{name}</h3>
        <p className={classes.Meal_Description}>{description}</p>
        <div className={classes.Meal_PriceDetails}>
          <p className={classes.Meal_Price}> &euro;{price}.00</p>
          {!editMenu && !previewMenu && (
            <div className={classes.Meal_Bookmark}>
              <AddIcon  className={classes.Meal_BookmarkIcon} /> <RemoveIcon className={classes.Meal_BookmarkIcon}/>
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
          <label className={classes.Meal_SelectLabel}>Select</label>
        </>
      ) : null}
    </div>
  );
}

export default Meal;
