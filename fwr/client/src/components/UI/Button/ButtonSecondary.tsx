import React, { ReactElement } from "react";

import classes from "./Button.module.css";

interface Props {
  children: string;
  editProfile?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  editMenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  previewMenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function ButtonSecondary({ children, editProfile, editMenu, previewMenu }: Props): ReactElement {
  return (
    <div className={`${classes.btn} ${classes.from_right}`} onClick={editProfile ? editProfile : editMenu ? editMenu : previewMenu}>
      {children}
    </div>
  );
}

export default ButtonSecondary;
