import React, { ReactElement } from "react";

import WelcomeSection from "./../../components/LandingPage/WelcomeSection";
import FoodCategories from "./../../components/FoodCategories/FoodCategories";
import classes from "./LandingPage.module.css";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Footer from "../../components/UI/Footer/Footer";

interface Props {}

function LandingPage({}: Props): ReactElement {
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
