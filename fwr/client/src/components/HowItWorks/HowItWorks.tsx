import React, { ReactElement } from "react";

import SearchIcon from "@material-ui/icons/Search";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import classes from "./HowItWorks.module.css";

interface Props {}

function HowItWorks({}: Props): ReactElement {
  return (
    <div className={classes.HowItWorks}>
      <h2 className={classes.HowItWorks_Title}>How it works</h2>
      <div className={classes.HowItWorks_Icons}>
        <div className={classes.HowItWorks_IconContainer}>
          <SearchIcon className={classes.HowItWorks_Icon} />
          <h2 className={classes.HowItWorks_Subtitle}>Check out the menus.</h2>
        </div>
        <div className={classes.HowItWorks_IconContainer}>
          <BookmarkBorderIcon className={classes.HowItWorks_Icon} />
          <h2 className={classes.HowItWorks_Subtitle}>Book your meal.</h2>
        </div>
        <div className={classes.HowItWorks_IconContainer}>
          <LocationOnOutlinedIcon className={classes.HowItWorks_Icon} />
          <h2 className={classes.HowItWorks_Subtitle}>Pick it up.</h2>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
