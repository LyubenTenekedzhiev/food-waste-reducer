import React, { ReactElement } from "react";

import classes from "./SingleRestaurant.module.css";
import Menu from "./Menu/Menu";
import WelcomeSectionRestaurant from "./WelcomeSectionRestaurant/WelcomeSectionRestaurant";
import { MOCK_MEALS } from './../../models/mock-meals';

interface Props {
  location: any;
}

function SingleRestaurant({ location }: Props): ReactElement {
  return (
    <div>
      <WelcomeSectionRestaurant location={location} />
      <Menu mockMeals={MOCK_MEALS} />
    </div>
  );
}

export default SingleRestaurant;
