import React, { ReactElement } from "react";

import FormikRegister from "../../components/FormikRegister/FormikRegister";
import classes from "./RegisterPage.module.css";
import Navigation from "../../components/UI/Navigation/Navigation";

interface Props {}

function RegisterPage({}: Props): ReactElement {
  return (
    <div className={classes.RegisterPage}>
      <Navigation />
      <div className={classes.RegisterPage_Form}>
        <FormikRegister />
      </div>
    </div>
  );
}

export default RegisterPage;
