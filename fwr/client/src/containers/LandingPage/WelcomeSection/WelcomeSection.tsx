import React from "react";

import Navigation from "../../../components/UI/Navigation/Navigation";
import Button from "../../../components/UI/Button/ButtonPrimary";
import classes from "./WelcomeSection.module.css";

const WelcomeSection = () => {

  const scrollToCategories = () => {
    document.getElementById("FoodCategories")?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  };

  return (
    <div className={classes.WelcomeSection}>
      <div className={classes.WelcomeSection_Content}>
        <Navigation />
        <div className={classes.WelcomeSection_TextContainer}>
          <h1 className={classes.WelcomeSection_Text}>Grab your favourite food on a special price.</h1>
          <Button scrollIntoView={scrollToCategories}>Find food</Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
