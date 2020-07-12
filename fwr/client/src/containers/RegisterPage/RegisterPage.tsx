import React, { ReactElement, useEffect } from "react";

import FormikRegister from "../../components/FormikRegister/FormikRegister";
import FormikRegisterCustomer from "../../components/FormikRegister/FormikRegisterCustomer";
import classes from "./RegisterPage.module.css";
import Navigation from "../../components/UI/Navigation/Navigation";
import { useHistory } from "react-router-dom";

interface LocationState {
  state: string;
}

interface Props {
  location: LocationState;
}

function RegisterPage({ location }: Props): ReactElement {
  const history = useHistory();

  useEffect(() => {
    if (!location.state) history.push("/");
  }, []);

  return (
    <div className={classes.RegisterPage}>
      <div className={classes.RegisterPage_Header}>
        <Navigation />
      </div>
      <div className={classes.RegisterPage_Form}>
        {location.state && location.state === "restaurant" ? <FormikRegister /> : <FormikRegisterCustomer />}
      </div>
    </div>
  );
}

export default RegisterPage;
