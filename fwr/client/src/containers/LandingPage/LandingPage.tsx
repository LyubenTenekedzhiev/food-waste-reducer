import React, { ReactElement } from "react";

import WelcomeSection from "./WelcomeSection/WelcomeSection";
import FoodCategories from "./../../components/FoodCategories/FoodCategories";
import classes from "./LandingPage.module.css";
import HowItWorks from "./HowItWorks/HowItWorks";
import Footer from "../../components/UI/Footer/Footer";

function LandingPage(): ReactElement {
  return (
    <div className={classes.LandingPage}>
      <WelcomeSection />
      <HowItWorks />
      <FoodCategories />
      <Footer />
    </div>
  );
}

export default LandingPage;
