import React, { ReactElement } from "react";

import classes from "./Button.module.css";

interface Props {
  scrollIntoView: () => void;
  children: string;
}

function Button({ scrollIntoView, children }: Props): ReactElement {
  return (
    <div>
      <button className={classes.button} onClick={scrollIntoView}>
        {children}
        <div className={classes.button__horizontal}></div>
        <div className={classes.button__vertical}></div>
      </button>
    </div>
  );
}

export default Button;
