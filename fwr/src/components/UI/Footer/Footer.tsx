import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";

import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import classes from "./Footer.module.css";

function Footer(): ReactElement {
  return (
    <div className={classes.Footer}>
      <h3 className={classes.Footer_Title}>Food Waste Reducer</h3>
      <div className={classes.Footer_Links}>
        <NavLink to='/' className={classes.Footer_Link}>
          Home
        </NavLink>
        <NavLink to='/' className={classes.Footer_Link}>
          Restaurants
        </NavLink>
        <NavLink to='/' className={classes.Footer_Link}>
          About
        </NavLink>
        <NavLink to='/' className={classes.Footer_Link}>
          Register
        </NavLink>
        <NavLink to='/' className={classes.Footer_Link}>
          Login
        </NavLink>
      </div>
      <div className={classes.Footer_Social}>
        <span>&copy; FWR 2020</span>
        <div className={classes.Footer_Icons}>
          <a href='https://github.com/LyubenTenekedzhiev' target='blank'>
            <GitHubIcon className={classes.Footer_Icon} />
          </a>
          <a href='https://www.linkedin.com/in/lyuben-tenekedzhiev/' target='blank'>
            <LinkedInIcon className={classes.Footer_Icon} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
