import React, { useState, useEffect } from "react";

import classes from "./RestaurantsProfile.module.css";
import WelcomeSectionRestaurant from "../SingleRestaurant/WelcomeSectionRestaurant/WelcomeSectionRestaurant";
import ButtonSecondary from "../../components/UI/Button/ButtonSecondary";
import EditMenu from "./EditMenu/EditMenu";
import Menu from "../SingleRestaurant/Menu/Menu";
// import EditMenu from "./EditMenu/EditMenu";

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
  const [editProfile, setEditProfile] = useState(false);
  const [editMenu, setEditMenu] = useState(false);
  const [previewMenu, setPreviewMenu] = useState(false);

  const editProfileHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setEditProfile(true);
    setEditMenu(false);
    setPreviewMenu(false);
  };

  const editMenuHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setEditMenu(true);
    setEditProfile(false);
    setPreviewMenu(false);
    setTimeout(() => {
      document.getElementById("EditMenu")?.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }, 50);
  };

  const previewMenuHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
      <WelcomeSectionRestaurant location={location} /> 
      <div className={classes.EditRestaurant_Buttons}>
        <ButtonSecondary editProfile={editProfileHandler}>Edit Profile</ButtonSecondary>
        <ButtonSecondary editMenu={editMenuHandler}>Edit Menu</ButtonSecondary>
        <ButtonSecondary previewMenu={previewMenuHandler}>Preview Menu</ButtonSecondary>
      </div>
      {editMenu ? <EditMenu editMenu={editMenu}/> : null}
      {previewMenu ? <EditMenu previewMenu={previewMenu} /> : null}
    </div>
  );
};

export default EditRestaurant;
