import React, { ReactElement } from "react";

import classes from "./Button.module.css";

interface Props {
  scrollIntoView: () => void;
}

function Button({ scrollIntoView }: Props): ReactElement {
  return (
    <div>
      <button className={classes.button} onClick={scrollIntoView}>
        Find food
        <div className={classes.button__horizontal}></div>
        <div className={classes.button__vertical}></div>
      </button>
    </div>
  );
}

export default Button;
