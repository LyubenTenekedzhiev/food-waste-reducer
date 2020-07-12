import React, { ReactElement } from "react";

import classes from "./Button.module.css";

interface Props {
  children: string;
  disabled: boolean;
  handleReset?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function ButtonTertiary({ children, disabled, handleReset }: Props): ReactElement {
  return (
    <button
      className={`${classes.ButtonTertiary} ${classes.from_right} ${disabled ? classes.ButtonTertiary_Disabled : ""}`}
      onClick={handleReset}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default ButtonTertiary;
