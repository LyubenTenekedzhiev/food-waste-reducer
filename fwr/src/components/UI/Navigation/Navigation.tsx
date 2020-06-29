import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";

interface Props {}

// interface RouteProps {

// }

const Navigation = (props: Props): JSX.Element => {
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
        <NavLink className={classes.Navigation_Link} to={"/"}>
          Register
        </NavLink>
        <NavLink className={classes.Navigation_Link} to={"/"}>
          Login
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
