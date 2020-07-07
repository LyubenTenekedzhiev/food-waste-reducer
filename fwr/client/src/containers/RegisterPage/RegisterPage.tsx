import React, { ReactElement } from "react";

import FormikRegister from "../../components/FormikRegister/FormikRegister";

interface Props {}

function RegisterPage({}: Props): ReactElement {
  
  return (
    <div>
      <FormikRegister />
    </div>
  );
}

export default RegisterPage;
