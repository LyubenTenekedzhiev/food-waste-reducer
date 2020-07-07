import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";

interface Props {}

// interface RouteProps {

// }

const Navigation = (props: Props): JSX.Element => {
  const [openLogin, setOpenLogin] = useState(false);
  const openLoginMenuHandler = () => {
    setOpenLogin(true);
  };

  const closeLoginMenuHandler = () => {
    setOpenLogin(false);
  };

  return (
    <header className={classes.Header}>
      <nav className={classes.Navigation}>
        <NavLink className={classes.Navigation_Link} to={"/"}>
          Home
        </NavLink>
        <NavLink className={classes.Navigation_Link} to={"/"}>
          Restaurants
        </NavLink>
      </nav>
      <h3 className={classes.Navigation_Logo}>fwr</h3>
      <nav className={classes.Navigation}>
        <NavLink className={classes.Navigation_Link} to={"/"}>
          About
        </NavLink>
        <NavLink className={classes.Navigation_Link} to={"/register"}>
          Register
        </NavLink>
        <NavLink className={classes.Navigation_Link} to={"/"} onMouseOver={openLoginMenuHandler} onMouseOut={closeLoginMenuHandler}>
          Login
          <div className={openLogin ? classes.Navigation_LoginVissible : classes.Navigation_Login}>
            <span onClick={() => console.log("User")}>User</span>
            <span onClick={() => console.log("Restaurant")}>Restaurant</span>
          </div>
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
