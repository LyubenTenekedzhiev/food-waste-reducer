import React, { ReactElement } from "react";

import WelcomeSection from "./WelcomeSection/WelcomeSection";
import FoodCategories from "./../../components/FoodCategories/FoodCategories";
import HowItWorks from "./HowItWorks/HowItWorks";
import Footer from "../../components/UI/Footer/Footer";
import classes from "./LandingPage.module.css";

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
