import React, { ReactElement } from "react";

import classes from "./Button.module.css"

interface Props {
  children: string;
}

function ButtonSecondary({ children }: Props): ReactElement {
  return <div className={`${classes.btn} ${classes.from_right}`}>{children}</div>;
}

export default ButtonSecondary;
