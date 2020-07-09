import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import classes from "./Spinner.module.css";


export default function CircularIndeterminate() {
  return (
    <div className={classes.Spinner}>
      <CircularProgress />
    </div>
  );
}
