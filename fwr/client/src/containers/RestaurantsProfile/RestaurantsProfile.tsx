import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import WelcomeSectionRestaurant from "../SingleRestaurant/WelcomeSectionRestaurant/WelcomeSectionRestaurant";
import ButtonSecondary from "../../components/UI/Button/ButtonSecondary";
import EditMenu from "./EditMenu/EditMenu";
import EditProfile from "./EditProfile/EditProfile";
import Footer from "../../components/UI/Footer/Footer";
import classes from "./RestaurantsProfile.module.css";

interface LocationState {
  state: {
    id: string;
  };
}

interface Props {
  location: LocationState;
}

const EditRestaurant = ({ location }: Props) => {
  const [editProfile, setEditProfile] = useState(false);
  const [editMenu, setEditMenu] = useState(false);
  const [previewMenu, setPreviewMenu] = useState(false);
  const history = useHistory();

  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  useEffect(() => {
    if (!username && !password) history.push("/");
  }, [username, password, history]);

  const editProfileHandler = () => {
    setEditProfile(true);
    setEditMenu(false);
    setPreviewMenu(false);
    setTimeout(() => {
      document.getElementById("EditMenu")?.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }, 50);
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
      {location.state ? <WelcomeSectionRestaurant id={location.state.id} /> : null}
      <div className={classes.EditRestaurant_Buttons}>
        <ButtonSecondary editProfile={editProfileHandler}>Edit Profile</ButtonSecondary>
        <ButtonSecondary editMenu={editMenuHandler}>Edit Menu</ButtonSecondary>
        <ButtonSecondary previewMenu={previewMenuHandler}>Preview Menu</ButtonSecondary>
      </div>
      {editProfile ? <EditProfile _id={location.state.id} /> : null}
      {editMenu ? <EditMenu editMenu={editMenu} _id={location.state.id} /> : null}
      {previewMenu ? <EditMenu previewMenu={previewMenu} _id={location.state.id} /> : null}
      <Footer />
    </div>
  );
};

export default EditRestaurant;
