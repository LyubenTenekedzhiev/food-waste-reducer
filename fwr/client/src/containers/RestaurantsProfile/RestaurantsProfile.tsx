import React, { useState, useEffect } from "react";

import classes from "./RestaurantsProfile.module.css";
import WelcomeSectionRestaurant from "../SingleRestaurant/WelcomeSectionRestaurant/WelcomeSectionRestaurant";
import ButtonSecondary from "../../components/UI/Button/ButtonSecondary";
import EditMenu from "./EditMenu/EditMenu";
import Menu from "../SingleRestaurant/Menu/Menu";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { useHistory } from "react-router-dom";
// import EditMenu from "./EditMenu/EditMenu";
import { fetchRestaurantsByRole } from "./../../features/restaurants/restaurantsSlice";
import EditProfile from "./EditProfile/EditProfile";

interface LocationState {
  state: {
    id: string;
  };
}

interface Props {
  location: LocationState;
}

// interface StringMap {
//   [key: string]: string;
// }

// interface State {
//   fields: StringMap;
// }

const EditRestaurant = ({ location }: Props) => {
  const [editProfile, setEditProfile] = useState(false);
  const [editMenu, setEditMenu] = useState(false);
  const [previewMenu, setPreviewMenu] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  // if (restaurants) restaurants

  useEffect(() => {
    if (!username && !password) history.push("/");
  }, []);

  console.log(location.state);

  const editProfileHandler = () => {
    setEditProfile(true);
    setEditMenu(false);
    setPreviewMenu(false);
  };

  const editMenuHandler = () => {
    setEditMenu(true);
    setEditProfile(false);
    setPreviewMenu(false);
    setTimeout(() => {
      document.getElementById("EditMenu")?.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }, 50);
  };

  const previewMenuHandler = () => {
    setEditProfile(false);
    setEditMenu(false);
    setPreviewMenu(true);
    setTimeout(() => {
      document.getElementById("EditMenu")?.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }, 50);
  };

  return (
    <div>
      {/* Need to remove the banner from the WelcomeSection when in Restaurant's account */}
      {location.state ? <WelcomeSectionRestaurant id={location.state.id} /> : null}
      <div className={classes.EditRestaurant_Buttons}>
        <ButtonSecondary editProfile={editProfileHandler}>Edit Profile</ButtonSecondary>
        <ButtonSecondary editMenu={editMenuHandler}>Edit Menu</ButtonSecondary>
        <ButtonSecondary previewMenu={previewMenuHandler}>Preview Menu</ButtonSecondary>
      </div>
      {editProfile ? <EditProfile _id={location.state.id} /> : null}
      {editMenu ? <EditMenu editMenu={editMenu} _id={location.state.id} /> : null}
      {previewMenu ? <EditMenu previewMenu={previewMenu} _id={location.state.id} /> : null}
    </div>
  );
};

export default EditRestaurant;
